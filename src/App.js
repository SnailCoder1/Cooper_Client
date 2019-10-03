import React, { Component } from 'react';
import DisplayCooperResult from './Components/DisplayCooperResult';
import InputFields from "./Components/InputFields";
import LoginForm from './Components/LoginForm';
import { authenticate } from './Modules/Auth';
import { Container, Header,  Divider, Segment, Grid, Message, Button } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      gender: 'female',
      age: '',
      renderLoginForm: false,
      authenticated: false,
      email: '',
      password: '',
      message: ''
    }
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async onLogin(e) {
    e.preventDefault();
    let resp = await authenticate(this.state.email, this.state.password)
    if (resp.authenticated === true) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: resp.message, renderLoginForm: false })
    }
  }

  render() {
		let renderLogin;
		let renderSignUpMessage;
		let renderLogOut;
    let user;

    if (this.state.authenticated === true) {
      user = JSON.parse(sessionStorage.getItem('credentials')).uid;
      renderLogin = (
        <p>Hi {user}</p>
      )
    } else {
      if (this.state.renderLoginForm === true) {
        renderLogin = (
          <>
            <LoginForm 
              loginHandler={this.onLogin.bind(this)}
              inputChangeHandler={this.onChange.bind(this)}
            />
          </>
        )
      } else {
        renderLogin = (
          <>
            <Button id="login" onClick={() => this.setState({ renderLoginForm: true })}>Login</Button>
            <p>{this.state.message}</p>
          </>
        )
      }
    }
    return (
      <>
        <Container>
          <Header as="h2">
						<Header.Content>
							THE COOPER TEST
						</Header.Content>
          </Header>

          <Divider></Divider>

          <Segment>
            <InputFields 
              inputChangeHandler={this.onChange.bind(this)}
            />
          </Segment>

					<Divider></Divider>

          <Segment>
						<Message>
							<DisplayCooperResult
								distance={this.state.distance}
								gender={this.state.gender}
								age={this.state.age}
							/>
						</Message>				
          </Segment>

					<Divider></Divider>

          <Segment>
            <Grid container columns={2}>
              <Grid.Column>
                <Message>
                  {renderLogin}
                </Message>
              </Grid.Column>
								{renderSignUpMessage}
								{renderLogOut}
            </Grid>
          </Segment>

        </Container>
      </>  
    );
  }
}

export default App;