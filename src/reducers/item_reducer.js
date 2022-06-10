import {CREATE_ITEM,ERRORITEM_API, EDIT_ITEM, VIEW_ITEMS,VIEW_ITEM,VIEWUPLOADED_ITEMS, DELETE_ITEM,EDIT_IMAGE_ITEM} from '../action/types'

const INTIAL_STATE = {
       data:{},
       errors: {},
       message: false
    
  };

export const item_reducer = (state = INTIAL_STATE,action) => {
    const states = {...state}
    switch (action.type){
        case CREATE_ITEM:
            states.data = action.payload
            states.errors = {}
            states.message = true
            return states
        
        case VIEW_ITEMS:
            states.data = action.payload
            states.errors = {}
            states.message = false
            return states
        
        
            case VIEW_ITEM:
                states.data = action.payload
                states.errors = {}
                states.message = false
                return states

            case VIEWUPLOADED_ITEMS:
            states.data = action.payload
            states.errors = {}
            states.message = false
            return states
            
            case DELETE_ITEM:
                states.errors = {}
            states.message = true
            return states

            case EDIT_IMAGE_ITEM:
                states.errors = {}
            states.message = true
            return states

            case EDIT_ITEM:
                states.errors = {}
            states.message = true
            return states
        
            
        case ERRORITEM_API:
            states.errors = action.payload
            return  states


    
        default:
            return state
 
    }
    
    
}