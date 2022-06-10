
import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/item/";

http.setToken(getToken());
export  function addItem(request_data) {
  http.setToken(getToken());
  let result =  http.post(apiEndpoint,request_data)
  return result

}
export  function getItems() {
  
  let result =  http.get(apiEndpoint)
  return result

}

export  function getItem(id) {
  
  let result =  http.get(apiEndpoint + id)
  return result

}

export  function searchItem(data) {
  
  let result =  http.post(apiEndpoint + "search", data)
  return result

}

export  function deleteItem(id) {
  

  let result =  http.get(apiEndpoint + "delete/" + id)
  return result

}

export  function updateItem(request_data,id) {
  
  let result =  http.put(apiEndpoint + id,request_data)
  return result

}

export  function updateItemImage(request_data,id) {
  
  let result =  http.put(apiEndpoint + 'updateImage/' + id,request_data)
  return result
}



export  function getUploadedItems() {
  
                                       
  let result =  http.get(apiEndpoint + "uploads")
  return result

}








export function getToken() {
  return localStorage.getItem(tokenKey);
}

