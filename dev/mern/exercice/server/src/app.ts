// ------ imports ------
// node modules
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// internal modules
import { ApiController } from './controllers/api.controller'
import { ApiService } from './services/api.service'

// ------ App ------
class App {
  public app: Application
  public env: any

  constructor () {
    this.env = dotenv.config()
    this.app = express()
    this.setConfig()
    this.setMongoConfig()
    this.setControllers()
  }

  private setConfig = () => {
    this.app.use(morgan('combined'))
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    this.app.use(cors())
  }

  private setControllers = () => {
    const apiController = new ApiController(new ApiService())
    this.app.use('/api', apiController.router)
  }

  private setMongoConfig = () => {
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
      .then(() => console.log('🗃  connected to MongoDB'))
      .catch(err => console.log('🚨 an error occurred while connecting to MongoDB\n', err))
  }
}

export default new App().app
