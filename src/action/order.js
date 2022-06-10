import {ORDER_ITEM,ERRORORDER_API,VIEWORDERED_ITEMS,CANCEL_ORDER,EDIT_ORDER,ORDERS_RECIEVED,RESPOND_ORDER,CONFIRM_ORDER} from "./types"
import { placeOrder,getRequestedOrder,cancelOrder,editOrder,getOrders,respondOrder,confirmOrder } from "../services/orderService"


export const  orderItem = (request_data) => async (dispatch) => {
    try {
        const {data} = await placeOrder(request_data)
        
        return dispatch({
          type: ORDER_ITEM,
          payload: data
        })
      }
      catch (e) {
    
        const error  = e.response.data;
        const errors = error
        
        return dispatch({
            type: ERRORORDER_API,
            payload: errors
          })
      }
}

export const  getOrderedItems = (request_data) => async (dispatch) => {
  try {
      const {data} = await getRequestedOrder()
      
      return dispatch({
        type: VIEWORDERED_ITEMS,
        payload: data
      })
    }
    catch (e) {
  
      const error  = e.response.data;
      const errors = error
      
      return dispatch({
          type: ERRORORDER_API,
          payload: errors
        })
    }
}

export const  cancel = (id) => async (dispatch) => {
  try {
      const {data} = await cancelOrder(id)
      
      return dispatch({
        type: CANCEL_ORDER,
        payload: data
      })
    }
    catch (e) {
  
      const error  = e.response.data;
      const errors = error
      
      return dispatch({
          type: ERRORORDER_API,
          payload: errors
        })
    }
}

export const  update = (id,request_data) => async (dispatch) => {
  try {
      const {data} = await editOrder(request_data,id)
      
      return dispatch({
        type: EDIT_ORDER,
        payload: data
      })
    }
    catch (e) {
  
      const error  = e.response.data;
      const errors = error
      
      return dispatch({
          type: ERRORORDER_API,
          payload: errors
        })
    }
}

export const  recievedOrders = () => async (dispatch) => {
  try {
      const {data} = await getOrders()
      
      return dispatch({
        type: ORDERS_RECIEVED,
        payload: data
      })
    }
    catch (e) {
  
      const error  = e.response.data;
      const errors = error
      
      return dispatch({
          type: ERRORORDER_API,
          payload: errors
        })
    }
}

export const  respond = (id,request_data) => async (dispatch) => {
  try {
      await respondOrder(request_data,id)
      
      return dispatch({
        type: RESPOND_ORDER
      })
    }
    catch (e) {
  
      const error  = e.response.data;
      const errors = error
      
      return dispatch({
          type: ERRORORDER_API,
          payload: errors
        })
    }
}

export const  confirm = (id,request_data) => async (dispatch) => {
  try {
      await confirmOrder(request_data,id)
      
      return dispatch({
        type: CONFIRM_ORDER
      })
    }
    catch (e) {
  
      const error  = e.response.data;
      const errors = error
      
      return dispatch({
          type: ERRORORDER_API,
          payload: errors
        })
    }
}
