import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Container, Message, FormField, Segment, Select,Radio,TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import { getCategories } from "../action/category";
import { sellItem } from "../action/item";
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
      homeDelivery: false,
      negotiable: true,
      category: "",
      condition: ""
    },
    errors: {},
    categories: [],
    message: false,
    selectedFile :null
  };

  handleFileChange=event=>{
    let errors = {...this.state.errors}
    if (errors.images)
    {
        delete errors["images"]
    }
    let data = {...this.state.data}
    console.log(event.target.files)
    this.setState({
        selectedFile: event.target.files,
        data,
        errors
      })
    
   

}
async componentDidMount()
{
   await this.props.getCategories() 
   this.setState({ categories: this.props.category.data })

}
componentDidUpdate(prevProps) {
  const {errors,message} = this.props.item
  
  if (prevProps.item.message !== message)
  { 
    this.setState({errors,message})
  }
  if (prevProps.item.errors !== errors)
  {
    this.setState({errors})
  }
  
    
}
componentWillUnmount() {
  
  this.setState = (state,callback)=>{
      return;
  };
}

  toggle = (e,{name}) => 
  {
    console.log(name)
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
      if (this.state.selectedFile === null)
      {
        const errors = {...this.state.errors}
        errors["images"] = "Please upload img"
        return this.setState({errors})
      }
    let request_data = { ...this.state.data }
        let data = new FormData()
        for (const key of Object.keys(this.state.selectedFile)) {
          data.append('images', this.state.selectedFile[key])
      }
        
        for(let item in request_data)
           data.append([item],request_data[item])
        
    await this.props.sell(data)
    


  }


  render() {
    const { itemname, homeDelivery, deliveryArea, deliveryCharge, category, usedFor, negotiable, description, condition, price, stock} = this.state.data;
    const { errors } = this.state;
    if (this.state.message === true)
    {
      
        return <Redirect to="/" /> 
      
    }

    
    return (
    
      <Segment raised style={{ backgroundColor: "ghostwhite" }}>
        <Container text textAlign="left">
          <h1 className="ui header huge green" style={{ marginTop: "5vh" }} >
            Sell Item
          </h1>
          <Form size="large" success={this.state.message} onSubmit={this.handleOnSubmit} encType="multipart/form-data">
            <Message
              success
              header='Form Completed'
              content="Your item has been uploaded"
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
            <Form.Input
              name="images"
              
              label="Images"
              type="file"
              multiple
              accept="image/*"
              onChange={this.handleFileChange}
              error={"images" in errors ? errors.images : null}
              
            />
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

export default connect(mapStateToProps, { getCategories, sell:sellItem })(SellItem);
