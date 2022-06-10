import React from "react";
import _ from "lodash";
import { Link } from 'react-router-dom'

import {
  Dropdown, Image, Breadcrumb,
  Button, Grid, Header, Table, Icon, TableBody,Confirm
} from "semantic-ui-react";
import { connect } from "react-redux";


import {getUploaded,deleteItem,editImage} from "../action/item"
import ModalImage from "./common/ModalImage";

class Seller extends React.Component {

  state = {
    data: [],
    selectedFilter: "requested",
    openDelete :false,
    openImage :false,
    itemId:null,
    selectedFile:null,
    errors:{},
    
  }
  handleOpenImage = (id) => this.setState({ openImage: true,itemId:id })
  handleCloseImage = () => this.setState({ openImage: false,itemId:null,message:false })

  handleOpenDelete = (id) => this.setState({ openDelete: true,itemId:id })
  handleCloseDelete = () => this.setState({ openDelete: false,itemId:null })

  onAcceptDelete = async() => {
      
      await this.props.deleteItem(this.state.itemId)
      this.handleCloseDelete()
  }

  async componentDidMount() {

    await this.props.getUploaded()
  }


  onChangeFileHandler= event =>{
    let errors = {...this.state.errors}
    if (errors.avatar)
    {   
        delete errors["avatar"]
    }
    
    this.setState({
        selectedFile: event.target.files,
        errors
      })  
}
 
doSubmitImage = async() => {
  if (this.state.selectedFile  === null)
  {
          const errors = {...this.state.errors}
          errors["avatar"] = "Pleasse upload an image "
          return this.setState({errors})
  }
  let data = new FormData()
  for (const key of Object.keys(this.state.selectedFile)) {
    data.append('images', this.state.selectedFile[key])
}
  
  
  await this.props.editImage(data,this.state.itemId)
  this.handleCloseImage()


}


  renderBreadCrumb = () => {
    return (
      <Breadcrumb size="large">
        <Breadcrumb.Section as={Link} to="/">
          Home
          </Breadcrumb.Section>
        <Breadcrumb.Divider />

        <Breadcrumb.Section active>My uploads</Breadcrumb.Section>
      </Breadcrumb>
    );
  };

  async componentDidUpdate(prevProps)
  {
    if (this.props.item.message)
    {
      console.log("Messagecheck")
    
      await this.props.getUploaded()

    }
    if (prevProps.item.errors !== this.props.item.errors)
    {
      
      this.setState({ errors: this.props.item.errors })
    
    }
    if (this.props.item.data !== this.state.data)
    {
    
      this.setState({data: this.props.item.data})
    }
  }





  

  

  


  renderTable = () => {
    const data = this.state.data
    
    return (
      <div style={{ width: "auto", overflowX: "auto", marginTop: "10px" }}>
        <Table unstackable  >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Itemname</Table.HeaderCell>
              <Table.HeaderCell >Price</Table.HeaderCell>
              <Table.HeaderCell >Stock</Table.HeaderCell>
              <Table.HeaderCell >Negotiable</Table.HeaderCell>
              <Table.HeaderCell >Condition</Table.HeaderCell>
              <Table.HeaderCell >Category</Table.HeaderCell>
              
              <Table.HeaderCell >Actions</Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <TableBody>
            {data.map(el => {
              return (
                <Table.Row key={el._id}>
                  <Table.Cell> <Link to={"/item/" + el._id}>{el.itemname} </Link></Table.Cell>
                  <Table.Cell>{el.price}</Table.Cell>
                  <Table.Cell>{el.stock - el.sold}</Table.Cell>
                  <Table.Cell>{el.negotiable ? "Fixed" : "Not Fixed"}</Table.Cell>
                  <Table.Cell>{el.condition}</Table.Cell>
                  <Table.Cell>{el.category.category}</Table.Cell>
                <Button as={Link} to={"/item/update/" + el._id} primary>Edit</Button> <Button negative onClick={() => this.handleOpenDelete(el._id)}>Delete</Button>  <Button positive icon="pencil" onClick={() => this.handleOpenImage(el._id)}>Change Image</Button>
                  <Table.Cell></Table.Cell>
                  
                  
                    

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
          <Header.Content>My Uploaded Items</Header.Content>
        </Header>

        {this.renderTable()}
        <Confirm
          open={this.state.openDelete}
          size="mini"
          content='Are you sure to delete this item?'
          onCancel={this.handleCloseDelete}
          confirmButton='Yes'
          cancelButton="No"
          header="Delete Item"
          onConfirm={this.onAcceptDelete}
        />
        <ModalImage
          reject={this.handleCloseImage}
          accept={this.doSubmitImage}
          open={this.state.openImage}
          header="Update Item Image"
          onChange={this.onChangeFileHandler}
          errors={this.state.errors}
        />
       

        
       


      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { item } = state;
  return { item };
};


export default connect(mapStateToProps, { getUploaded,deleteItem,editImage })(Seller)