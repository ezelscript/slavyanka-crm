import { supabase, authSupabase } from "./client";
import { EmployeesTable, UserData } from "../types";

async function getAllEmployees() {
  const { data: employees, error } = await supabase
    .from("employees")
    .select("*")
    .returns<EmployeesTable[]>();

  if (error) throw new Error(error.message);

  return employees;
}

async function addNewEmployee(formData: Omit<UserData, "userId">) {
  const { full_name, email, password, position, photo } = formData;

  const {
    data: { user },
    error: signUpError,
  } = await authSupabase.auth.signUp({ email, password });
  if (signUpError) throw new Error(signUpError.message);
  const id = user!.id;

  const UUID = crypto.randomUUID();
  const { error: bucketError } = await supabase.storage
    .from("user_images")
    .upload(UUID, photo[0], {
      cacheControl: "3600",
      upsert: false,
    });

  if (bucketError) throw new Error(bucketError.message);
  const {
    data: { publicUrl },
  } = supabase.storage.from("user_images").getPublicUrl(UUID);

  const { data: newEmployee, error: tableError } = await supabase
    .from("employees")
    .insert([{ photo: publicUrl, user_id: id, email, full_name, position }])
    .select()
    .returns<EmployeesTable[]>();
  if (tableError) throw new Error(tableError.message);

  return newEmployee;
}

export { getAllEmployees, addNewEmployee };
