import { Toast } from 'we-vue'

export const catchHandler = function(err){
  Toast.fail(err.message)
}

export const success = Toast.success

export const fail = (message) => {
  const duration = 1000
  Toast.text({duration, message})
}
