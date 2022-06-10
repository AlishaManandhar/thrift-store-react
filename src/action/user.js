import {LOGIN_USER,ERRORUSER_API,CREATE_USER,MY_INFO,UPDATE_USER,CHANGEPASSWORD_USER,CHANGEPICTURE_USER,LOGOUT} from "./types"
import {login as logIn, registerUser,getMe, updateUser,updatePassword,updateProfilePicture,logout} from "../services/userServices"

export const login = (email,password)=>  async dispatch =>{
  
  try {
    const {data,token} = await logIn({email,password})
    localStorage.setItem('token', token)
   
    return dispatch({
      type: LOGIN_USER,
      payload: data
    })
  }
  catch (e) {

    const error  = e.response.data;
    const errors = {}
    if (error) {
      errors['password'] = error.password
    }
    return dispatch({
        type: ERRORUSER_API,
        payload: errors
      })
  }
}
      
export const register = (request_data)=>  async dispatch =>{
  
  try {
    const {data} = await registerUser(request_data)
    
    return dispatch({
      type: CREATE_USER,
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
        type: ERRORUSER_API,
        payload: errors
      })
  }
}

      
export const myInfo = ()=>  async dispatch =>{
  
  try {
    const {data} = await getMe()
    
    return dispatch({
      type: MY_INFO,
      payload: data
    })
  }
  catch (e) {

    const errors  = e.response.data;
    
    return dispatch({
        type: ERRORUSER_API,
        payload: errors
      })
  }
}

export const updateProfile = (request_data)=>  async dispatch =>{
  
  try {
    const {data} = await updateUser(request_data)
    
    return dispatch({
      type: UPDATE_USER,
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
        type: ERRORUSER_API,
        payload: errors
      })
  }
}


export const changePassword = (request_data)=>  async dispatch =>{
  
  try {
    const {data} = await updatePassword(request_data)
    
    return dispatch({
      type: CHANGEPASSWORD_USER,
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
        type: ERRORUSER_API,
        payload: errors
      })
  }
}


export const changePicture = (request_data)=>  async dispatch =>{
  
  try {
    const {data} = await updateProfilePicture(request_data)
    
    return dispatch({
      type: CHANGEPICTURE_USER,
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
        type: ERRORUSER_API,
        payload: errors
      })
  }
}


export const logOut = ()=>  async dispatch =>{
  
  try {
    await logout()
    localStorage.removeItem("token")
    return dispatch({
      type: LOGOUT,
      payload: {}
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
        type: ERRORUSER_API,
        payload: errors
      })
  }
}





      
      