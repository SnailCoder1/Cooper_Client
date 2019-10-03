import React from "react"
import { Form, Button } from "semantic-ui-react"

const SignUpForm = (props) => {
  return (
    <Form id="sign-up-form">
      <Form.Imput
			fluid
      id="email"
      placeholder="Email"
      onchange={props.inputChangeHandler}
      />

    <Form.Imput
			fluid
      type="password"
      id="password"
      placeholder="Password"
      onchange={props.inputChangeHandler}
      />

    <Form.Imput
			fluid
      type="password"
      id="passwordConfirmation"
      placeholder="passwordConfirmation"
      onchange={props.inputChangeHandler}
      />

      <Button compact color="teal" onClick={(e) => props.signUpHandler(e)} id="submit">Submit</Button>
      <Button compact color="teal" onClick={(e) => props.resetHandler(e)}>Reset</Button>
    
    </Form>
  )
}
export default SignUpForm