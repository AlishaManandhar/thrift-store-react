
import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/order/";

http.setToken(getToken());

export  function placeOrder(request_data) {
  
  let result =  http.post(apiEndpoint,request_data)
  return result

}

export  function getRequestedOrder() {
  
  
  let result =  http.get(apiEndpoint + 'requested')
  return result

}


// export  function getConfirmList() {
  
//   http.setToken(getToken());
//   let result =  http.get(apiEndpoint + 'confirm-list')
//   return result

// }

export function cancelOrder(id)
{
  
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'cancel/' + id)
  return result
}

export function editOrder(request_data,id)
{
  
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'requested/' + id,request_data)
  return result
}


export function respondOrder(request_data,id)
{
  
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'respondOrder/' + id, request_data)
  return result
}

export function confirmOrder(request_data,id)
{
  console.log(id)
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'confirm/' + id, request_data)
  return result
}

export  function getOrders() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'seller')
  return result

}

export  function getMyBooks() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'mybooks')
  return result

}

export function getToken() {
    return localStorage.getItem(tokenKey);
  }





