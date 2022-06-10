
import { Button, Form, FormField,Modal} from 'semantic-ui-react'
import {connect} from "react-redux"
import {changePicture} from "../action/user"

import Forms from "./common/Form"



class UpdatePicture extends Forms{
    state = {
        selectedFile: null,
        errors:  {}
    }
    onChangeFileHandler=event=>{
        let errors = {...this.state.errors}
        if (errors.avatar)
        {   
            delete errors["avatar"]
        }
        
        this.setState({
            selectedFile: event.target.files[0],
            errors
          })  
    }
    
  
    
    
    componentDidUpdate(prevProps) {
      
      if (prevProps.user.errors !== this.props.user.errors)
      {
        
        this.setState({ errors: this.props.user.errors })
      
      }
      if (prevProps.user.data !== this.props.user.data)
      {
        
        this.props.reject()
      
      }
        
    }
  
   

    

    doSubmitImage = async() => {
        if (this.state.selectedFile  === null)
        {
                const errors = {...this.state.errors}
                errors["avatar"] = "Please upload an image"
                return this.setState({errors})
        }
        let data = new FormData()
        data.append("avatar",this.state.selectedFile)
        
        this.props.changePicture(data)
      
    
    }

    
    render(){
        
         const {errors} = this.state
       
      return (
           
        <Modal style={{top:"10%"}}
        onClose={this.props.reject}
        open={this.props.open}
        size="mini"
        dimmer="blurring"
    >
      <Modal.Header>Update Profile Picture</Modal.Header>
     <Modal.Content>
     <Form size="small"  enctype="multipart-formdata">
       
          
          <Form.Input
            as={FormField}
            error={"avatar" in errors ? errors.avatar : null}
            name="avatar"
            type='file'
            onChange={this.onChangeFileHandler}
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
          onClick={this.doSubmitImage}
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
    {changePicture})(UpdatePicture)
