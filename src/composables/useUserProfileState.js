
import { defineStore } from 'pinia'

export const useUserProfileState = defineStore('userState', () => {
  const mystate = ref([])
  
  function changeMyState(state){
        // console.log(state)
        mystate.value = state    
      }

  function getState(){
    // console.log(mystate.value)
    return mystate.value
  }

  return { mystate, changeMyState, getState}
})

export default useUserProfileState
