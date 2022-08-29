import React from 'react'
import "../stylings/message.css"

function Message({variant, children}) {
  return (
    <div className={variant='error'?'error message': 'message'}>{children}</div>
  )
}

export default Message