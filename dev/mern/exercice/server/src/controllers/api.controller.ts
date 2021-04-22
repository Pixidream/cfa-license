// ------ imports ------
// node modules
import { Request, Response, Router, NextFunction } from 'express'

// internal module
import { getWelcomeMessage } from '../services/api.service'

// ------ Controller ------
// register router
const router = Router()

// routes
router.get('/', (req: Request, res: Response, next:NextFunction) => {
  res.send(getWelcomeMessage())
})

export default router
