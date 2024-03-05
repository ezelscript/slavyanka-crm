import { supabase } from "./client";
import { RoomsTable } from "../types";

async function addRoomImg(img: File) {
  const UUID = crypto.randomUUID();

  const { error } = await supabase.storage
    .from("room-images")
    .upload(UUID, img, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("room-images").getPublicUrl(UUID);

  return publicUrl;
}

async function getRooms() {
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .returns<RoomsTable[]>();

  if (error) throw new Error(error.message);
  return rooms;
}

async function addRoom(formData: Omit<RoomsTable, "created_at" | "id">) {
  const image = formData.src[0];

  const publicUrl = await addRoomImg(image as File);
  formData.src = publicUrl;

  const { data: newRoom, error } = await supabase
    .from("rooms")
    .insert([formData])
    .select()
    .returns<RoomsTable[]>();

  if (error) throw new Error(error.message);

  return newRoom;
}

async function updateRoom(formData: Omit<RoomsTable, "created_at">) {
  const { id, ...roomData } = formData;

  const image = roomData.src[0];
  const publicUrl = await addRoomImg(image as File);
  roomData.src = publicUrl;

  const { data: newRoom, error } = await supabase
    .from("rooms")
    .update(roomData)
    .eq("id", id)
    .select()
    .returns<RoomsTable[]>();

  if (error) throw new Error(error.message);

  if (!newRoom.length) throw new Error("Действие запрещено");

  return newRoom;
}

async function deleteRoom(id: number) {
  // Первые 4 комнаты защищены от удаления на уровне БД, но API не возвращает признак успешного/неудачного удаления. Поэтому в данном случае ошибка выбрасывается руками
  if (id < 5) throw new Error("Действие запрещено");

  const { error } = await supabase.from("rooms").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export { getRooms, addRoom, updateRoom, deleteRoom };
