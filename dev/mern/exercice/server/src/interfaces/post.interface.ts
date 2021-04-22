// ------ import ------
// node modules
import { Document } from 'mongoose'

// ------ interface ------
export interface IPost extends Document {
  title: string;
  description: string;
  author: string;
  created: string;
  updated: string;
  cover: string;
  content: string;
  categoryId: string;
}
