import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({message, danger, info, positive, negative, warning}) => (
  <Message info positive danger negative warning>
      {message}
  </Message>
)