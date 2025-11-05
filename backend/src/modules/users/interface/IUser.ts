import { UserRole } from './UserRole';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: UserRole[];
}
