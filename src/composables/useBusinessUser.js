import { useCookies } from "vue3-cookies"

const useBusinessUser = ()=>{
  return {
    user: useCookies().cookies.get("userData"),
    isBusinessUser: useCookies().cookies.get("userData").role == 'business'? true:false,
  }
}
 

export default useBusinessUser