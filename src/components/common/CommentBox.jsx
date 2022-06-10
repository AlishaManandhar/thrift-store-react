import React from 'react'

import { Comment, Icon, Image,Form, Button } from "semantic-ui-react"
import faker from "faker"
import { Link } from 'react-router-dom'

export default class CommentBox extends React.Component {
  state = { collapsed: true, formOpen: false,comment: "", itemId:this.props.itemId }

  handleCheckbox = () => {
    const collapsed = this.state.collapsed
    this.setState({ collapsed: !collapsed })
  }


  handleSubmit = async(id) => {
    const {itemId,comment : message} = this.state
    this.setState({ formOpen: false})
    await this.props.onSubmit({
      itemId, message, parentId:id
    })
    
  }

  handleReply = () => this.setState({ formOpen: true })

  render() {
    const { comment, nestedReplies } = this.props
  
    const {userId:user,message} = comment
    return (

      <React.Fragment>


        <Comment>
          <Comment.Avatar  src={"http://localhost:8000/images/" + user.avatar} />
          <Comment.Content>

            <Comment.Author as='a'>{user.firstname + " " + user.lastname}</Comment.Author>
            <Comment.Metadata>
              <div>{comment.createdAt}</div>
            </Comment.Metadata>
            <Comment.Text>{message}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={this.handleReply}>Reply</Comment.Action>
            </Comment.Actions>

            {this.state.formOpen &&
              <Comment>
              <Comment.Avatar src="http://localhost:8000/images/1625310014688-2860Screenshot%20(20).png" />
              <Comment.Content>
    
                <Comment.Author as='a'>You</Comment.Author>
              
              <Form reply >
                <Form.TextArea  value={this.state.comment} onChange = {(e,{value}) => this.setState({comment:value})}/>
                <Button content='Add Reply' onClick={() => this.handleSubmit(comment._id)} primary />
              </Form>
              </Comment.Content>
              </Comment>
            }


          </Comment.Content>
          {nestedReplies === "" ? "" :
            (<p as={Link} to="#" style={{ margin: "5px 0 0 3vw", color: "teal" }} onClick={this.handleCheckbox}>
              <strong>
                {this.state.collapsed ? <p> <Icon name='angle right' />Replies</p> : <p> <Icon name='angle left' />Go back </p>}

              </strong>
            </p>)}
          {nestedReplies !== "" &&
            <Comment.Group collapsed={this.state.collapsed}>
              {nestedReplies}
            </Comment.Group>
          }


        </Comment>
      </React.Fragment>


    )
  }
}