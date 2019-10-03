import React, { Component } from 'react';
import DisplayCooperResult from './Components/DisplayCooperResult';
import InputFields from "./Components/InputFields";
import LoginForm from './Components/LoginForm';
import SignUpForm from ".Components/SignUpForm";
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
      renderSignUpMessage: false,
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

  async onSignUp(e) {
    e.preventDefault();
    let resp = await authenticateSignUp(this.state.email, this.state.password, this.state.passwordConfirmation)
    if (resp.authenticated === true) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: resp.message, renderSignUpForm: false})
    }
  }

  async onLogout(e) {
    e.preventDefault();
    let resp = await authenticateSignOut()
    if(resp.authenticated === true) {
      this.setState({ authenticated: false });;
      window.sessionStorage.clear();
      this.setState({ message: "Logged out successfuly." })
      this.setState({ renderLoginForm: false })
      this.setState({ renderSignUpForm: false});
      setTimeout(function () { window.location.reload("true"); });
    } else {
      this.setState({ message: resp.message })
    }
  }

  entryHandler() {
    this.setState({ entrySaved: true, updateIndex: true });
  }

  updateIndex() {
    this.setState({ updateIndex: false });
  }

  handleGenderChange(value) {
    this.setState({ gender: value})
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
      entrySaved: false
    })
  }

  reset(e) {
    window.location.reload(true)
  }

  resetForm(e) {
    this.setState({ distance: "", age: "" })
    document.getElementById("calculationForm").reset()
  }

  render() {
		let renderLogin;
		let renderSignUp;
		let renderLogOut;
    let user;
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
      renderLogOut = (
        <Button id="logout" onClick={this.onLogout.bind(this)}>Logout</Button>
      )

      // if (this.state.renderIndex === true) {
        
      // }
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
          <Button id="sign-up" onClick={() => this.setState({ renderSignUpForm: true, renderLoginForm: false, message: '' })}>Sign Up</Button>
        )
        renderSignUpMessage = (
          <Message>
            { renderSignUp }
          </Message>
        )
      } else if (this.state.renderLoginForm === false && this.state.renderSignUp === true) {
        renderLogin = (
          <>
            <Button id="login" onClick={() => this.setState({ renderLoginForm: true, renderSignUpForm: false, message: '' })}>Login</Button>
            {/* <p>{this.state.message}</p> */}
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
          <Header as="h2">
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
              inputChangeHandler={this.onChange.bind(this)}
              handleGenderChange={this.handleGenderChange.bind(this)}
              resetFormState={this.resetForm.bind(this)}
            />
          </Segment>

					<Divider></Divider>

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
          
        </Container>
      </>  
    );
  }
}

export default App;