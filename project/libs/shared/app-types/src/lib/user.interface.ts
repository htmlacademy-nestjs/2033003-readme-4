import { UserRole } from "./user-role.enum";

export interface User{
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  avatar: string;
  dateRegister: Date;
  role: UserRole;
}
