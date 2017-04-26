import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Spinner } from './common';
import * as actions from '../actions/auth';
import {Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
  View,
  ListItem,
  Text,
  CheckBox,
  Footer,
  FooterTab,
  CardItem,
  Card,
  Form,
  Item,
  Label,
  Input
 } from 'native-base';

export class Signup extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    loading: false
  }

  grabPassword(value) {
    this.setState({password: value});
  }

  grabEmail(value) {
    this.setState({email: value});
  }

  onSignup() {
    const {email, password} = this.state;
    this.setState({loading: true})

    this.props.dispatch(actions.signupUser(email, password))
      .then(response => {
        if (this.props.authenticated) {
          return Actions.landingPage();
        } else {
          this.setState({error: true})
        }
        this.setState({loading: false})
      })
      .catch(error => {
        console.log(error);
        this.setState({error: true})
        this.setState({loading: false})
      })
  }

  errorMessage() {
    if (this.state.error) {
      return (
        <Text>
          Email Already Exists
        </Text>
      );
    }
    return <Text></Text>
  }

  renderSpinner() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Log In</Title>
          </Body>
          <Right>
            <Button transparent>
            </Button>
          </Right>
        </Header>
        <Container>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input onChangeText={this.grabEmail.bind(this)} />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={this.grabPassword.bind(this)} />
              </Item>
            </Form>
            <Button onPress={this.onSignup.bind(this)} block info>
              <Text>Sign Up! </Text>
            </Button>
            {this.errorMessage()}
            {this.renderSpinner()}
          </Content>
        </Container>
    </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
})

export default connect(mapStateToProps)(Signup);
