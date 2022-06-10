import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const renderDropDown = (category,onChange) => {
 return category.map(el => {
   console.log(el)
    return  (<Dropdown.Item  text={el.category} key={el._id} onClick={() => onChange(el._id)}/>)
 })
}
const Filter = (props) => (
  <Dropdown icon="filter" >
    <Dropdown.Menu>
         <Dropdown.Item  text="All"  onClick={() =>props.onChange(null)}/>
         {renderDropDown(props.category, props.onChange)}

    </Dropdown.Menu>
  </Dropdown>
)

export default Filter