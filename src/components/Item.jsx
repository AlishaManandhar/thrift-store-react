import React from 'react'
import {
  Button,
  Divider,
  Grid,
  Header,
  Segment,
  Image,
  Table,
  Label,
  Message
} from 'semantic-ui-react'
import { connect } from "react-redux";
import { getItem } from "../action/item";
import { orderItem } from "../action/order";

import { Component } from 'react'
import Comment from "./Comment"
import ModalForm from './common/ModalForm';


class Item extends Component {
  
  state = {
    data: null, 
    selectedImage: null,
    open: false,
    quantity:0,
    error:null
  }
  handleOpenModal = () => { this.setState({open:true})}
  handleCloseModal = () => { this.setState({open:false})}


  handleOnChange = (image) => {
    this.setState({ selectedImage: image })
  }

  handleOnModalChange = (e,{value}) => {
  
    this.setState({ quantity: value });
  };
  
  doSubmit = async () => {
    if (this.state.quantity <= this.state.data.stock && this.state.quantity > 0 )
    {   
        this.handleCloseModal()
        const {quantity, data} = this.state
        console.log(this.state.data)
        await this.props.orderItem({quantity, seller_id:data.sellerId._id, item_id:data._id})
        this.setState({ quantity: 0 });
      
    }
    else{
        this.setState({ error: "The quantity should be between 1 and " + this.state.data.stock })
    }
}
  
  async componentDidMount() 
  {
    const id = this.props.match.params.id;
    await this.props.getItem(id)
  }

  componentDidUpdate(prevProps)
    {
        
        if (prevProps.item.data !== this.props.item.data)
        {
            this.setState({data: this.props.item.data,selectedImage:this.props.item.data.images[0]})
        }  
    }
  renderDate = (date) => {
    const d = new Date(date)
    return d.toDateString()
  }


  renderGeneral = () => {
    const {data} = this.state
    return (
      <Table unstackable>
         <Label as='a' color='red' ribbon>
              General
            </Label>
        <Table.Body>
              <Table.Row>
            <Table.Cell>Itemname</Table.Cell>
            <Table.Cell textAlign='left'>{data.itemname}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Category</Table.Cell>
            <Table.Cell textAlign='left'>{data.category.category}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Date Published</Table.Cell>
            <Table.Cell textAlign='left'>{this.renderDate(data.createdAt)}</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
    )
  }

  renderDescription = () => {
    const {data} = this.state
  
    return (
      <Table unstackable >
         <Label as='a' color='blue' ribbon>
              Description
            </Label>
        <Table.Body>
              <Table.Row>
            <Table.Cell>Condition</Table.Cell>
            <Table.Cell textAlign='left'>{data.condition}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Used For</Table.Cell>
            <Table.Cell textAlign='left'>{data.usedFor}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Price Negotiable</Table.Cell>
            <Table.Cell textAlign='left'>{data.negotiable ? "Not fixed" : "Fixed Price"}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>In stock</Table.Cell>
            <Table.Cell textAlign='left'>{data.stock}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Description</Table.Cell>
            <Table.Cell textAlign='left'>{data.description}</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
      
    )
  }

  renderSeller = () => {
    const data = this.state.data.sellerId
    return (
      <Table unstackable>
         <Label as='a' color='orange' ribbon>
              Seller Info
            </Label>
        <Table.Body>
              <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell textAlign='left'>{data.firstname + " " + data.lastname}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Contact</Table.Cell>
            <Table.Cell textAlign='left'>{data.contact}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell textAlign='left'>{data.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Address</Table.Cell>
            <Table.Cell textAlign='left'>{`Province${data.province}`}<br/>  {data.district}<br /> {data.tole}</Table.Cell>
            </Table.Row>
          
        </Table.Body>
      </Table>
    )
  }

  renderDelivery = () => {
    const {data} = this.state
    return (
      <Table unstackable >
         <Label as='a' color='teal' ribbon>
              Delivery Info
            </Label>
        <Table.Body>
              <Table.Row>
            <Table.Cell>Home Delivery</Table.Cell>
            <Table.Cell textAlign='left'>{data.homeDelivery ? "Yes" : "No"}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Delivery Amount</Table.Cell>
            <Table.Cell textAlign='left'>{data.deliveryCharge}</Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.Cell>Delivery Area</Table.Cell>
            <Table.Cell textAlign='left'>{data.deliveryArea}</Table.Cell>
            </Table.Row>
           
        </Table.Body>
      </Table>
    )
  }

  renderImage = () => {
    if (this.state.data.images.length === 1) return null
    return (<Image.Group size='tiny'>

      {this.state.data.images.map(el => {
        return (
          <Image src={"http://localhost:8000/images/" + el} size="tiny" key={el} spaced="left" verticalAlign="middle" wrapped onClick={() => this.handleOnChange(el)} style={{ objectFit: "cover" }} />
        )
      })}
    </Image.Group>

    )


  }

  renderContent = () => {
    return (
      <React.Fragment>
      <Grid.Column>
      <Image src={"http://localhost:8000/images/" + this.state.selectedImage} size="large" style={{ height: "400px", objectFit: "contain" }} />
      {this.renderImage()}
      <Grid textAlign="left">
        
              
               
      </Grid>
    </Grid.Column>
    
    <Grid.Column>
      <Header>
        
        {this.state.data.itemname}
      </Header>


      {this.renderGeneral()}
      {this.renderDescription()}
     
      {this.renderSeller()}
      {this.renderDelivery()}



      <Button negative onClick={this.handleOpenModal}>Buy now</Button>
    </Grid.Column>
  
    
    </React.Fragment>
    )
  }

  render() {
    
    return (
      <React.Fragment >
        <Segment placeholder>
        <ModalForm
          reject={this.handleCloseModal}
          accept={this.doSubmit}
          open={this.state.open}
          onChange={this.handleOnModalChange}
          name="quantity"
          quantity={this.state.quantity}
          header="Order Now"
          acceptText="Order"

          error={this.state.error}
        />
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical />

            <Grid.Row>
             {this.state.data && this.renderContent()}
            </Grid.Row>
          
          </Grid>
        </Segment>
       
        <Segment raised>
           <Comment id={this.props.match.params.id}/>
        </Segment>
               
            
        
       
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  const { item,order} = state;
  return {item,order};
};


export default connect(mapStateToProps,{getItem,orderItem})(Item)