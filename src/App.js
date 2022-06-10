import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { Switch,Route,BrowserRouter } from 'react-router-dom'


import { Container} from 'semantic-ui-react'
import Login from "./components/Login"
import Register from "./components/Register"
import SellItem from "./components/SellItem"
import Home from "./components/Home"
import Item from "./components/Item"


import MyProfile from './components/MyProfile';
import UpdateProfile from './components/UpdateProfile';

import ProtectedRoute from './components/ProtectedRoute';
import MyOrders from './components/MyOrders'
import Seller from './components/Seller'
import MyItems from './components/MyItems'
import UpdateItem from './components/UpdateItem'
export default class App extends  Component {

  render()
  {
    return(
      
    <Container >
      
       <BrowserRouter>
        
        <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        
                 
        
        <ProtectedRoute  path="/profile" exact={true} component={MyProfile}/>
        <ProtectedRoute  path="/me/update" exact={true} component={UpdateProfile}/>
        <ProtectedRoute  path="/item/create" exact={true} component={SellItem}/>
        <ProtectedRoute  path="/item/:id" exact={true} component={Item}/>

        <ProtectedRoute  path="/" exact={true} component={Home}/>
        <ProtectedRoute  path="/orders" exact={true} component={MyOrders}/>
        <ProtectedRoute  path="/seller" exact={true} component={Seller}/>
        <ProtectedRoute  path="/uploads" exact={true} component={MyItems}/>
        <ProtectedRoute  path="/item/update/:id" exact={true} component={UpdateItem}/>




        
          
        </Switch> 
       </BrowserRouter>
      </Container>
    )

  }
}

  
    