import React from 'react'
import {connect} from 'react-redux'
import {fetchSinglePlaylist} from '../store/singlePlaylist'

export class SinglePlaylist extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>Single Playlist</div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({playlist: state.playlist})
const mapDispatch = dispatch => ({
  getSinglePlaylist: id => dispatch(fetchSinglePlaylist(id))
})
export default connect(mapState, mapDispatch)(SinglePlaylist)
