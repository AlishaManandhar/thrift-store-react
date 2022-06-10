import {ADD_COMMENT,GET_COMMENTS,ERRORCOMMENT_API} from '../action/types'

const INTIAL_STATE = {
       data:{},
       errors: {},
       posted:false
    
  };

export const comment_reducer = (state = INTIAL_STATE,action) => {
    const states = {...state}
    switch (action.type){
        case ADD_COMMENT:
            states.posted = true
            return states
        
        case GET_COMMENTS:
            states.data = action.payload
            states.posted = false
            states.errors = {}
            return states
        
        
        
        case ERRORCOMMENT_API:
            states.errors = action.payload
            return  states

        default:
            return state
 
    }
    
    
}