import React from "react";
import _ from "lodash";
import { Link } from 'react-router-dom'

import { Card, Image, Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { getItems,searchClear,search as searchItem } from "../action/item";
import { getCategories } from "../action/category";

import SortBy from "./common/SortBy";
import Filter from "./common/Filter"
import SearchBar from "./common/SearchBar";
import {
  
  Breadcrumb,
  
  
} from "semantic-ui-react";
class Home extends React.Component {

    state = {
        data : [],
        selectedCategory: null,
        sortBy: null,
        category: [],
        searchWord : null,
        searchData: []
    }

    handleSearchData = async(searchWord)=> {
      this.setState({searchWord})
    } 

    clearSearchData = () => {
      this.setState({searchWord:null})
      this.props.searchClear()
    }
    handleCategory = (id) => {
      this.setState({selectedCategory: id})
    }
    onAscending = () => {
      
      this.setState({sortBy: 'asc'})
    }
    onDescending = () => {
      
      this.setState({sortBy:'desc'})
    }
    onDefault = () => {
     
      
      this.setState({sortBy: null})
    }
    
    renderBreadCrumb = () => {
      return (
        <Breadcrumb size="large">
          <Breadcrumb.Section as={Link} to="#" onClick={this.clearSearchData}>
            Home
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
  
          <Breadcrumb.Section active>Search For: {this.state.searchWord} </Breadcrumb.Section>
        </Breadcrumb>
      );
    };
    
    
    async componentDidMount(){
        await this.props.getItems()
        await this.props.getCategories()

    }

    async componentDidUpdate(prevProps,prevState)
    {
        
        if (prevProps.item.data !== this.props.item.data)
        {
            this.setState({data: this.props.item.data})
        }
        else if (prevProps.category.data !== this.props.category.data)
        {
            this.setState({category: this.props.category.data})
        }
        else if (prevProps.search.data !== this.props.search.data )
        {
          
          this.setState({searchData: this.props.search.data})

        }
        if (prevState.searchWord !== this.state.searchWord)
        {
         
             this.props.searchItem({query: this.state.searchWord })
         
          

        }
        
        
    }

    paginatedData = () => {
      const {selectedCategory,sortBy,data,searchData} = this.state
      

      let items = (searchData.length === 0) ? data : searchData
    
      if (selectedCategory !== null)
      {
        items  = items.filter(el =>  {
              return el.category._id === selectedCategory
        })
      }
          
      if (sortBy === null) return items

      else if (sortBy === 'asc')
      {
          return _.sortBy(items,["price","itemname"])
      }
      else
      { 
        return _.sortBy(items,["price","itemname"]).reverse()

      }
    }

    ItemCard = () => {
    
    const items = this.paginatedData()
    
    return items.map((el) => {
      return (
        <Card key={el._id} style={{marginBottom: "20px"}}>
          <Image src={"http://localhost:8000/images/" + el.images[0]} size="large" centered wrapped ui={false} />
          <Card.Content>
            <Card.Header>{el.itemname}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <h5 className="ui black header">
              <br /> Price: &nbsp;&nbsp;&nbsp;&nbsp;{el.price}{" "}
            </h5>
            <Button as={Link} to={"/item/" + el._id} >
              Read More..
            </Button>
          </Card.Content>
        </Card>
      );
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.searchWord && this.renderBreadCrumb()}
                <Grid style={{ backgroundColor: "#F8F8F8", margin: "10px 0px" }}>
          <Grid.Row>
            <Grid.Column width={5}>
            
                 <SortBy  default={this.onDefault} asc={this.onAscending} desc={this.onDescending} />
                
            </Grid.Column>
            <Grid.Column width={8}>
              <SearchBar data={this.state.data} handleSearch={this.handleSearchData} />
            </Grid.Column>
            <Grid.Column width={3}>
            <Filter onChange={this.handleCategory} category={this.state.category}/>

            </Grid.Column>
           
          </Grid.Row>
        </Grid>
        <Card.Group  doubling itemsPerRow={5}>
          
        {this.state.data.length > 0 && this.ItemCard()}
           </Card.Group> 
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    const { item,category,search } = state;
    return {item,category,search };
  };

  
export default connect(mapStateToProps,{getItems,getCategories,searchClear,searchItem})(Home)