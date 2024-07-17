import axios from "@axios"
import useAlerts from "./useAlerts"
import useLoading from "./useLoading"

function getSpecificKeysAndValuesFromArray(array, keysArray) {
  if (!Array.isArray(array)) {
    array = [array]
  }
  
  if (keysArray.length > 0) {
    return array.map(obj => {
      const filteredObj = {}

      keysArray.forEach(key => {
        const nestedKeys = key.split('.')
        let value = obj
        let isValidKey = true

        for (const nestedKey of nestedKeys) {
          if (value.hasOwnProperty(nestedKey)) {
            value = value[nestedKey]
          } else {
            isValidKey = false
            break
          }
        }

        if (isValidKey) {
          filteredObj[key] = value
        }
      })

      return filteredObj
    })
  }

  return array
}

async function useFetchData(url, options={}, params=[], loading=true, showToast=true){

  const results = ref(null)
  const status_code = ref(null)
  const errors = ref(null)
  const responseHeaders = ref(null)
  const { signal, abort } = new AbortController()

  const load = useLoading()
  const alerts = useAlerts()
  if(loading){
    load.changeMyState(true) 
  }
 
  // const baseUrl = "http://localhost:8000/api/v1/"
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }

  if(options.headers) {
    options.headers = { ...headers, ...options.headers }
  }else{
    options.headers = headers
  }

  const axiosConfig = { ...{
    baseURL: baseUrl,
    url: `${baseUrl}${url}`,
  }, signal, ...options }


  try {
    
    let res = await axios(axiosConfig)
    
    results.value = res.data
    status_code.value = res.status
    responseHeaders.value = res.headers
  } catch (error) {
    errors.value = error
  }
  
  
  if(results.value != null ){
    results.value = getSpecificKeysAndValuesFromArray(results.value, params)    
    if(options.method != undefined && showToast){
      alerts.changeSuccessState(options.method)
    }
  }

  if(loading){
    load.changeMyState(false)
  }

 
  if(results.value == null){    
    let errorMessages = errors.value.response.data
    if(showToast){

      if(errors.value.response.status == 500){      
        alerts.changeErrorState('Request failed with status code 500')
      }else{
        alerts.changeErrorState(errorMessages)
      }
    }
  }
  
  return { data: results.value, status_code: status_code.value, error: errors.value, responseHeaders: responseHeaders.value, abort }
}


export default useFetchData
