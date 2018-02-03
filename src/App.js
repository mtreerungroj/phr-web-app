import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Menubar from './components/Menubar'
import Snackbar from 'material-ui/Snackbar'

import Login from './components/Login'
import Page404 from './components/Page404'
// import InAccessible from './components/InAccessible'
import IndexStaff from './components/protected/Index.staff'
import IndexPatient from './components/protected/Index.patient'
import Registration from './components/registration/Registration'
import Profile from './components/protected/profile/Profile'
import Search from './components/protected/search/Search'
import Overivew from './components/protected/overview/Overview'
import Progress from './components/protected/progress/Progress'

import { getUserStatus, signIn, signOut } from './services/helpers'

// Theme
import { lightBlue500, lightBlue100, pink500, pink100, green500, grey100, grey300 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Click handler
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Theme
const muiTheme = getMuiTheme({
  fontFamily: 'Kanit, sans-serif',
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
      authed: false,
      isLoading: true,
      isShowSnackbar: false,
      snackbarMessage: ''
    }
  }

  componentDidMount () {
    const that = this
    getUserStatus().then(res => that.setState(res)).catch(res => that.setState(res))
  }

  handleLoginSubmit = (email, password) => {
    this.setState({ isLoading: true })
    signIn(email, password).then(res => this.setState(res)).catch(res => this.setState(res))
  }

  handleLogoutSubmit = () => {
    this.setState({ isLoading: true })
    signOut()
      .then(res => {
        this.setState(res)
        window.location.href = '/'
      })
      .catch(res => this.setState(res))
  }

  handleChangePath = path => (window.location.href = '/' + path)

  handleRequestSnackbarClose = () => this.setState({ isShowSnackbar: false, snackbarMessage: '' })

  render () {
    return this.state.isLoading
      ? <div style={styles.container}>Loading...</div>
      : <MuiThemeProvider muiTheme={muiTheme}>
        <Snackbar
          open={this.state.isShowSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={8000}
          onRequestClose={this.handleRequestSnackbarClose}
          />
        <BrowserRouter>
          <div style={styles.container}>
            {!this.state.authed
                ? <div>
                  <Route exact path='/' component={() => <Login handleLoginSubmit={this.handleLoginSubmit} handleChangePath={this.handleChangePath} />} />
                  <Route path='/register' component={() => <Registration />} />
                  {/* <Route component={() => <InAccessible />} /> */}
                </div>
                : <div>
                  <Menubar authed={this.state.authed} role={this.state.profile.role} handleLogoutSubmit={this.handleLogoutSubmit} />
                  <Switch>
                    <PrivateRoute
                      exact
                      authed={this.state.authed}
                      path='/'
                      component={props => (this.state.profile.role === 'doctor' || this.state.profile.role === 'nurse' ? <IndexStaff /> : <IndexPatient />)}
                      />
                    <PrivateRoute authed={this.state.authed} path='/overview' component={props => <Overivew />} />
                    <PrivateRoute authed={this.state.authed} path='/search' component={props => <Search />} />
                    <PrivateRoute authed={this.state.authed} path='/progress' component={props => <Progress />} />
                    <PrivateRoute authed={this.state.authed} path='/profile' component={props => <Profile />} />
                    <Route component={() => <Page404 />} />
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
