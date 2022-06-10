
import { Button, Form, FormField,Modal} from 'semantic-ui-react'
import {connect} from "react-redux"


import Forms from "./Form"



class ModalImage extends Forms{
    
    

    
    render(){
        
         const {errors,header,open,onChange} = this.props
       
      return (
           
        <Modal style={{top:"10%"}}
        onClose={this.props.reject}
        open={open}
        size="mini"
        dimmer="blurring"
    >
      <Modal.Header>{header}</Modal.Header>
     <Modal.Content>
     <Form size="small"  enctype="multipart-formdata">
       
          
          <Form.Input
            as={FormField}
            error={"avatar" in errors ? errors.avatar : null}
            name="avatar"
            type='file'
            multiple
            accept="image/*"
            onChange={onChange}
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
          onClick={this.props.accept}
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

export default ModalImage
