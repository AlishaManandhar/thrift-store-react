import { Link } from "react-router-dom";
import {
  Image,
  Breadcrumb,
  Segment,
  Grid,
  List,
  Button
} from "semantic-ui-react";
import React from "react";
import images from ".//../images/images.png";
import UpdatePicture from "./UpdatePicture";

import { connect } from "react-redux";
import { login, myInfo } from "../action/user";

import UpdatePassword from "./PasswordChange";

class MyProfile extends React.Component {
  state = {
    openPassword: false,
    openProfile: false,
  };
  handleOpenPwd = () => this.setState({ openPassword: true });
  handleClosePwd = () => this.setState({ openPassword: false });
  handleOpenProfile = () => this.setState({ openProfile: true });
  handleCloseProfile = () => this.setState({ openProfile: false });

  renderBreadCrumb = () => {
    return (
      <Breadcrumb size="large">
        <Breadcrumb.Section as={Link} to="/">
          Home
        </Breadcrumb.Section>
        <Breadcrumb.Divider />

        <Breadcrumb.Section active>My Profile</Breadcrumb.Section>
      </Breadcrumb>
    );
  };

  renderImage = (image) => {
    return (
      <div style={{ margin: "5vh 0" }}>
        <Image
          src={
            image === "false" ? images : "http://localhost:8000/images/" + image
          }
          size="medium"
          centered
        />
      </div>
    );
  };

  async componentDidMount() {
    await this.props.myInfo();
  }
  componentDidUpdate(prevProps) {
    console.log("myProfile");
    if (prevProps.user.data !== this.props.user.data) {
      this.setState({ data: this.props.user.data });
    }
  }

  render() {
    const { data } = this.props.user;
    return (
      <React.Fragment>
       
        <UpdatePassword
          reject={this.handleClosePwd}
          accept={this.handleOpenPwd}
          open={this.state.openPassword}
        />
        <UpdatePicture
          reject={this.handleCloseProfile}
          accept={this.handleOpenProfile}
          open={this.state.openProfile}
        />

        {this.renderBreadCrumb()}

        <Segment
          raised
          style={{ marginTop: "5vh", backgroundColor: "#fffbfb" }}
        >
          <Grid columns={2} stackable>
            <Grid.Column>
              {this.renderImage(this.props.user.data["avatar"])}
            </Grid.Column>

            <Grid.Column>
              <h1 className="ui header huge" style={{ marginTop: "5vh" }}>
                My Profile
              </h1>

              <div>
                <Button
                  as={Link}
                  to="/me/update"
                  content="Update Profile"
                  circular
                  style={{ marginBottom: "10px" }}
                />
                <Button
                  content="Change Picture"
                  onClick={this.handleOpenProfile}
                  style={{ marginBottom: "10px" }}
                  circular
                />
                <Button
                  content="Change Password"
                  onClick={this.handleOpenPwd}
                  style={{ marginBottom: "10px" }}
                  circular
                />
              </div>

              <List size="large" divided>
                <List.Item>
                  <strong>Username:</strong> &nbsp;
                  {data.firstname + " " + data.lastname}{" "}
                </List.Item>
                <List.Item>
                  <br />
                  <strong>Email:</strong> &nbsp;{data.email}
                </List.Item>
                <List.Item>
                  <br />
                  <strong>Contact:</strong>&nbsp; {data.contact}
                </List.Item>
                <List.Item>
                  <br />
                  <strong>District:</strong> &nbsp;{data.district}
                </List.Item>
                <List.Item>
                  <br />
                  <strong>Province:</strong>&nbsp; {data.province}
                </List.Item>
                <List.Item>
                  <br />
                  <strong>Tole:</strong>&nbsp; {data.tole}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, { login, myInfo })(MyProfile);
