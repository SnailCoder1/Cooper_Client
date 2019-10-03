import React from 'react';
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  return (

    <Form type="medium" id="login-form">
      <Form.Input
        fluid
        id="email"
        placeholder="Email"
        onChange={props.inputChangeHandler}
      />

      <Form.Input
        fluid
        type="password"
        id="password"
        placeholder="Password"
        onChange={props.inputChangeHandler}
      />

      <Button compact color="teal" onClick={(e) => props.loginHandler(e)} id="submit">Submit</Button>
      <Button compact color="teal" onClick={(e) => props.resetHandler(e)}>Reset</Button>

    </Form>
  )
}

export default LoginForm