import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styled from 'styled-components';

import ColorBlob from '../ColorBlob'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';

const SignUpPage = () => (
  <StyledDiv>
    <h1 id="test-title-signup">Sign Up</h1>
    <SignUpForm />
  </StyledDiv>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.props.history.push(ROUTES.NEW_DREAM);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <BlobInputContainerSS id='happy'>
          <ColorBlob
          leftAlign={-3}
          topAlign={2}
          />
        </BlobInputContainerSS>
        <SignUpFormS
          id="test-input-username"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <SignUpFormS
        id="test-input-email"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br/>
        <SignUpFormS
          id="test-input-passwordone"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <SignUpFormS
          id="test-input-passwordtwo"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <ButtonS id="test-button-signup-submit" disabled={isInvalid} type="submit">
          Sign Up
        </ButtonS>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link id="test-link-signup" to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

const BlobInputContainerSS = styled.div`
  z-index: -1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(10);
`

const StyledDiv = styled.div`
  color: gray;
  font-family: serif;
  font-weight: 900;
  padding: 50px;
  padding-top: 10px;
  border-radius: 10px;
  font-size: x-large;
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
const SignUpFormS = styled.input`
  padding: 5px;
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

export default SignUpPage;

export { SignUpForm, SignUpLink };
