import { Component } from "react";

import Joi from "joi";


class Form extends Component {
  state = {
    data: {},
    errors: {},
    
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return null;
   
    this.doSubmit();
  };

  handleOnChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  
  

  validate = () => {
    
    const options = { abortEarly: false };
    const schema = Joi.object(this.schema);
    const { error } = schema.validate(this.state.data, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSelectChange = (e, { name, value }) => {
    const errors = { ...this.state.errors };
    if (errors[name]) delete errors[name];
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  }
 

}

export default Form;