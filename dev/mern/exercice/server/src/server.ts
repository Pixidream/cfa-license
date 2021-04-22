// ------ imports ------
// internal modules
import app from './app'

// ------ server ------
app.listen(process.env.PORT, () => console.log(`🚀 your server is running and listen on port ${process.env.PORT}`))
