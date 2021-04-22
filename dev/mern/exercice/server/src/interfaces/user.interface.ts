// ------ import ------
// node modules
import { Document } from 'mongoose'

// ------ interface ------
export interface IUser extends Document {
  fullName: string;
  pseudo: string;
  email: string;
  password: string;
  profilePicture: string
}
