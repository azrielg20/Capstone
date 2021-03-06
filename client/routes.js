import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  AllPlaylists,
  LandingPage,
  PlayerPage,
  About,
  NotFound
} from './components'
import {me} from './store'
import Dashboard from './components/Dashboard'
import SinglePlaylist from './components/SinglePlaylist'

class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <main>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={LandingPage} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/explore" component={PlayerPage} />
              <Route path="/playlists" component={AllPlaylists} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/singleplaylist" component={SinglePlaylist} />
              <Route component={NotFound} />
            </Switch>
          )}
          {/* <Route component={Login} /> */}
        </Switch>

        {/* <WelcomePage /> */}
      </main>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.token
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
