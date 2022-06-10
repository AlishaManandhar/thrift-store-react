
import { Button, Form, FormField,Modal} from 'semantic-ui-react'
import {connect} from "react-redux"
import {changePassword} from "../action/user"
import Joi from "joi"
import Forms from "./common/Form"



class UpdatePassword extends Forms{
    state = {
        data :{
            rePassword:"",
            password: "",
            oldPassword: ""
        },
        errors:  {},
        
    }

  
    
    
    componentDidUpdate(prevProps) {
      
      if (prevProps.user.errors !== this.props.user.errors)
      {
        
        this.setState({ errors: this.props.user.errors })
      
      }
      if (prevProps.user.data !== this.props.user.data)
      {
        console.log("Hi")
        this.props.reject()
      
      }
        
    }
  
   

    schema = {
      oldPassword:Joi.string().min(8).required(),
      password: Joi.string().min(8).required(),
      rePassword: Joi.string().min(8).required()
    };

    doSubmit = () => {
      const { rePassword, password } = this.state.data;

      if (password !== rePassword) {
  
        let errors = { ...this.state.errors };
        errors.rePassword = "Password dont match";
        this.setState({ errors });
        return null;
      }
      this.props.changePassword(this.state.data)

    }

    
    render(){
         const {oldPassword,password,rePassword} = this.state.data
         const {errors} = this.state
       
      return (
           
        <Modal style={{top:"10%"}}
        onClose={this.props.reject}
        open={this.props.open}
        size="mini"
        dimmer="blurring"
    >
      <Modal.Header>Change Password</Modal.Header>
     <Modal.Content>
     <Form size="small"  onSubmit={this.handleOnSubmit}>
       
          <Form.Input
            as={FormField}
            error={"oldPassword" in errors ? errors.oldPassword : null}
            icon='lock'
            iconPosition='left'
            name="oldPassword"
            type='password'
            value={oldPassword}
            onChange={this.handleOnChange}
            placeholder="Old Password"
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
          
          <Form.Input
            as={FormField}
            error={"rePassword" in errors ? errors.rePassword : null}
            icon='lock'
            iconPosition='left'
            name="rePassword"
            type='password'
            value={rePassword}
            onChange={this.handleOnChange}
            placeholder="ReEnter Password.."
          />
          
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={this.props.reject}>
          Cancel
        </Button>
        <Button
          content="Save changes"
          labelPosition='right'
          icon='checkmark'
          onClick={this.handleOnSubmit}
          primary
        />
      </Modal.Actions>


    </Modal>
    
        
        
    
     
  )}
  
}

const mapStateToProps = (state) =>{
  const {user} = state
  return {user}
}

export default connect(mapStateToProps,
    {changePassword})(UpdatePassword)
