import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Menubar from './components/Menubar'
import Login from './components/Login'
import Page404 from './components/Page404'
import IndexStaff from './components/protected/Index.staff'
import IndexPatient from './components/protected/Index.patient'

import { getUserStatus, signIn, signOut } from './services/helpers'

// Theme
import { lightBlue500, lightBlue100, pink500, pink100, green500, grey100, grey300 } from 'material-ui/styles/colors'
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
  return <Route render={props => (authed === true ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} />
}

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authed: false,
      isLoading: true,
      isDialogOpen: false,
      dialogMessage: ''
    }
  }

  componentDidMount () {
    const that = this
    getUserStatus().then(res => that.setState(res)).catch(res => that.setState(res))
  }

  handleLoginSubmit = (email, password) => {
    const that = this
    that.setState({ isLoading: true })
    signIn(email, password).then(res => that.setState(res)).catch(res => that.setState(res))
  }

  handleLogoutSubmit = () => {
    const that = this
    that.setState({ isLoading: true })
    signOut().then(res => that.setState(res)).catch(res => that.setState(res))
  }

  render () {
    return this.state.isLoading
      ? <div>Loading...</div>
      : <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div style={styles.container}>
            {!this.state.authed
                ? <Login handleLoginSubmit={this.handleLoginSubmit} />
                : <div>
                  <Menubar authed={this.state.authed} handleLogoutSubmit={this.handleLogoutSubmit} />
                  <Switch>
                    <PrivateRoute
                      authed={this.state.authed}
                      path='/'
                      component={props => (this.state.profile.role === 'staff' ? <IndexStaff /> : <IndexPatient />)}
                      />
                      }
                      <Route render={() => <Page404 />} />
                  </Switch>
                </div>}
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
  }
}

const styles = {
  container: {
    backgroundColor: grey300,
    height: '100vh'
  }
}
