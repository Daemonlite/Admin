const useCreateFormData = (postData)=>{
  const formData = new FormData();
  Object.entries(postData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      if (value == undefined || value == null) {
        // formData.append(key, null);
      } else {
        formData.append(key, value);
      }
    }
  });
 
  return formData;
}


export default useCreateFormData
