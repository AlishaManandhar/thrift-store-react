
import { Button, Form, FormField,Modal} from 'semantic-ui-react'
import {connect} from "react-redux"

import Forms from "./Form"



class ModalForm extends Forms{
    
    

    
    render(){
        
         const {error,header,quantity,onChange,accept,acceptText,reject,open,name} = this.props
       
      return (
           
        <Modal style={{top:"10%"}}
        onClose={reject}
        open={open}
        size="mini"
        
    >
      <Modal.Header>{header}</Modal.Header>
     <Modal.Content>
     <Form size="small">
       
          
          <Form.Input
            as={FormField}
            error={error ? error: null}
            name={name}
            type='number'
            onChange={onChange}
            value={quantity}
          />
          
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={reject}>
          Cancel
        </Button>
        <Button
          content={acceptText}
          labelPosition='right'
          icon='checkmark'
          onClick={accept}
          primary
        />
      </Modal.Actions>


    </Modal>
    
        
        
    
     
  )}
  
}



export default ModalForm
