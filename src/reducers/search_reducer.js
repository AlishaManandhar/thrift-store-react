import {CLEAN_QUERY,START_SEARCH} from '../action/types'

    

const initialState = {
    
   data:[],
  
   search:false
  }
  
export const search_reducer = (state = initialState, action) =>{
    switch (action.type) {
     
      case START_SEARCH:
        const states = {...state}
        console.log(action.payload)
        states.data = action.payload
        states.search = true
       return states
      
      case CLEAN_QUERY:
        return initialState
      
      default:
        return initialState
    }
  }
  