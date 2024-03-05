export interface RoomsTable {
  created_at: string;
  description: string;
  id: number;
  name: string;
  price: number;
  src: string | FileList;
}

export interface BookingsTable {
  breakfast_included: boolean;
  created_at: string;
  date_in: string;
  date_out: string;
  deposit: number;
  guest_email: string;
  guest_name: string;
  guest_tel: string;
  guest_totalPersons: number;
  guest_wishes: string;
  id: number;
  is_smoking: boolean;
  room: string;
}

export interface EmployeesTable {
  created_at: string;
  email: string;
  full_name: string;
  id: number;
  photo: string;
  position: string;
  user_id: string;
}

export interface UserData {
  full_name: string;
  email: string;
  password: string;
  position: string;
  userId: string;
  photo: FileList;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
