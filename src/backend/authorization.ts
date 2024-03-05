import { supabase } from "./client";
import { UserData, EmployeesTable } from "../types";

async function signUp({
  email,
  password,
}: Pick<UserData, "email" | "password">) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  return data;
}

async function logIn({
  email,
  password,
}: Pick<UserData, "email" | "password">) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

async function changePassword({
  userId,
  password,
}: Pick<UserData, "userId" | "password">) {
  if (userId === import.meta.env.VITE_ID)
    throw new Error("Для этого профиля редактирование запрещено");

  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) throw new Error(error.message);

  return data;
}

async function changePhoto({
  userId,
  photo,
}: Pick<UserData, "userId" | "photo">) {
  if (userId === import.meta.env.VITE_ID)
    throw new Error("Для этого профиля редактирование запрещено");

  const UUID = crypto.randomUUID();
  const { error: bucketError } = await supabase.storage
    .from("user_images")
    .upload(UUID, photo![0], {
      cacheControl: "3600",
      upsert: false,
    });

  if (bucketError) throw new Error(bucketError.message);
  const {
    data: { publicUrl },
  } = supabase.storage.from("user_images").getPublicUrl(UUID);

  const { data: newRow, error: tableError } = await supabase
    .from("employees")
    .update({ photo: publicUrl })
    .eq("user_id", userId)
    .select()
    .returns<EmployeesTable[]>();

  if (tableError) throw new Error(tableError.message);

  return newRow;
}

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Нет текущей пользовательской сессии");

  const userId = user.id;
  const { data: userInfo, error: userError } = await supabase
    .from("employees")
    .select("*")
    .eq("user_id", userId)
    .returns<EmployeesTable[]>();

  if (userError) throw new Error(userError.message);

  return userInfo;
}

async function checkSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export {
  signUp,
  logIn,
  logOut,
  checkSession,
  getUser,
  changePassword,
  changePhoto,
};
