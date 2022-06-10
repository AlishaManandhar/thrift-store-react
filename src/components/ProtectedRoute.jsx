import React from "react";
import { Redirect, Route } from "react-router-dom";
import {connect} from "react-redux"
import NavBar from "./NavBar";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  
const isSigned = restOfProps.user.isSigned

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isSigned ?  <NavBar  component={<Component {...props} />}/> : <Redirect to="/login" />
    
      }
    />
  );
}
const mapStateToProps = (state) =>{
    const {user} = state
    return {user}
  }
export default connect(mapStateToProps,null)(ProtectedRoute);