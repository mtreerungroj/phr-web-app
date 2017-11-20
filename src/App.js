import './App.css'

import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import Footer from './components/Footer'
import Page404 from './components/Page404'
import Index from './components/protected/Index'

function PrivateRoute ({ component: Component, authed }) {
  return <Route render={props => (authed === true ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)} />
}

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authed: false
    }
  }

  componentDidMount () {}

  render () {
    return (
      <BrowserRouter>
        <div>
          <div>Menubar</div>
          <Switch>
            <Route exact path='/' component={props => <Login />} />
            <PrivateRoute authed={this.state.authed} path='/home' component={props => <Index />} />
            <Route render={() => <Page404 />} />
          </Switch>
          <br />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}
