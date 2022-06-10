import React, { Component } from 'react'
import { Button, Menu,Icon,Label,Sidebar,Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import { logOut } from "../action/user";
import { connect } from 'react-redux'


class NavBar extends Component {

  state = { activeItem: null, notification: false, visible:true }

  handleVisibleClick = () => {
    const visible = !(this.state.visible)
    this.setState({visible: visible})
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name,notification:true})

  render() {
    const { activeItem } = this.state
    
    return (
      <React.Fragment>
        <Grid columns={1} style={{marginTop: "10px"}}>
             <Grid.Column>
        
        <Menu size="large">
        <Button
          icon="bars"
          onClick={this.handleVisibleClick}
        />
        
       
         <Menu.Menu position="right" >
         <Menu.Item
          name='notification'
          active={activeItem === 'notification'}
          onClick={this.handleItemClick}
        >
          <Icon name='bell'>
          <Label color='red' size="large" floating  >18</Label>
          </Icon>
          
        </Menu.Item>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.props.logOut}
        />
        </Menu.Menu>
        </Menu>
      </Grid.Column>
      <Grid.Column>
      <Sidebar.Pushable>
          
          <Sidebar
            as={Menu}
            animation='overlay'
            icon="labelled"
            inverted


            onHide={this.handleVisibleClick}
            vertical
            visible={this.state.visible}
            width='thin'
          >
            <Menu.Item as={Link} to="/"  active={activeItem === 'home'}
          onClick={this.handleItemClick}>
              <Icon name='home' />
              Home
            </Menu.Item>
           
        <Menu.Item 
          name='sellbook'
          as={Link}
          to="/item/create"
          icon="upload"
          active={activeItem === 'sellbook'}
          onClick={this.handleItemClick}
        />
         <Menu.Item as={Link} to="/profile" name="profile" active={activeItem === 'profile'}
          onClick={this.handleItemClick}>
              <Icon name='user' />
              Profile
            </Menu.Item>
            <Menu.Item as={Link} to="/orders" name="orders" active={activeItem === 'orders'}
          onClick={this.handleItemClick}>
              <Icon name='shopping basket' />
              My orders
            </Menu.Item>
         
            <Menu.Item as={Link} to="/seller" name="receivedOrders" active={activeItem === 'receivedOrders'}
          onClick={this.handleItemClick}>
              <Icon name='eye'  />
              Requested Items(seller)
            </Menu.Item>
            
            <Menu.Item as={Link} to="/uploads" name="UploadedItems" active={activeItem === 'UploadedItems'}
          onClick={this.handleItemClick}>
              <Icon name='upload'  />
              Uploaded Items
            </Menu.Item>
        
             

       
          
          
          
         
       
     
     
      </Sidebar>
      <Sidebar.Pusher>
             {this.props.component}
      </Sidebar.Pusher>
            </Sidebar.Pushable>
            
      </Grid.Column>
      </Grid>
       
      
      </React.Fragment>
    )
  }
}



export default connect(null, {logOut})(NavBar)