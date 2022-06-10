import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'



export default class SearchExampleStandard extends Component {
  state = { isLoading: false, results: [], value: '' }
  initialState = { isLoading: false, results: [], value: '' }
  
  handleResultSelect = (e, { result }) =>{
      
      this.setState({ value: result.title })
      this.props.handleSearch(result.title)
  } 

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(this.initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.data.map(el=> {
          return {title:el.itemname}
        }), isMatch),
      })
    }, 300)
    

  
      
      
  }
  
 
  render() {
    const { isLoading, value, results } = this.state
    
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            fluid
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 100, {
              leading: true,
            })}
            input="text"
            
            
            results={results}
            value={value}
            
          />
        </Grid.Column>
        
        
      </Grid>
    )
  }
}
