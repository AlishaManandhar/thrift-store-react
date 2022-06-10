import React from "react";
import _ from "lodash";

class Pagination extends React.Component {
  renderPage = () => {
      const { itemsCount, currentPage, pageSize, onPageChange} = this.props
    const range = Math.ceil(itemsCount / pageSize);
    if (range === 1) return null;
    const pages = _.range(1, range + 1);
    

    return pages.map((page) => (
      <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
        <button
         href="#"
          onClick={() => onPageChange(page)}
          className="page-link"
        >
          {page}
        </button>
      </li>
    ));
  };

  render() {
    return (
        <Grid centered  style={{backgroundColor:"#F8F8F8", margin:"20px 0"}}>
    <Grid.Column mobile={8} tablet={8} computer={4}>
      
    

  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem="<<"
    lastItem=">>"
    siblingRange={1}
    totalPages={10}
   
 
  />
     </Grid.Column>
     </Grid>
    );
  }
}

export default Pagination;
