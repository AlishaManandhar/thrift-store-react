import React from 'react'
import { Button, Comment,Form } from 'semantic-ui-react'
import CommentBox from "./common/CommentBox"
import { connect } from "react-redux";
import { getComments,postComment } from "../action/comment";


class Commentthreaded extends React.Component {
   

    state = {
      data: {},
      comment : "",
      itemId: this.props.id

  }

   handleSubmit = async() => {
    const {itemId,comment : message} = this.state
    await this.props.postComment({
      itemId, message, parentId:null
    })
    this.setState({comment:""})
  
    
  }

    async componentDidMount(){
        await this.props.getComments(this.props.id)
        this.setState({data: this.props.comment.data})
    }
    async componentDidUpdate()
    {
        
        if (this.props.comment.posted )
        {
            await this.props.getComments(this.props.id)
            this.setState({data: this.props.comment.data, comment:null})
            
        }  

    }
  
  renderComment = (data) => {
    
    
    const comments = []
    for (let comment of Object.values(data))
    {
      let nestedReplies = ""
      if (comment.children && Object.keys(comment.children).length > 0) {
        
        nestedReplies =  this.renderComment(comment.children);
      }
      
      const result = 
        <Comment.Group  size="medium">
            <CommentBox comment={comment}  itemId= {this.state.itemId} onSubmit={this.props.postComment} nestedReplies={nestedReplies}/>
        </Comment.Group>
    
    comments.push(result)
    }
    return comments;
    }
    
    render()
    {
    
      return (
        
        <React.Fragment>
          {Object.keys(this.state.data).length > 0 &&
        this.renderComment(this.state.data)}
       <Comment.Group>
        <Comment>
          <Comment.Avatar src="http://localhost:8000/images/1625310014688-2860Screenshot%20(20).png" />
          <Comment.Content>

            <Comment.Author as='a'>You</Comment.Author>
          
              <Form reply >
                <Form.TextArea value={this.state.comment} onChange = {(e,{value}) => this.setState({comment:value})} />
                <Button content='Add Reply' onClick={this.handleSubmit} primary />
              </Form>
            


          </Comment.Content>
        

        </Comment>
        </Comment.Group>
     
        </React.Fragment>
      )
    }
     
  }
 

const mapStateToProps = (state) => {
  const { comment,user } = state;
  return {comment,user};
};


export default connect(mapStateToProps,{getComments,postComment})(Commentthreaded)