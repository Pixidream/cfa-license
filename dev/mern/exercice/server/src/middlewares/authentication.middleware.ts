// ------ imports ------
import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'

// ------ middleware ------
export const verifyToken = (req: Request, res: Response): void => {
  const token = req.headers.authorization
  if (!token) res.status(403).json({ error: "please provide a token" })
  else {
    // @ts-ignore
    jwt.verify(token.split(' ')[1], process.env.SECRET, (err: Error) => {
      if (err) res.status(500).json({ error: 'failed to authenticate token' })
    })
  }
}

export const verifyTokenEndpoint = (req: Request, res: Response): void | object | undefined => {
  const token = req.headers.authorization
  if (!token) res.status(403).json({ error: "please provide a token" })
  else {
    // @ts-ignore
    jwt.verify(token.split(' ')[1], process.env.SECRET, (err: Error, user: object | undefined) => {
      if (err) res.status(500).json({ error: 'failed to authenticate token' })
      else res.json({ verified: true, user })
    })
  }
}
