
import { defineStore } from 'pinia'

export const useERMState = defineStore('useERMState', () => {
  const mystate = ref([])
  const riskState = ref([])
  
  function changeMyState(state){
        // console.log(state)
        mystate.value = state    
      }

  function getState(){
    // console.log(mystate.value)
    return mystate.value
  }
  
  function changeRiskState(state){
        // console.log(state)
        riskState.value = state    
      }

  function getRiskState(){
    // console.log(mystate.value)
    return riskState.value
  }

  return { mystate, changeMyState, getState, changeRiskState, getRiskState}
})

export default useERMState
