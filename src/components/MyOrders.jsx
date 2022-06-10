import React from "react";
import _ from "lodash";
import { Link } from 'react-router-dom'

import {
  Dropdown, Image, Breadcrumb,
  Button, Grid, Header, Table, Icon, TableBody,Confirm
} from "semantic-ui-react";
import { connect } from "react-redux";


import { getOrderedItems,cancel,update as updateOrder } from "../action/order";
import ModalForm from "./common/ModalForm";
class MyOrders extends React.Component {

  state = {
    data: [],
    selectedFilter: null,
    openCancel:false,
    openEdit:false,
    orderId:null,
    quantity:0,
    error:null,
    stock:0

  }

  handleOpenCancel = (id) => this.setState({ openCancel: true,orderId:id })
  handleCloseCancel = () => this.setState({ openCancel: false,orderId:null })

  handleOpenEdit = (id,stock) => this.setState({ openEdit: true,orderId:id,stock })
  handleCloseEdit = () => this.setState({ openEdit: false,orderId:null,stock:null })
  
  handleOnModalChange = (e,{value}) => {
  
    this.setState({ quantity: value });
  };



   handleAcceptEdit = async () => {
    if (this.state.quantity <= this.state.stock && this.state.quantity > 0 )
    {   
        this.handleCloseEdit()
        const {quantity,orderId} = this.state
        await this.props.updateOrder(orderId,{quantity})
        this.setState({ quantity: 0 });
      
    }
    else{
        this.setState({ error: "The quantity should be between 1 and " + this.state.stock })
    }
}

handleAcceptCancel = async () => {
  await this.props.cancel(this.state.orderId)
  this.handleCloseCancel()
  
}
  
componentWillUnmount() {
  
  this.setState = (state,callback)=>{
      return;
  };
}

  

  renderBreadCrumb = () => {
    return (
      <Breadcrumb size="large">
        <Breadcrumb.Section as={Link} to="/">
          Home
          </Breadcrumb.Section>
        <Breadcrumb.Divider />

        <Breadcrumb.Section active>Orders:</Breadcrumb.Section>
      </Breadcrumb>
    );
  };

  async componentDidUpdate()
  {
    if (this.props.order.message)
    {
      console.log("jhjhh")
      await this.props.getOrderedItems()
    }
    if (this.props.order.data !== this.state.data)
    {
      console.log("updated")
      this.setState({data: this.props.order.data})
    }
  }


  async componentDidMount() {

    await this.props.getOrderedItems()
    this.setState({ data: this.props.order.data })
  }

  renderDropdown = () => {
    return (
      <Dropdown
        text='Filter Orders'
        icon='filter'
        labeled
        button
        className='icon'
      >
        <Dropdown.Menu>
          <Dropdown.Item text="All" onClick={() => this.setState({ selectedFilter: null })} />
          <Dropdown.Item text="Status : requested" onClick={() => this.setState({ selectedFilter: "requested" })} />
          <Dropdown.Item text="Status : accepted" onClick={() => this.setState({ selectedFilter: "accepted" })} />
          <Dropdown.Item text="Status : rejected" onClick={() => this.setState({ selectedFilter: "rejected" })} />
          <Dropdown.Item text="Status : confirmed" onClick={() => this.setState({ selectedFilter: "sold" })} />
          <Dropdown.Item text="Status : cancelled" onClick={() => this.setState({ selectedFilter: "cancelled" })} />
        </Dropdown.Menu>
      </Dropdown>
    )
  }


  paginatedData = () => {
    const { selectedFilter, data } = this.state



    if (selectedFilter === null) return data
    else {
      let orders = []
        orders = data.filter(el => {
        return el.status === selectedFilter
      })
      return orders
    }
    

  }


  renderTable = () => {
    const data = this.paginatedData()
    return (
      <div style={{ width: "auto", overflowX: "auto", marginTop: "10px" }}>
        <Table unstackable  >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Itemname</Table.HeaderCell>
              <Table.HeaderCell >Price</Table.HeaderCell>
              <Table.HeaderCell >Quantity</Table.HeaderCell>
              <Table.HeaderCell >Order status</Table.HeaderCell>
              <Table.HeaderCell >SellerName</Table.HeaderCell>
              <Table.HeaderCell >SellerContact</Table.HeaderCell>
              <Table.HeaderCell >Actions</Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <TableBody>
            {data.map(el => {
              return (
                <Table.Row key={el._id}>
                  <Table.Cell> <Link to={"/item/" + el.item_id._id}>{el.item_id.itemname} </Link></Table.Cell>
                  <Table.Cell>{el.item_id.price}</Table.Cell>
                  <Table.Cell>{el.quantity}</Table.Cell>
                  <Table.Cell>{el.status}</Table.Cell>
                  <Table.Cell>{el.seller_id.firstname + " " + el.seller_id.lastname}</Table.Cell>
                  <Table.Cell>{el.seller_id.contact}</Table.Cell>
                  <Table.Cell><Button negative onClick = {() => this.handleOpenCancel(el._id)}>Cancel</Button> <Button primary onClick = {() => this.handleOpenEdit(el._id,el.item_id.stock)}>Edit</Button> </Table.Cell>

                </Table.Row>
              )
            })}
          </TableBody>

        </Table>
      </div>
    )

  }



  render() {
    return (
      <React.Fragment>
        {this.renderBreadCrumb()}

        
        <Header as='h2' dividing color="grey" icon textAlign='center'>
          <Header.Content>My orders</Header.Content>
        </Header>

        {this.renderDropdown()}

        {this.renderTable()}
        <Confirm
          open={this.state.openCancel}
          size="mini"
          content='Do you want to cancel the order'
          onCancel={this.handleCloseCancel}
          confirmButton='Cancel Order'
          cancelButton="No"
          header="Cancel Order"
          onConfirm={this.handleAcceptCancel}
        />

        <ModalForm
          reject={this.handleCloseEdit}
          accept={this.handleAcceptEdit}
          open={this.state.openEdit}
          onChange={this.handleOnModalChange}
          name="quantity"
          quantity={this.state.quantity}
          header="Edit your order"
          acceptText="Save Changes"

          error={this.state.error}
        />


      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { order } = state;
  return { order };
};


export default connect(mapStateToProps, { getOrderedItems,cancel,updateOrder })(MyOrders)