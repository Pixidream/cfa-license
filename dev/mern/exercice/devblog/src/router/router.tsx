// ---------- imports ----------
// node modules
import React, { ComponentProps } from 'react'
import {
  Switch,
  Route,
  useLocation,
  useHistory
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// intern component
import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'
import { Home } from '../views/Home'
import { PostPage } from '../views/PostPage'
import { AdminPage } from '../views/AdminPage'
import { Login } from '../views/Login'
import { Signup } from '../views/Signup'
import { PostForm } from '../views/PostForm'
import { CategoryForm } from '../views/CategoryForm'

export const AppRouter = (props: ComponentProps<any>) => {
  const location = useLocation()
  const history = useHistory()
  return (
    <>
      <Header location={location} store={props.store} history={history} />
      <TransitionGroup>
        <CSSTransition
          timeout={300}
          classNames='fade'
          key={ location.key }
        >
          <Switch location={ location }>
            <Route exact path='/' component={ (props: any) => <Home store={props.store} {...props}/>} />
            <Route path='/post/new' component={PostForm} />
            <Route path='/post/edit/:id' component={PostForm} />
            <Route path='/post/:id' component={PostPage} />
            <Route path='/category/new' component={CategoryForm} />
            <Route path='/category/edit/:id' component={CategoryForm} />
            <Route path='/admin' component={AdminPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  )
}
