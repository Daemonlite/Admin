import axios from "@axios"
import { useToast } from "vue-toast-notification"
import { baseUrl } from "./userStore"

const toast = useToast()

export const replyForm = (email, subject, message) => {
  axios.post(`${baseUrl}/forms/reply-forms/`, {
    email: email,
    subject: subject,
    message: message,
  }).then(res=>{
    toast.success('Reply sent successfully')
    console.log(res.data)
  }).catch(err=>{
    console.log(err.data)
    toast.error(err.response.data.error)
  })

}
