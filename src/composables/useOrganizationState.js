
import { defineStore } from 'pinia'

const useOrganizationState = defineStore('orgState', () => {
  const myOrgState = ref([])
  const myHierarchyState = ref([])
  const myHierarchyTreeState = ref([])
  const myEntityState = ref([])
  
  function changeMyOrgState(state){
        // console.log(state)
        myOrgState.value = state    
      }
      
  function changeMyHierarchyState(state){
        // console.log(state)
        myHierarchyState.value = state    
      }
      
  function changeMyHierarchyTreeState(state){
        // console.log(state)
        myHierarchyTreeState.value = state    
      }
      
  function changeMyEntityState(state){
        // console.log(state)
        myEntityState.value = state    
      }

  function getOrgState(){
    // console.log(mystate.value)
    return myOrgState.value
  }

  function getHierarchyState(){
    // console.log(mystate.value)
    return myHierarchyState.value
  }

  function getHierarchyTreeState(){
    // console.log(mystate.value)
    return myHierarchyTreeState.value
  }

  function getEntityState(){
    // console.log(mystate.value)
    return myEntityState.value
  }

  return { myOrgState, myHierarchyState, myEntityState, changeMyOrgState, changeMyHierarchyState, changeMyHierarchyTreeState, changeMyEntityState , getOrgState, getHierarchyTreeState, getHierarchyState, getEntityState}
})

export default useOrganizationState
