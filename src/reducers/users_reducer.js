import {LOGIN_USER,ERRORUSER_API,CREATE_USER,MY_INFO, UPDATE_USER, LOGOUT, CHANGEPASSWORD_USER,CHANGEPICTURE_USER} from '../action/types'

const INTIAL_STATE = {
       data:{},
       errors: {},
       message:false,
       isSigned: false
  };

export const users_reducer = (state = INTIAL_STATE,action) => {
    const states = {...state}
    switch (action.type){
        case LOGIN_USER:
            states.data = action.payload
            states.errors = {}
            states.isSigned = true
            states.message = false
            return states
            
        
        case CREATE_USER:
            states.errors = {}
            states.isSigned = false
            states.message = true
            return  states
        
        case MY_INFO:
            states.data = action.payload
            states.message = false
            return states
            
            
        case CHANGEPASSWORD_USER:
            states.errors = {}
            states.data = action.payload
            return states

        case CHANGEPICTURE_USER:
            states.errors = {}
            states.data = action.payload
            return states
            
        case ERRORUSER_API:

            states.message = false
            states.errors = action.payload
            return  states

        case UPDATE_USER:
            states.data = action.payload
            states.message = true
            
            return states
        
        case LOGOUT:
            states.data = action.payload
            states.errors = {}
            states.isSigned = false
            return states

           
        
            

        default:
            return state
 
    }
    
    
}