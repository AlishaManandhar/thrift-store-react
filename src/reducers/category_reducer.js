import {GET_CATEGORIES,ERRORCATEGORY_API} from '../action/types'

const INTIAL_STATE = {
       data:{},
       errors: {},
    
  };

export const category_reducer = (state = INTIAL_STATE,action) => {
    const states = {...state}
    switch (action.type){
        case GET_CATEGORIES:
            states.data = action.payload
            states.errors = {}
            return states
            
            
        case ERRORCATEGORY_API:

            
            states.data={}
            states.errors = action.payload
            return  states


    
        default:
            return state
 
    }
    
    
}