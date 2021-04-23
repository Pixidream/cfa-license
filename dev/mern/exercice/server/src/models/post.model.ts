// ------ imports ------
// node modules
import { Schema, model } from 'mongoose'

// interfaces
import { IPost } from '../interfaces/post.interface'

// ------ schema ------
const PostSchema = new Schema({
  title: { type: String, required: [true, 'Field is required'] },
  description: { type: String, required: [true, 'Field is required'] },
  authorId: { type: String, required: [true, 'Field is required'] },
  created: { type: Date, required: [true, 'Field is required'], default: Date.now() },
  updated: { type: Date, required: false, default: Date.now() },
  cover: { type: String, required: [true, 'Field is required'] },
  content: { type: String, required: [true, 'Field is required'] },
  categoryId: { type: String, required: [true, 'Field is required'] },
})

export const Post = model<IPost>('Post', PostSchema)
