import { defineStore } from 'pinia'

const useAlerts = defineStore('Alerts', ()=>{
  const mystate = ref(false)
  const errMsgs = ref(null)
  const successMsg = ref(null)
  


  function getMyState(){
    return mystate.value
  }


  function changeSuccessState(state){
    successMsg.value = state    
    return successMsg.value
  }

  function changeErrorState(state){
    errMsgs.value = state          
    return errMsgs.value  
  }


  function getErrors(){

      return errMsgs.value
    
  }

  function getSuccess(){

      return successMsg.value
    
  }
  
  return { mystate, getMyState, getErrors, getSuccess, changeSuccessState, changeErrorState  }
})
  
  
  
export default useAlerts
  