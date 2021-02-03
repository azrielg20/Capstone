import axios from 'axios'
import getRandomSearch from './getRandom'

const GET_ALBUM = 'GET_ALBUM'
const GET_PLAYLIST = 'GET_PLAYLIST'
const GET_RANDOM_PLAYLIST = 'GET_RANDOM_PLAYLIST'

const getRandomPlaylist = rPlaylist => ({
  type: GET_RANDOM_PLAYLIST,
  rPlaylist
})

const getAlbum = album => ({
  type: GET_ALBUM,
  album
})

const getUserPlaylist = playlist => ({
  type: GET_PLAYLIST,
  playlist
})

export const fetchRPlaylist = token => {
  return async dispatch => {
    try {
      let returnList = []
      for (let i = 0; i < 16; i++) {
        const {data} = await axios({
          url: 'https://api.spotify.com/v1/search',
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + token
          },
          params: {
            type: 'track',
            q: getRandomSearch()
          }
        })
        returnList.push(data)
        dispatch(getRandomPlaylist(returnList))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAlbum = token => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(getAlbum(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUserPlaylist = token => {
  return async dispatch => {
    try {
      const {data} = await axios({
        url: 'https://api.spotify.com/v1/me/top/tracks',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(getUserPlaylist(data))
    } catch (error) {
      console.error(error)
    }
  }
}

let initialState = {
  token: null,
  album: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUM:
      return {...state, album: action.album}
    case GET_PLAYLIST:
      return {...state, playlist: action.playlist}
    case GET_RANDOM_PLAYLIST:
      return {...state, rPlaylist: action.rPlaylist}
    default:
      return state
  }
}
