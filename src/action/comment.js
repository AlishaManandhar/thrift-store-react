import {GET_COMMENTS,ADD_COMMENT,ERRORCOMMENT_API} from "./types"
import {getComments as viewComments,addComment  } from "../services/commentService"


export const  postComment = (request_data) => async (dispatch) => {
    try {
        await addComment(request_data)
        
        return dispatch({
          type: ADD_COMMENT
        })
      }
      catch (e) {
    
        const error  = e.response.data;
        const errors = {}
        if (error) {
          for (let item in error)
              errors[item] = error[item]
          }
        return dispatch({
            type: ERRORCOMMENT_API,
            payload: errors
          })
      }
}


export const  getComments = (id) => async (dispatch) => {
  try {
      const {data} = await viewComments(id)
      
      return dispatch({
        type: GET_COMMENTS,
        payload: data
      })
    }
    catch (e) {
  
     
      return dispatch({
          type: ERRORCOMMENT_API,
          payload: e
        })
    }
}
