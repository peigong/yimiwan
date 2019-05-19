import { Notification } from 'element-ui'

export const catchHandler = (err) => {
  Notification({
    type: 'error',
    message: err.message,
    duration: 0
  })
}

export const success = (message) => {
  Notification({
    type: 'success',
    message: message
  })
}
