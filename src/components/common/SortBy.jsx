import React from 'react'
import { Dropdown } from 'semantic-ui-react'



const SortBy = (props) => (
  <Dropdown text='Sort By' floated="right">
    <Dropdown.Menu>
    <Dropdown.Item icon="arrows alternate" text='Default'  onClick={props.default}/>
      <Dropdown.Item icon='long arrow alternate up' text='Price Low to High' onClick={props.asc}/>
      <Dropdown.Item icon='long arrow alternate down' text='Price high to low' onClick={props.desc} />
    </Dropdown.Menu>
  </Dropdown>
)

export default SortBy