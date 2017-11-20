import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import Footer from './components/Footer'
import Page404 from './components/Page404'
import Index from './components/protected/Index'

// Theme
import { lightBlue500, lightBlue100, pink500, pink100, green500, grey100 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Font
import 'typeface-roboto'

// Click handler
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Theme
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    primary2Color: pink500,
    primary3Color: green500,
    accent1Color: lightBlue100,
    accent2Color: pink100,
    accent3Color: grey100
  }
})

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
      <MuiThemeProvider muiTheme={muiTheme}>
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
      </MuiThemeProvider>
    )
  }
}
