
const useLoading = createGlobalState(()=>{
  const mystate = ref(false)
  
  function changeMyState(state){
    mystate.value = state    
  }
  
  return { mystate, changeMyState }
})
  
  
  
export default useLoading
  