// ------ imports ------
// models
import { Post } from '../models/post.model'
import { Category } from '../models/category.model'
import { User } from '../models/user.model'

// interfaces
import { IPost } from '../interfaces/post.interface'
import { ICategory } from '../interfaces/category.interface'
import { IUser } from '../interfaces/user.interface'

// ------ service ------
export class ApiService {
  public getWelcomeMessage = () => {
    return 'Welcome to REST API'
  }

  // ------ posts services ------
  public getAllPosts = (): Promise<IPost[]> => Post.find({}).exec()
  public addPost = (post: IPost): Promise<IPost> => new Post(post).save()
  public deletePost = async (id: string) =>  {
    const deletedPost: IPost | null = await Post.findByIdAndDelete(id).exec()
    if (!deletedPost) throw new Error(`Post with id ${id} not found`)
    return deletedPost
  }
  public updatePost = async (id: string, post: IPost) => {
    const updatedPost: IPost | null = await Post.findByIdAndUpdate(id, post).exec()
    if (!updatedPost) throw new Error(`Post with id ${id} not found`)
    return updatedPost
  }
  public getOnePost = async (id: string) => {
    const getPost: IPost | null = await Post.findById(id).exec()
    if (!getPost) throw new Error(`Post with id ${id} not found`)
    return getPost
  }
  public getPostCount = async (): Promise<number> => {
    const postNumber = await Post.countDocuments().exec()
    if (!postNumber) throw new Error('Error while retrieving documents count')
    return postNumber
  }

  // ------ categories services ------
  public getAllCategories = (): Promise<ICategory[]> => Category.find({}).exec()
  public addCategory = (category: ICategory): Promise<ICategory> => new Category(category).save()
  public deleteCategory = async (id: string) => {
    const deletedCategory: ICategory | null = await Category.findByIdAndDelete(id).exec()
    if (!deletedCategory) throw new Error(`Category with id ${id}  not found`)
    return deletedCategory
  }
  public updateCategory = async (id: string, category: ICategory) => {
    const updatedCategory: ICategory | null = await Category.findByIdAndUpdate(id, category).exec()
    if (!updatedCategory) throw new Error(`Category with id ${id} not found`)
    return updatedCategory
  }
  public getOneCategory = async (id: string) => {
    const getCategory: ICategory | null = await Category.findById(id).exec()
    if (!getCategory) throw new Error(`Category with id ${id} not found`)
    return getCategory
  }
  public getCategoryCount = async (): Promise<number> => {
    const categoryNumber = await Category.countDocuments().exec()
    if (!categoryNumber) throw new Error('Error while retrieving documents count')
    return categoryNumber
  }

  // ------ authentication service ------
  public signupUser = async (user: IUser): Promise<IUser> => new User(user).save()
  public loginUser = async (pseudo: string): Promise<IUser> => {
    const getUser: IUser | null = await User.findOne({ pseudo: pseudo }).exec()
    if (!getUser) throw new Error(`User ${pseudo} not found`)
    return getUser
  }
  public loginUserWithoutImage = async (pseudo: string): Promise<any> => {
    const getUser = await User.findOne({ pseudo }, { profilePicture: 0 }).exec()
    if (!getUser) throw new Error(`User ${pseudo} not found`)
    return getUser
  }

  public getProfilePict = async (pseudo: string): Promise<any> => {
    const getPP = await User.findOne({ pseudo }, { fullName: 0, pseudo: 0, email: 0, password: 0 }).exec()
    if (!getPP) throw new Error(`PP for  ${pseudo} not found`)
    return getPP
  }

  // ------ users services ------
  public getUserCount = async (): Promise<number> => {
    const userNumber = await User.countDocuments().exec()
    if (!userNumber) throw new Error('Error while retrieving documents count')
    return userNumber
  }
  public getAllUsers = (): Promise<IUser[]> => User.find({}).exec()
  public getOneUser = async (id: string) => {
    const getUser: IUser | null = await User.findById(id).exec()
    if (!getUser) throw new Error(`User with id ${id} not found`)
    return getUser
  }
}
