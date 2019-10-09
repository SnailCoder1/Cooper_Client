import React, { Component } from 'react';
import DisplayCooperResult from './Components/DisplayCooperResult';
import InputFields from './Components/InputFields';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import { authenticate, authenticateSignUp, authenticateSignOut } from './Modules/Auth.js';
import DisplayPerformanceData from './Components/DisplayPerformanceData';
import { Container, Grid, Divider, Header, Segment, Button, Message, Icon} from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      gender: 'female',
      age: '',
      renderLoginForm: false,
      renderSignUpForm: false,
      authenticated: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      message: '',
      entrySaved: false,
      renderIndex: false,
      updateIndex: ''
    }
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

  async onSignUp(e) {
    e.preventDefault();
    let resp = await authenticateSignUp(this.state.email, this.state.password, this.state.passwordConfirmation)
    if (resp.authenticated === true) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: resp.message, renderSignUpForm: false })
    }
  }

  async onLogout(e) {
    e.preventDefault();
    let resp = await authenticateSignOut()
    if (resp.authenticated === false) {
      this.setState({ authenticated: false });
      window.sessionStorage.clear();
      this.setState({ message: "You have successfuly logged out." });
      this.setState({ renderLoginForm: false });
      this.setState({ renderSignUpForm: false });
      setTimeout(function () { window.location.reload("true"); }, 2000);
    } else {
      this.setState({ message: resp.message })
    }
  }

  entryHandler() {
    this.setState({ entrySaved: true, updateIndex: true });
  }

  indexUpdated() {
    this.setState({ updateIndex: false });
  }

  handleGenderChange(value) {
    this.setState({ gender: value })
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
      entrySaved: false
    })
  }

  reset(e) {
    window.location.reload(true);
  }

  resetForm(e) {
    this.setState({ distane: '', age: '' })
    document.getElementById("calculationForm").reset()
  }

  render() {
    let renderLogin;
    let renderSignUp;
    let renderLogout;
    let user;
    let performanceDataIndex;
    let errorMessage;
    let renderSignUpMessage;

    if (this.state.authenticated === true) {
      user = JSON.parse(sessionStorage.getItem('credentials')).uid;
      renderLogin = (
        <p>Hi {user}</p>
      )
      renderSignUpMessage = (
        {renderSignUp}
      )
      renderLogout = (
        <Button id="logout" onClick={this.onLogout.bind(this)}>Logout</Button>
      )

      if (this.state.renderIndex === true) {
        performanceDataIndex = (
          <>
            <DisplayPerformanceData
              updateIndex={this.state.updateIndex}
              indexUpdated={this.indexUpdated.bind(this)}
            />
            <Button onClick={() => this.setState({ renderIndex: false })}>Hide past entries</Button>
          </>
        )
      } else {
        performanceDataIndex = (
          <Button id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</Button>
        )
      }
    } else {
      if (this.state.renderLoginForm === true && this.state.renderSignUpForm === false) {
        renderLogin = (
          <>
            <LoginForm
              loginHandler={this.onLogin.bind(this)}
              inputChangeHandler={this.onChange.bind(this)}
              resetHandler={this.reset.bind(this)}
            />
          </>
        )
        renderSignUp = (
          <Button id="sign-up"  onClick={() => this.setState({ renderSignUpForm: true, renderLoginForm: false, message: '' })}>Sign Up</Button>
        )
        renderSignUpMessage = (
          <Message>
            {renderSignUp}
          </Message>
        )
      } else if (this.state.renderLoginForm === false && this.state.renderSignUpForm === true) {
        renderLogin = (
          <>
            <Button id="login" onClick={() => this.setState({ renderLoginForm: true, renderSignUpForm: false, message: '' })}>Login</Button>
          </>
        )
        renderSignUp = (
          <SignUpForm
            signUpHandler={this.onSignUp.bind(this)}
            inputChangeHandler={this.onChange.bind(this)}
            resetHandler={this.reset.bind(this)}
          />
        )
        renderSignUpMessage = (
          <Message>
            {renderSignUp}
          </Message>
        )
      } else {
        renderLogin = (
          <>
            <Button id="login" onClick={() => this.setState({ renderLoginForm: true, renderSignUpForm: false, message: '' })}>Login</Button>
          </>
        )
        renderSignUp = (
          <>
            <Button id="sign-up" onClick={() => this.setState({ renderSignUpForm: true, renderLoginForm: false, message: '' })}>Sign Up</Button>
          </>
        )
        renderSignUpMessage = (
          <Message>
            {renderSignUp}
          </Message>
        )
      }
    }
    if (this.state.authenticated === true) {
      errorMessage = ''
    } else if (this.state.authenticated === false && this.state.message !== '') {
      errorMessage = (
        <Message>
          <p><b>{this.state.message}</b></p>
        </Message>
      )
    }
    return (
      <>
        <Container>
        <Divider></Divider>

          <Header as="h1" textAlign='center'>
            <Header.Content>
              THE COOPER TEST
                </Header.Content>
          </Header>

          <Divider></Divider>

          <Segment>
            <Grid container columns={2}>
              <Grid.Column>
                <Message>
                  {renderLogin}
                </Message>
              </Grid.Column>
              <Grid.Column>
                {renderSignUpMessage}
                {renderLogout}
              </Grid.Column>
            </Grid>
            {errorMessage}
          </Segment>

          <Segment>
            <InputFields
              inputChangeHandler={this.onChange.bind(this)}
              handleGenderChange={this.handleGenderChange.bind(this)}
              resetFormState={this.resetForm.bind(this)}
            />
          </Segment>

          <Divider horizontal>Result loading...</Divider>

          <Segment>
            <Message>
              <DisplayCooperResult
                distance={this.state.distance}
                gender={this.state.gender}
                age={this.state.age}
                authenticated={this.state.authenticated}
                entrySaved={this.state.entrySaved}
                entryHandler={this.entryHandler.bind(this)}
              />
            </Message>
          </Segment>

          {performanceDataIndex}

        </Container>
      </>
    );
  }
}

export default App;