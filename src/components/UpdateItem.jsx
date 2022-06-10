import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Container, Message, FormField, Segment, Select,Radio,TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import { getCategories } from "../action/category";
import { getItem, editItem } from "../action/item";
import Forms from "./common/Form";
import Joi from "joi";

class SellItem extends Forms {
  state = {
    data: {
      itemname: "",
      deliveryArea: "",
      deliveryCharge: "",
      usedFor: "",
      description: "",
      price: "",
      stock: "",
      homeDelivery: "",
      negotiable: "",
      category: "",
      condition: ""
    },
    errors: {},
    categories: [],
    message: false,
    
  };


async componentDidMount()
{
   await this.props.getCategories() 
   const id = this.props.match.params.id;
  await this.props.getItem(id)
  
      const data = {...this.props.item.data}
      delete data["__v"]
      delete data["createdAt"]
      delete data["updatedAt"]
      delete data["images"]
      delete data["_id"]
      delete data["sold"]
      delete data["status"]
      delete data["sellerId"]

      data["category"] = data["category"]._id
      this.setState({
          data,
          message: this.props.item.message,
          errors:this.props.item.errors
          
      })
   this.setState({ categories: this.props.category.data })


}
componentDidUpdate(prevProps) {
 
  if (prevProps.item.errors !== this.props.item.errors)
    this.setState({ errors: this.props.item.errors, message: this.props.item.message })
  if (prevProps.item.message !== this.props.item.message)
    this.setState({ errors: this.props.item.errors, message: this.props.item.message })
  

}

componentWillUnmount() {
  
  this.setState = (state,callback)=>{
      return;
  };
}

  toggle = (e,{name}) => 
  {
    
    const data = {...this.state.data}
    const errors = {...this.state.errors}
    if (errors[name])  delete errors[name]
    data[name] = !data[name]
    this.setState({data,errors})
  }
 

  condition = ['Good', 'Ok', 'Excellent', 'Like New', 'Usable']
 

  renderCondition = this.condition.map(element => {
    
    return {
      key: element,
      value: element,
      text: element
    }
  })

  renderCategory = (categories ) => {
   
    return categories.map(element => {
    
    return {
      key: element["_id"],
      value: element["_id"],
      text: element["category"]
    }
  
  })
}

  

  schema = {
    itemname: Joi.string().min(3).max(150).required(),
    deliveryArea: Joi.string().min(3).max(150).required(),
    deliveryCharge: Joi.number().min(0).required(),
    usedFor: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(20).required(),
    stock: Joi.number().min(1).required(),
    negotiable: Joi.boolean().required(),
    homeDelivery: Joi.boolean().required(),
    condition: Joi.string().required(),
    category: Joi.string().required()
  }



  doSubmit = async () => {
    
    let request_data = { ...this.state.data }
       
    await this.props.editItem(request_data,this.props.match.params.id)
    


  }


  render() {
    const { itemname, homeDelivery, deliveryArea, deliveryCharge, category, usedFor, negotiable, description, condition, price, stock} = this.state.data;
    const { errors } = this.state;
    if (this.state.message === true)
    {
      
        return <Redirect to="/uploads" /> 
      
    }

    
    return (
    
      <Segment raised style={{ backgroundColor: "ghostwhite" }}>
        <Container text textAlign="left">
          <h1 className="ui header huge green" style={{ marginTop: "5vh" }} >
            Update
          </h1>
          <Form size="large" success={this.state.message} onSubmit={this.handleOnSubmit} >
            <Message
              success
              header='Form Completed'
              content="Your item has been updated"
            />

            <Form.Input as={FormField} label='Item name' placeholder='Item name' onChange={this.handleOnChange} value={itemname} name="itemname" error={"itemname" in errors ? errors.itemname : null} />
            <Form.Group widths='equal'>
              <Form.Input
                name="condition"
                control={Select}
                value={condition}
                options={this.renderCondition}
                label={{ children: "Condition", htmlFor: 'form-select-control-condition' }}
                placeholder='Select condition'
                onChange={this.handleSelectChange}
                error={"condition" in errors ? errors.condition : null}
                search
                searchInput={{ id: 'form-select-control-condition' }}
              />
              <Form.Input label='UsedFor' as={FormField} placeholder='1 month..' onChange={this.handleOnChange} value={usedFor} name="usedFor" error={"usedFor" in errors ? errors.usedFor : null} />
            </Form.Group>

            <Form.Group widths='equal'> 
            
            <Form.Input
              name="category"
              control={Select}
              value={category}
              options={this.renderCategory(this.state.categories)}
              label={{ children: "Category", htmlFor: 'form-select-control-category' }}
              placeholder='Select category'
              onChange={this.handleSelectChange}
              error={"category" in errors ? errors.category : null}
              search
              searchInput={{ id: 'form-select-control-category' }}
            />
            <Form.Input
              name="price"
              value={price}
              min={20}
              type="number"
              label="Price"
              placeholder='Amount in Rs..'
              onChange={this.handleOnChange}
              error={"price" in errors ? errors.price : null}
              
            />
            <Form.Input
              name="stock"
              value={stock}
              min={1}
              type="number"
              label="Quantity"
              onChange={this.handleOnChange}
              error={"stock" in errors ? errors.stock : null}
              
            />
          
            </Form.Group>
            
            
            <Form.Input control={TextArea} label='Description' onChange={this.handleOnChange} name="description" error={"description" in errors ? errors.description : null} value={description} placeholder='Tell us more about your item...' />
            
            <Form.Group widths='equal' >
            <Form.Input  as={FormField}   label="Negotiable" name="negotiable"  control={Radio} toggle onChange={this.toggle}  checked={negotiable}/>
            <Form.Input   as={FormField}  label="Home Delivery" name="homeDelivery"  control={Radio} toggle onChange={this.toggle}  checked={homeDelivery}/>
            </Form.Group>

            <Form.Group widths='equal' >
            <Form.Input
              name="deliveryCharge"
              value={deliveryCharge}
              min={10}
              type="number" 
              label="Delivery Charges"
              placeholder='Amount in Rs..'
              onChange={this.handleOnChange}
              error={"deliveryCharge" in errors ? errors.deliveryCharge : null}
              
            />
                  <Form.Input
              name="deliveryArea"
              value={deliveryArea}
              label="Delivery Area"
              placeholder='Near my area...'
              onChange={this.handleOnChange}
              error={"deliveryArea" in errors ? errors.deliveryArea : null}
              
            />
            </Form.Group>
           
            <Button type='submit' primary>Submit</Button> <br /> <br />
           


          </Form>
        </Container>
      </Segment>

    );
  }
}

const mapStateToProps = (state) => {
  const { category,item } = state;
  return {category,item };
};

export default connect(mapStateToProps, { getCategories, getItem,editItem })(SellItem);
