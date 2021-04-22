// ------ imports ------
// node modules
import { Schema, model } from 'mongoose'

// interfaces
import { IUser } from '../interfaces/user.interface'

// ------ schema ------
const UserSchema = new Schema({
  fullName: { type: String, required: [true, 'Field is required'] },
  pseudo: { type: String, required: [true, 'Field is required'], unique: true },
  email: { type: String, required: [true, 'Field is required'], unique: true },
  password: { type: String, required: [true, 'Field is required'] },
  profilePicture: { type: String, required: [true, 'Field is required'] }
})

export const User = model<IUser>('User', UserSchema)
