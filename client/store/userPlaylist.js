import axios from 'axios'

const CREATE_PLAYLIST = 'CREATE_PLAYLIST'
const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST'
const GET_ALL_PLAYLISTS = 'GET_ALL_PLAYLISTS'
const UPDATE_CURRENT_PLAYLIST = 'UPDATE_CURRENT_PLAYLIST'

const createPlaylist = playlistId => ({
  type: CREATE_PLAYLIST,
  playlistId
})

const addToPlaylist = trackId => ({
  type: ADD_TO_PLAYLIST,
  trackId
})

const getAllPlaylists = allPlaylists => ({
  type: GET_ALL_PLAYLISTS,
  allPlaylists
})

export const setCurrent = nameAndId => ({
  type: UPDATE_CURRENT_PLAYLIST,
  nameAndId
})

export const makePlaylist = (userId, token, playlistName) => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: {
          name: playlistName
        }
      })
      dispatch(createPlaylist({name: data.name, id: data.id}))
    } catch (error) {
      console.error(error)
      window.location.replace('/auth/spotify')
    }
  }
}

export const addPlaylist = (playlistId, trackURI, token) => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          uris: trackURI
        }
      })
      dispatch(addToPlaylist(data))
    } catch (error) {
      console.error(error)
      window.location.replace('/auth/spotify')
    }
  }
}

export const fetchAllPlaylists = token => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: 'https://api.spotify.com/v1/me/playlists',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          time_range: 'short-term'
        }
      })
      dispatch(getAllPlaylists(data))
    } catch (error) {
      window.location.replace('/auth/spotify')
      console.error(error)
    }
  }
}

let initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return {...state, currentPlaylist: action.playlistId}
    case ADD_TO_PLAYLIST:
      return {...state, addedTrack: action.trackId}
    case GET_ALL_PLAYLISTS:
      return {...state, allUserPlaylists: action.allPlaylists}
    case UPDATE_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: {name: action.nameAndId[0], id: action.nameAndId[1]}
      }
    default:
      return state
  }
}
