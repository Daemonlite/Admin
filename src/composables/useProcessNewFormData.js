function useProcessNewFormData(data){
    const formData = new FormData();
    appendFormData(formData, data);
    return formData;
  }
  

  function appendFormData(formData, data, parentKey = null) {
    for (const key in data) {
      const value = data[key];
      const currentKey = parentKey ? `${parentKey}[${key}]` : key;
  
      if (value instanceof File) {
        formData.append(currentKey, value, value.name);
      } else if (typeof value === 'object') {
        appendFormData(formData, value, currentKey);
      } else {
        formData.append(currentKey, value);
      }
    }
  }

  export default useProcessNewFormData
