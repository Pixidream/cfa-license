// ------ import ------
// node modules
import { Document } from 'mongoose'

// ------ interface ------
export interface ICategory extends Document {
  name: string;
  icon: string;
}
