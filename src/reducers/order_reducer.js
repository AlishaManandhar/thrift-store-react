import {ORDER_ITEM,ERRORORDER_API,VIEWORDERED_ITEMS,CANCEL_ORDER,EDIT_ORDER,ORDERS_RECIEVED,RESPOND_ORDER,CONFIRM_ORDER} from '../action/types'

const INTIAL_STATE = {
       data:[],
       errors: {},
       message: false
    
  };

export const order_reducer = (state = INTIAL_STATE,action) => {
    const states = {...state}
    switch (action.type){
        case ORDER_ITEM:
            states.message = true
            return states
        case VIEWORDERED_ITEMS:
            states.data = action.payload
            states.errors = {}
            states.message = false
            return states
        
        case CANCEL_ORDER:
            states.errors = {}
            states.message = true
            return states
        
        case EDIT_ORDER:
            states.errors = {}
            states.message = true
            return states
        
        case CONFIRM_ORDER:
                states.errors = {}
                states.message = true
                return states
        
        case RESPOND_ORDER:
                states.errors = {}
                states.message = true
                return states
        
        case ORDERS_RECIEVED:
            states.data = action.payload
            states.errors = {}
            states.message = false
            return states

            
            
        case ERRORORDER_API:
            states.errors = action.payload
            states.message = false
            return  states


    
        default:
            return state
 
    }
    
    
}