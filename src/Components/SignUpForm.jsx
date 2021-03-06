import React from "react"
import { Form, Button } from "semantic-ui-react"

const SignUpForm = (props) => {

  return (
    <Form  type="medium" id="sign-up-form">
      <Form.Input
			fluid
      id="email"
      placeholder="Email"
      onchange={props.inputChangeHandler}
      />

      <Form.Input
        fluid
        type="password"
        id="password"
        placeholder="Password"
        onchange={props.inputChangeHandler}
      />

      <Form.Input
        fluid
        type="password"
        id="passwordConfirmation"
        placeholder="password Confirmation"
        onchange={props.inputChangeHandler}
      />

      <Button onClick={(e) => props.signUpHandler(e)} id="submit">Submit</Button>
      <Button onClick={(e) => props.resetHandler(e)}>Reset</Button>
    
    </Form>
  )
}

export default SignUpForm