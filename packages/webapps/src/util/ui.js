import { Toast } from 'we-vue'

export const catchHandler = function(err){
  Toast.fail(err.message)
}
