import { GET_CATEGORIES,ERRORCATEGORY_API } from "./types";
import { getCategories as getCategory } from "../services/categoryServices";

export const getCategories = ()=>  async dispatch =>{
  
    try {
      const {data} = await getCategory()
      
      return dispatch({
        type: GET_CATEGORIES,
        payload: data
      })
    }
    catch (e) {
  
      const errors  = e.response.data;
      
      return dispatch({
          type: ERRORCATEGORY_API,
          payload: errors
        })
    }
  }
  