import React from 'react';
import { Form, Divider, Dropdown, Label } from 'semantic-ui-react'

const InputFields = (props) => {

  const genderChoice = [
    { text: "Female", value: "female" },
    { text: "Male", value: "male" }
  ]
  return (
    <Form>
      <Divider horizontal>Select your gender, fill up distance and age. And run during 12 minutes.</Divider>

      <Form.Field inline>
          <Dropdown
            selection
            id="gender"
            options={genderChoice}
            onChange={(e, { value }) => props.handleGenderChange(value)}
          />
          <Label pointing='left'>Choose your gender</Label>
        </Form.Field>

      <Form.Input>
      <input placeholder="Distance" id="distance" onChange={props.inputChangeHandler}></input>
      </Form.Input>

      <Form.Input
        fluid
        id="age"
        placeholder="Age"
        onChange={props.inputChangeHandler}
      />
    </Form>
  )
}

export default InputFields;