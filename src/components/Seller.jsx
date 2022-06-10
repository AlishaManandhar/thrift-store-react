import React from "react";
import _ from "lodash";
import { Link } from 'react-router-dom'

import {
  Dropdown, Image, Breadcrumb,
  Button, Grid, Header, Table, Icon, TableBody,Confirm
} from "semantic-ui-react";
import { connect } from "react-redux";


import { recievedOrders,respond,confirm as confirmOrder } from "../action/order";

class Seller extends React.Component {

  state = {
    data: [],
    selectedFilter: "requested",
    openAccept:false,
    openReject:false,
    openConfirm:false,
    openRejectAccepted :false,
    orderId:null,
    

  }
 
  handleOpenAccept = (id) => this.setState({ openAccept: true,orderId:id })
  handleCloseAccept = () => this.setState({ openAccept: false,orderId:null })

  handleOpenConfirm = (id) => this.setState({ openConfirm: true,orderId:id })
  handleCloseConfirm = () => this.setState({ openConfirm: false,orderId:null })

  handleOpenReject = (id) => this.setState({ openReject: true,orderId:id })
  handleCloseReject = () => this.setState({ openReject: false,orderId:null })
  
  handleOpenRejectAccepted = (id) => this.setState({ openRejectAccepted: true,orderId:id })
  handleCloseRejectAccepted = () => this.setState({ openRejectAccepted: false,orderId:null })
  
  onAcceptOrder = async () => {
    await this.props.respond(this.state.orderId,{status: "accepted"})
    this.handleCloseAccept()
    
  }

  
  onConfirmOrder = async () => {
    await this.props.confirmOrder(this.state.orderId,{status:"sold"})
    this.handleCloseConfirm()
  }
  onRejectOrder = async () => {
    await this.props.respond(this.state.orderId,{status: "rejected"})
    this.handleCloseReject()
    
  }

  onRejectAcceptedOrder = async () => {
    await this.props.confirmOrder(this.state.orderId,{status: "rejected"})
    this.handleCloseRejectAccepted()
    
  }
    
    

  renderBreadCrumb = () => {
    return (
      <Breadcrumb size="large">
        <Breadcrumb.Section as={Link} to="/">
          Home
          </Breadcrumb.Section>
        <Breadcrumb.Divider />

        <Breadcrumb.Section active>Orders recieved:</Breadcrumb.Section>
      </Breadcrumb>
    );
  };

  async componentDidUpdate()
  {
    if (this.props.order.message)
    {
      
      await this.props.recievedOrders()
    }
    if (this.props.order.data !== this.state.data)
    {
      
      this.setState({data: this.props.order.data})
    }
  }


  async componentDidMount() {

    await this.props.recievedOrders()
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
          <Dropdown.Item text="Orders recieved" onClick={() => this.setState({ selectedFilter: "requested" })} />
          <Dropdown.Item text="Orders rejected" onClick={() => this.setState({ selectedFilter: "rejected" })} />
          <Dropdown.Item text="Orders to be confirmed" onClick={() => this.setState({ selectedFilter: "accepted" })} />
          <Dropdown.Item text="Item sold" onClick={() => this.setState({ selectedFilter: "sold" })} />

         
        </Dropdown.Menu>
      </Dropdown>
    )
  }


  paginatedData = () => {
    const {data,selectedFilter } = this.state
    let orders = []

    if (selectedFilter !== "uploaded") 
    {
      orders = data.filter(el => {
        return el.status === selectedFilter
      })
      return orders
      
    }
    return data
  
  }

  renderActions = (el) => {
    const selectedFilter = this.state.selectedFilter
    if (selectedFilter === "requested")
    {
      return (
              <Table.Cell>
             <Button negative onClick={() =>this.handleOpenAccept(el._id)} >Accept</Button> <Button primary onClick={() =>this.handleOpenReject(el._id)}>Reject</Button>
             </Table.Cell>
      )
    }
    else if (selectedFilter === "rejected")
    {
      return null
    }
    else if (selectedFilter === "accepted")
    {
      return (
        <Table.Cell>
        <Button negative onClick={() =>this.handleOpenRejectAccepted(el._id)}>Reject Order</Button> <Button positive onClick={() =>this.handleOpenConfirm(el._id)}>Sold</Button>
        </Table.Cell>
      )
    }
    else if (selectedFilter === "sold")
    {
      return  null
    }
  }

  


  renderTable = () => {
    const data = this.paginatedData()
    const {selectedFilter} = this.state
    return (
      <div style={{ width: "auto", overflowX: "auto", marginTop: "10px" }}>
        <Table unstackable  >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Itemname</Table.HeaderCell>
              <Table.HeaderCell >Price</Table.HeaderCell>
              <Table.HeaderCell >Quantity</Table.HeaderCell>
              <Table.HeaderCell >Order status</Table.HeaderCell>
              <Table.HeaderCell >BuyerName</Table.HeaderCell>
              <Table.HeaderCell >Contact</Table.HeaderCell>
              {(selectedFilter === "requested" || selectedFilter === "accepted") &&
              <Table.HeaderCell >Actions</Table.HeaderCell>}

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
                  <Table.Cell>{el.buyer_id.firstname + " " + el.buyer_id.lastname}</Table.Cell>
                  <Table.Cell>{el.buyer_id.contact}</Table.Cell>
                  
                   {this.renderActions(el)}
                    

                </Table.Row>
              )
            })}
          </TableBody>

        </Table>
      </div>
    )

  }

  componentWillUnmount() {
  
    this.setState = (state,callback)=>{
        return;
    };
  }
  

  render() {
    return (
      <React.Fragment>
        {this.renderBreadCrumb()}

        
        <Header as='h2' dividing color="grey" icon textAlign='center'>
          <Header.Content>Recieved Orders</Header.Content>
        </Header>

        {this.renderDropdown()}

        {this.renderTable()}
        <Confirm
          open={this.state.openAccept}
          size="mini"
          content='Accept this order'
          onCancel={this.handleCloseAccept}
          confirmButton='Accept'
          cancelButton="Close"
          header="Accept this order"
          onConfirm={this.onAcceptOrder}
        />
        <Confirm
          open={this.state.openReject}
          size="mini"
          content='Reject this order'
          onCancel={this.handleCloseReject}
          confirmButton='Reject'
          cancelButton="Close"
          header="Reject this order"
          onConfirm={this.onRejectOrder}
        />
        <Confirm
          open={this.state.openConfirm}
          size="mini"
          content='Confirm this order as Sold'
          onCancel={this.handleCloseConfirm}
          confirmButton='Sold'
          cancelButton="Close"
          header="Mark as sold"
          onConfirm={this.onConfirmOrder}
        />

        <Confirm
          open={this.state.openRejectAccepted}
          size="mini"
          content='I wont sell this item'
          onCancel={this.handleCloseRejectAccepted}
          confirmButton='Reject'
          cancelButton="Close"
          header="Mark as rejected"
          onConfirm={this.onRejectAcceptedOrder}
        />

       


      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { order } = state;
  return { order };
};


export default connect(mapStateToProps, { recievedOrders,respond,confirmOrder })(Seller)