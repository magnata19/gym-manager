import { Request } from 'express';
import { IUser } from 'src/users/interface/IUser';

export interface IRequest extends Request {
  user: IUser;
}
