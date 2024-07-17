import useFetchData from "@/composables/useFetchData"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useChecklistStore = defineStore('ChecklistStore', () => {
  const checklists = ref([])
  const checklist = ref(null)

  const setSelectedChecklist = computed({
    get: () => checklist.value,
    set: newValue => {
      checklist.value = newValue
    },
  })

  async function fetchChecklists(projectId, params) {
    try {
      const { data } = await useFetchData(`${projectId}/`, {
        params,
      })
  
      checklists.value = data

      
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function fetchChecklistById(projectId, checklistId, params ) {
    try {
      const response = await useFetchData(`checklists/${checklistId}/`, {
        params,
      }, [], false, false)
  
      checklist.value = response.data

      
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }


  async function updateChecklist(projectId, planId, checklistId, payload) {
    try {
      return await useFetchData(`checklists/${checklistId}/`, {
        method: "PATCH",
        data: payload,
      })
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }

  async function storeChecklist(projectId, payload) {
    try {
      const { data } = await useFetchData(`checklists/`, {
        method: "POST",
        data: payload,
      })
  
      return data
    } catch (error) {
      console.error('Error posting data:', error)
    }
    
  }

  async function addCommentsToChecklist(projectId, checklistId, payload) {
    try {
      const response = await useFetchData(`checklists/${checklistId}/comments/`, {
        method: "POST",
        data: payload,
      }, [],  false, false)
  
      // if(response.status_code == 201) fetchChecklistById(projectId, checklistId)

    } catch (error) {
      console.error('Error posting data:', error)
    }
    
  }



  
  

  return {
    checklists,
    checklist,
    fetchChecklists,
    fetchChecklistById,
    storeChecklist,
    updateChecklist,
    addCommentsToChecklist,
    setSelectedChecklist,
  }
})

