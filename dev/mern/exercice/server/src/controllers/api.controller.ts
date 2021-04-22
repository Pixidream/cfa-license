// ------ imports ------
// node modules
import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'

// services
import { ApiService } from '../services/api.service'

// helpers
import { generateToken } from '../helper/authentication.helper'

// middleware
import { verifyToken } from '../middlewares/authentication.middleware'

// ------ Controller ------
export class ApiController {
  // register router
  public router = Router()

  // constructor
  constructor (private apiService: ApiService) {
    this.setRoutes()
  }

  // set routers for /api
  public setRoutes = () => {
    this.router.get('/', (_: Request, res: Response) => {
      res.send(this.apiService.getWelcomeMessage())
    })

    // register routes
    // ------ posts routes ------
    this.router.route('/posts').get(this.getAllPosts).post(this.addPost)
    this.router.route('/posts/:id').delete(this.deletePost).put(this.updatePost).get(this.getOnePost)

    // ------ categories routes ------
    this.router.route('/categories').get(this.getAllCategories).post(this.addCategory)
    this.router.route('/categories/:id').delete(this.deleteCategory).put(this.updateCategory).get(this.getOneCategory)

    // ------ authentication routers ------
    this.router.route('/auth/login').post(this.login)
    this.router.route('/auth/signup').post(this.signup)
    this.router.route('/auth/verify').get(this.checkLogin)
  }

  // ------ posts logic -------
  // retrieve all posts from the database
  private getAllPosts = async (_: Request, res: Response) => {
    try {
      const posts = await this.apiService.getAllPosts()
      res.send(posts)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  // add post to the db
  private addPost = async (req: Request, res: Response) => {
    verifyToken(req, res)
    try {
      const addPostResult = await this.apiService.addPost(req.body)
      res.send(addPostResult)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  // delete post in the db
  private deletePost = async (req: Request, res: Response) => {
    verifyToken(req, res)
    try {
      const deletePostResult = await this.apiService.deletePost(req.params.id)
      res.send(deletePostResult)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  //update post in db
  private updatePost = async (req: Request, res: Response) => {
    verifyToken(req, res)
    try {
      const updatePostResult = await this.apiService.updatePost(req.params.id, req.body)
      res.send(updatePostResult)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  // get a single post from db
  private getOnePost = async (req: Request, res: Response) => {
    try {
      const getPostResult = await this.apiService.getOnePost(req.params.id)
      res.send(getPostResult)
    }  catch (e) {
      res.status(404).send(e.message)
    }
  }

  // ------ category controller ------
  // retrieve all categories from database
  private getAllCategories = async (_: Request, res: Response) => {
    try {
      const categories = await this.apiService.getAllCategories()
      res.send(categories)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  // add category to the db
  private addCategory = async (req: Request, res: Response) => {
    verifyToken(req, res)
    try {
      const addCategoryResult = await this.apiService.addCategory(req.body)
      res.send(addCategoryResult)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  // delete category in the db
  private deleteCategory = async (req: Request, res: Response) => {
    verifyToken(req, res)
    try {
      const deleteCategoryResult = await this.apiService.deleteCategory(req.params.id)
      res.send(deleteCategoryResult)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  //update category in db
  private updateCategory = async (req: Request, res: Response) => {
    verifyToken(req, res)
    try {
      const updateCategoryResult = await this.apiService.updateCategory(req.params.id, req.body)
      res.send(updateCategoryResult)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  // get a single post from db
  private getOneCategory = async (req: Request, res: Response) => {
    try {
      const getCategoryResult = await this.apiService.getOneCategory(req.params.id)
      res.send(getCategoryResult)
    }  catch (e) {
      res.status(404).send(e.message)
    }
  }

  // authentication logic
  private signup = async (req: Request, res: Response) => {
    await bcrypt.hash(req.body.password, 10, async (error: Error, hash: string) => {
      if (error) res.status(500).json(error)
      else {
        try {
          const signupUser = await this.apiService.signupUser({ ...req.body, password: hash })
          res.send({ user: signupUser, token: generateToken(signupUser) })
        } catch (e) {
          res.status(500).send(e.message)
        }
      }
    })
  }

  private login = async (req: Request, res: Response) => {
    try {
      const loginUser = await this.apiService.loginUser(req.body.pseudo)
      await bcrypt.compare(req.body.password, loginUser.password, (error: Error, match: boolean) => {
        if (error) res.status(500).json(error)
        else if (match) res.status(200).json({ token: generateToken(loginUser), user: loginUser })
        else res.status(403).json({ error: 'password do not match' })
      })
    } catch (e) {
      res.status(404).send(e.message)
    }
  }

  private checkLogin = async (req: Request, res: Response) => {
    verifyToken(req, res)
    res.json({ verified: true })
  }
}
