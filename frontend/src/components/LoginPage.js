import React from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginPage extends React.Component {
  onSubmit(formValues) {
    console.log(formValues);
  }

  renderField = ({ input, label, type }) => {
    return (
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          autoComplete="off"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        Login Page
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="username"
            type="text"
            label="Enter Username"
            component={this.renderField}
          />
          <Field
            name="password"
            type="password"
            label="Enter Password"
            component={this.renderField}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = 'You must enter a username';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginPage);
