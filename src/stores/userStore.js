import { useJwt } from '@vueuse/integrations/useJwt'
import { ref } from "vue"

const token = JSON.parse(localStorage.getItem('userData') || 'null')
const encodedJwt = ref(token)
const { header, payload } = useJwt(encodedJwt)



export let userData = payload.value

export const baseUrl = import.meta.BACKEND_BASE_URL

export const formatDate = timestamp => {
  const date = new Date(timestamp)
    
  return date.toLocaleDateString()
}

console.log(userData)

export const formatDateTime = dateString => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
  

export function formatNumber(num) {
  if (isNaN(num)) { 
    return 0
  }
  if (num < 1000) {
    return num
  } else if (num < 1000000) {
    return (num / 1000).toFixed(2) + 'K'
  } else {
    return (num / 1000000).toFixed(2) + 'M'
  }
}

export const contactEndpoints = {
  auditvisionai: '/ams_forms/contact',
  isevolutionsconsult: '/forms/contact',
}

export const QuoteEndpoints = {
  auditvisionai: '/ams_forms/quotes',
  isevolutionsconsult: '/forms/quote-form',
}



