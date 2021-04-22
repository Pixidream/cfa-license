// ------ imports ------
// node modules
import { Schema, model } from 'mongoose'

// interfaces
import { ICategory } from '../interfaces/category.interface'

// ------ schema ------
const CategorySchema = new Schema({
  name: { type: String, required: [true, 'Field is required'] },
  icon: { type: String, required: [true, 'Field is required'] }
})

export const Category = model<ICategory>('Category', CategorySchema)
