import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import styled from "styled-components";

import ColorBlob from "../ColorBlob";
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';


const SignInPage = () => (
  <SignInPageS>
    <h1 id="test-signin-h1">Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </SignInPageS>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.NEW_DREAM);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return(
      <PageStyle>
         <BlobInputContainerSS>
          <ColorBlob/>
        </BlobInputContainerSS>
        <form onSubmit={this.onSubmit}>
          <SignInputS
            id="test-input-email"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <SignInputS
            id="test-input-password"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <ButtonS
            id="test-button-signin-submit"
            disabled={isInvalid}
            type="submit">
            Sign In
          </ButtonS>
          {error && <p>{error.message}</p>}
        </form>
      </PageStyle>
    );
  }
}

const SignInLink = () => (
  <p>
    Already have an account? <Link id="test-link-signin" to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);
const BlobInputContainerSS = styled.div`
  z-index: -1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: -150%;
  height: 50%;
  transform: scale(10);
`
const PageStyle = styled.div`
  margin-left: 20px;
  font-family: serif;
  font-size: x-large;
  font-weight: 900;
`
const SignInPageS = styled.div`
  padding: 50px;
  border-radius: 10px;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
  background: rgba(255, 255, 255,.3);
`
const SignInputS = styled.input`
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

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);



export default SignInPage;

export { SignInForm, SignInLink };
