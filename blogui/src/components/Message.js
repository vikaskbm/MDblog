import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({message, info, positive, negative, warning}) => (
  <Message compact info positive negative warning>
      {message}
  </Message>
)