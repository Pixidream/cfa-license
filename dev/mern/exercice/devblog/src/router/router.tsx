// ---------- imports ----------
// node modules
import React, { ComponentProps } from 'react'
import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// intern component
import { Header } from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'
import { Home } from '../views/Home'
import { PostPage } from '../views/PostPage'
import { AdminPage } from '../views/AdminPage'

export const AppRouter = (props: ComponentProps<any>) => {
  const location = useLocation()
  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition
          timeout={300}
          classNames='fade'
          key={ location.key }
        >
          <Switch location={ location }>
            <Route exact path='/' component={Home} />
            <Route path='/post/:id'>
              <PostPage />
            </Route>
            <Route path='/admin'>
              <AdminPage />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  )
}
