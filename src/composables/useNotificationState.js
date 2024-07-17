
import { defineStore } from 'pinia'

const baseUrl = import.meta.env.VITE_API_SERVER_URL_WS

export const useNotificationState = defineStore('notificationState', () => {
  const mystate = ref('')
  const connection = ref(null)
  const wsUrl = ref('')
  
  function connectState(url){

    try{
      wsUrl.value = url
      connection.value = new WebSocket(baseUrl+url)

      console.log(connection.value)

      console.log(connection.value)

      connection.value.onopen = function(event){
        console.log('Websocket connection successful!')
      }
  
      
      connection.value.onclose = function(event){
        console.log('Websocket closed successful!')
        
        connectState(wsUrl.value)
      }
  
      connection.value.onmessage = function(event){
        mystate.value = event.data
        
      }
    }catch(e){
      console.error(e)
    }
  }

  function resetState(){
    mystate.value = ''   
  }

  function getState(){
   
    if(mystate.value !== ''){
      return JSON.parse(mystate.value)
    }
    
    return ''
  }

  function sendMessage(chat) {
    // const message = {
    //   type: 'websocket.chat',
    //   text: chat,
    // };
    
    if (connection.value.readyState === WebSocket.OPEN) {
      // Check if the connection is open
      connection.value.send(JSON.stringify(chat))
    } else {
      console.error('WebSocket connection is not open.')
    }
  }

  return { mystate, resetState, getState, connectState, sendMessage }
})

export default useNotificationState
