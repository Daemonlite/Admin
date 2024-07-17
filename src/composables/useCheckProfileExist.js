import default_avatar from "@images/avatars/avatar-1.png";
import { useCookies } from "vue3-cookies";




const { cookies } = useCookies();

let token = cookies.get('access_token')


async function useCheckProfileExist(avatar_url) {
    // console.log(avatar_url);
    let response = await fetch(avatar_url, {
        method: "HEAD", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": "JWT "+token,
          "Accept": 'application/json'
        },
      });
    
    // console.log(response);
    let dataStream = await response
    //   console.log(dataStream)
  
    if (dataStream.status !== 200) {
      return default_avatar;
      // return default_avatar;
    } else {
        // console.log(avatar_url)
      return avatar_url;
      // return avatar_url;
    }
  }

  export default useCheckProfileExist

 