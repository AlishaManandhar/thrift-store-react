import {CREATE_ITEM, VIEW_ITEM, VIEW_ITEMS,VIEWUPLOADED_ITEMS,EDIT_IMAGE_ITEM, EDIT_ITEM, DELETE_ITEM,ERRORITEM_API, CLEAN_QUERY,START_SEARCH, VIEWORDERED_ITEMS} from "./types"
import { addItem,getItems as viewItems,searchItem, getItem as viewItem,getUploadedItems,deleteItem as deleteitem ,updateItem, updateItemImage} from "../services/itemService"


export const  sellItem = (request_data) => async (dispatch) => {
    try {
        const {data} = await addItem(request_data)
        
        return dispatch({
          type: CREATE_ITEM,
          payload: data
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
            type: ERRORITEM_API,
            payload: errors
          })
      }
}


export const  getItems = () => async (dispatch) => {
  try {
      const {data} = await viewItems()
      
      return dispatch({
        type: VIEW_ITEMS,
        payload: data
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
          type: ERRORITEM_API,
          payload: errors
        })
    }
}

export const  getItem = (id) => async (dispatch) => {
  try {
      const {data} = await viewItem(id)
      
      return dispatch({
        type: VIEW_ITEM,
        payload: data
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
          type: ERRORITEM_API,
          payload: errors
        })
    }
}

export const  search = (request_data) => async (dispatch) => {
 
      const {data} = await searchItem(request_data)
      
     
      return dispatch({
        type: START_SEARCH,
        payload: data
      })
    
    
}


export const  searchClear = () => {
 
      return {
        type: CLEAN_QUERY,
        payload:[]
      }
     
}

export const  getUploaded = () => async (dispatch) => {
  try {
      const {data} = await getUploadedItems()
      
      return dispatch({
        type: VIEWUPLOADED_ITEMS,
        payload: data
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
          type: ERRORITEM_API,
          payload: errors
        })
    }
}

export const  deleteItem = (id) => async (dispatch) => {
  try {
      await deleteitem(id)
      
      return dispatch({
        type: DELETE_ITEM
        
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
          type: ERRORITEM_API,
          payload: errors
        })
    }
}


export const  editItem = (request_data,id) => async (dispatch) => {
  try {
      const {data} = await updateItem(request_data,id)
      return dispatch({
        type: EDIT_ITEM,
        payload: data
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
          type: ERRORITEM_API,
          payload: errors
        })
    }
}

export const  editImage = (request_data,id) => async (dispatch) => {
  try {
      await updateItemImage(request_data,id) 
         
      return dispatch({
        type: EDIT_IMAGE_ITEM
        
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
          type: ERRORITEM_API,
          payload: errors
        })
    }
}
