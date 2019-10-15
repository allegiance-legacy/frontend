import * as types from 'actions/actionTypes'

const initialState = {
  posts: [],
  error: '',
}
export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      }
    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case types.POST_LIKE_SUCCESS:
      const newState = state.posts.filter(obj => {
        if (obj.id === action.payload.post_id) {
          obj.likes.push(action.payload)
          return obj
        }
        return obj
      })
      return {
        ...state,
        posts: newState,
      }
    default:
      return state
  }
}
