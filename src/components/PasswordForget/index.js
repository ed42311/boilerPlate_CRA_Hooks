import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from "styled-components";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
)

const INITIAL_STATE = {
  email: '',
  error: null,
  submitted: false,
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE, submitted: true});
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <ForgetStyle
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <ButtonS disabled={isInvalid} type="submit">
          Reset My Password
        </ButtonS>
        <br />
        {this.state.submitted &&
        <h2>Check your email to reset your password, then <Link to={ROUTES.SIGN_IN}>Sign In</Link></h2>}

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <ForgetLinkS>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </ForgetLinkS>
);

const ForgetLinkS = styled.p`
  position: relative;
`
const ButtonS = styled.button`
  padding: 10px;
  z-index: 20;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
  border-style: double;
  border-color: darkgoldenrod;
  text-align: left;
  margin-bottom: 2rem;
  margin-top: 1.8rem;
  position: relative;
  background: rgba(255,255,255,0.3);
  border-radius: 6px;
  &::placeholder{
    color: gray;
    font-weight: 900;
    font-size: x-large;
  }
  &:hover{
    transition: 1s ease-in-out;
    background-color: turquoise;;
  }
`

const ForgetStyle = styled.input`
  padding: 10px;
  z-index: 20;
  width: 350px;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
  border: white;
  text-align: left;
  margin-right: 5px;
  margin-bottom: 2rem;
  margin-top: 1.8rem;
  position: relative;
  background: rgba(255,255,255,0.3);
  border-radius: 6px;
  &::placeholder{
    color: gray;
    font-weight: 900;
    font-size: x-large;
  }
  &:focus{
    outline:none;
  }
`
export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
