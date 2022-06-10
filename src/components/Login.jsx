
import { Link,Redirect } from 'react-router-dom'
import { Button, Container, Form, FormField} from 'semantic-ui-react'
import {connect} from "react-redux"
import {login} from "../action/user"
import Joi from "joi"
import Forms from "./common/Form"



class Login extends Forms{
    state = {
        data :{
            email:"",
            password: ""
        },
        errors:  this.props.user.errors
    }

    
    componentDidUpdate(prevProps) {

      if (prevProps.user.errors !== this.props.user.errors)
      {
        this.setState({ errors: this.props.user.errors })
      }
        
    }
  
   

    schema = {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(8).required(),
    };

    doSubmit = () => {
      
      this.props.login(this.state.data.email,this.state.data.password)

    }

    
    render(){
         const {email,password} = this.state.data
         const {errors} = this.state
         if (this.props.user.isSigned)
         {
          console.log("HI a;;")
          return <Redirect to="/" />
        }
      return (
           
        <Container text textAlign="left">
        <Form size="large" style={{marginTop:"10vh"}} onSubmit={this.handleOnSubmit}>
          <Form.Input
            as={FormField}
            error={"email" in errors ? errors.email : null}
            value={email}
            onChange={this.handleOnChange}
            icon='user'
            iconPosition='left'
            placeholder='Your email..'
            name="email"
            type='email'
          />
          <Form.Input
            as={FormField}
            error={"password" in errors ? errors.password : null}
            icon='lock'
            iconPosition='left'
            name="password"
            type='password'
            value={password}
            onChange={this.handleOnChange}
            placeholder="Password Here"
          />

          <Button  type='submit' fluid primary>Login</Button> <br />
          <Button as={Link} to= "/register"  fluid positive>Register</Button>
        </Form>
        </Container> 
    
     
  )}
  
}

const mapStateToProps = (state) =>{
  const {user} = state
  return {user}
}

export default connect(mapStateToProps,
    {login})(Login)
