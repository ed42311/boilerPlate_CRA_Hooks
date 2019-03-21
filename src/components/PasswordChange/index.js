import React, { Component }from 'react';

import { withFirebase } from '../Firebase';
import styled from "styled-components";

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render(){
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <PasswordS
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <PasswordS
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <ButtonS disabled={isInvalid} type="submit">
          Reset My Password
        </ButtonS>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const ButtonS = styled.button`
  border-style: double;
  border-color: darkgoldenrod;
  padding: 10px;
  z-index: 20;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
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
const PasswordS = styled.input`
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
export default withFirebase(PasswordChangeForm);
