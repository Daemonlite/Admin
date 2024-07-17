
import { defineStore } from 'pinia'

export const useProjectState = defineStore('projState', () => {
  const projectDetails = ref([])
  const assurancePlan = ref([])
  const projectType = ref([])
  const projectUsers = ref([])
  const projectEntity = ref([])
  const workprogram = ref([])
  const detail_workprogram = ref([])

  function changeAssurancePlan(state){
    assurancePlan.value = state    
}

  function getAssurancePlan(state){
    // console.log(state)
    return assurancePlan.value 
}
 
  
  function changeProjectDetails(state){
        // console.log(state)
        projectDetails.value = state    
  }
  
  function getProjectDetails(state){
        // console.log(state)
        return projectDetails.value 
  }

  function changeProjectType(state){
        // console.log(state)
        projectType.value = state    
  }
  
  function getProjectType(state){
        // console.log(state)
        return projectType.value 
  }

  function changeProjectUsers(state){
        // console.log(state)
        projectUsers.value = state    
  }
  
  function getProjectUsers(state){
        // console.log(state)
        return projectUsers.value 
  }

  function changeProjectEntity(state){
        // console.log(state)
        projectEntity.value = state    
  }
  
  function getProjectEntity(state){
        // console.log(state)
        return projectEntity.value 
  }

  function changeWorkProgram(state){
        // console.log(state)
        workprogram.value = state    
  }
  
  function getWorkProgram(state){
        // console.log(state)
        return workprogram.value 
  }

  function changeDetailWorkProgram(state){
        // console.log(state)
        detail_workprogram.value = state    
  }
  
  function getDetailWorkProgram(state){
        // console.log(state)
        return detail_workprogram.value 
  }
      
  return {
    changeAssurancePlan,
    getAssurancePlan,
    changeProjectDetails,
    getProjectDetails,
    changeProjectType,
    getProjectType,
    changeProjectUsers,
    getProjectUsers,
    changeProjectEntity,
    getProjectEntity,
    getWorkProgram,
    changeWorkProgram,
    getDetailWorkProgram,
    changeDetailWorkProgram
  }
})

export default useProjectState
