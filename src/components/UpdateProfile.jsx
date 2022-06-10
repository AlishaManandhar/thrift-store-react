import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Form,  FormField, Select,Breadcrumb } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateProfile as update,myInfo } from "../action/user";
import Forms from "./common/Form";
import Joi from "joi";

class UpdateProfile extends Forms {
  state = {
    data: {},
    errors: {},
    message: ""
  };
  district = [
    "achham",
    "arghakhanchi",
    "baglung",
    "baitadi",
    "bajhang",
    "bajura",
    "banke",
    "bara",
    "bardiya",
    "bhaktapur",
    "bhojpur",
    "chitwan",
    "dadeldhura",
    "dailekh",
    "dang deukhuri",
    "darchula",
    "dhading",
    "dhankuta",
    "dhanusa",
    "dholkha",
    "dolpa",
    "doti",
    "gorkha",
    "gulmi",
    "humla",
    "ilam",
    "jajarkot",
    "jhapa",
    "jumla",
    "kailali",
    "kalikot",
    "kanchanpur",
    "kapilvastu",
    "kaski",
    "kathmandu",
    "kavrepalanchok",
    "khotang",
    "lalitpur",
    "lamjung",
    "mahottari",
    "makwanpur",
    "manang",
    "morang",
    "mugu",
    "mustang",
    "myagdi",
    "nawalparasi",
    "nuwakot",
    "okhaldhunga",
    "palpa",
    "panchthar",
    "parbat",
    "parsa",
    "pyuthan",
    "ramechhap",
    "rasuwa",
    "rautahat",
    "rolpa",
    "rukum",
    "rupandehi",
    "salyan",
    "sankhuwasabha",
    "saptari",
    "sarlahi",
    "sindhuli",
    "sindhupalchok",
    "siraha",
    "solukhumbu",
    "sunsari",
    "surkhet",
    "syangja",
    "tanahu",
    "taplejung",
    "terhathum",
    "udayapur"
  ]
  

  async componentDidMount()
  {
      await this.props.myInfo()
      const data = {...this.props.user.data}
      delete data["__v"]
      delete data["createdAt"]
      delete data["updatedAt"]
      delete data["avatar"]
      delete data["_id"]
      this.setState({
          data,
          message: this.props.user.message,
          errors:this.props.user.errors
          
      })
  }
  componentDidUpdate(prevProps) {
    console.log("CD<")
    if (prevProps.user.errors !== this.props.user.errors)
      this.setState({ errors: this.props.user.errors, message: this.props.user.message })
  }

  renderNum = () => {
    const num = []
    for (let i = 1; i < 8; i++) {
      num.push({
        key: i + ".",
        value: i,
        text: "Province" + i
      })
    }
    return num
  }

  selectDistrict = this.district.map((d, index) => {
    return ({
      key: index,
      value: d,
      text: d
    })
  })

  schema = {
    firstname: Joi.string().min(2).max(100).required(),
    lastname: Joi.string().min(2).max(100).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
   
    district: Joi.string().min(3).required(),
    province: Joi.number().min(1).max(7).required(),
    tole: Joi.string().min(3).required(),
    contact: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
  };
  renderBreadCrumb = () => {
    return (
        <Breadcrumb>
            <Breadcrumb.Section as={Link} to="/">Home</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section as={Link} to="/profile">Profile</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Update Profile</Breadcrumb.Section>
        </Breadcrumb>
    )
}


  
  doSubmit = () => {
    console.log("HI all")
    this.props.update(this.state.data);
  }

  handleDistrictChange = (e, { value }) => {
    const errors = { ...this.state.errors };
    delete errors["district"];

    const data = { ...this.state.data };
    data["district"] = value;
    this.setState({ data, errors });
  }
  handleProvinceChange = (e, { value }) => {
    const errors = { ...this.state.errors };
    delete errors["province"];
    const data = { ...this.state.data };
    data["province"] = value;
    this.setState({ data, errors });
  }


  render() {
    const { firstname, lastname, email, province,district,contact, tole } = this.state.data;
    const { errors } = this.state;
    if (this.props.user.message)
    {
        return <Redirect to="/profile" />
    }
    return (
        <React.Fragment>
            
            {this.renderBreadCrumb()}
      
        <h1 className="ui header huge green" style={{ marginTop: "5vh" }} >
          Update Profile
        </h1>
        <Form size="large"  onSubmit={this.handleOnSubmit}>
         
          <Form.Group widths='equal'>
            <Form.Input fluid as={FormField} label='First name' placeholder='First name' onChange={this.handleOnChange} value={firstname} name="firstname" error={"firstname" in errors ? errors.firstname : null} />
            <Form.Input fluid as={FormField} label='Last name' placeholder='Last name' onChange={this.handleOnChange} value={lastname} name="lastname" error={"lastname" in errors ? errors.lastname : null} />
          </Form.Group>
          <Form.Input label='Email' as={FormField} placeholder='xyz@email.com' onChange={this.handleOnChange} value={email} name="email" error={"email" in errors ? errors.email : null} />
          <Form.Input label='Contact' as={FormField} placeholder='9841xxxxxx' onChange={this.handleOnChange} value={contact} name="contact" error={"contact" in errors ? errors.contact : null} />
          <Form.Group widths='equal' >
            <Form.Input
              control={Select}
              options={this.renderNum()}
              label={{ children: "Province", htmlFor: 'form-select-control-province' }}
              placeholder='Select Province'
              onChange={this.handleProvinceChange}
              error={"province" in errors ? errors.province : null}
              search
              value={province}
              searchInput={{ id: 'form-select-control-province' }}
            />
            <Form.Input
              control={Select}
              options={this.selectDistrict}
              value={district}
              label={{ children: "District", htmlFor: 'form-select-control-district' }}
              placeholder='Select district'
              onChange={this.handleDistrictChange}
              error={"district" in errors ? errors.district : null}

              search
              searchInput={{ id: 'form-select-control-district' }}
            />
            <Form.Input fluid as={FormField} label='Tole' placeholder='Your Address' onChange={this.handleOnChange} value={tole} name="tole" error={"tole" in errors ? errors.tole : null} />

          </Form.Group>
          <Button type='submit' primary>Save Changes</Button> <br /> <br />
          <Button as={Link} to="/profile">Cancel</Button>
          


        </Form>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, { update,myInfo })(UpdateProfile);
