
import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/category/";

http.setToken(getToken());

export  function getCategories() {
  
  let result =  http.get(apiEndpoint)
  return result

}










export function getToken() {
  return localStorage.getItem(tokenKey);
}

