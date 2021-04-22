// ------ imports ------
// node modules
import jwt from 'jsonwebtoken'

// interfaces
import { IUser } from '../interfaces/user.interface'

// ------ helpers ------
// @ts-ignore
export const generateToken = (user: IUser): string => jwt.sign({ data: user }, process.env.SECRET, { expiresIn: '24h' })
