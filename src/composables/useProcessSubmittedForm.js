
function createFormData(data){
    const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  
  return formData;
  }

function parseStringOrInt(value) {
  
  if (/^\d+$/.test(value)) {
    // If the string contains only numeric characters, parse it as an integer
    
    return parseInt(value);
  } else {
    // If the string contains non-numeric characters, treat it as a string
    return value;
  }
}
  

function mergedObject(dataArray) {    
    const transformedObject = {};
    for (const item of dataArray) {
      const key = Object.keys(item)[0];
      const value = item[key];
    
      if (Array.isArray(value)) {
        transformedObject[key] = value[0].split(', ').map(item => {
          const parsedInt = parseInt(item, 10);
          return isNaN(parsedInt) ? item : parsedInt;
        });
      } else {
        
        if (typeof value != 'object' && value.startsWith('+')) {
          
          transformedObject[key] = value;
        }else{          
          const parsedInt = parseStringOrInt(value);
          
          transformedObject[key] = isNaN(parsedInt) ? value : parsedInt;
        }
      }
    }
    return transformedObject;
  }
  

function useProcessSubmittedForm(e, formData=false){
 
  const formValue = [];

  for (let index = 0; index < e.target.length; index++) {
    const element = e.target[index];
    
    if (element.name) {
      if (element.type === 'file') {
        const name = element.name;
        const files = Array.from(element.files);

        if (files.length === 1) {
          formValue.push({ [name]: files[0] });
        }
      } else {
        let name = element.name;
        let value = element.value;                                

        if(element.value != "") {
          if (name.split('-')[name.split('-').length - 1] == 'array') {
            let ary = [value];
            let newName = name.split('-').slice(0, name.split('-').length - 1)
            formValue.push({ [newName]: ary });
          } else {     
                    
            formValue.push({ [name]: value });
          }
        }
  
      }
    }
  }

    if(formData){
        return createFormData(mergedObject(formValue))
    }


    return mergedObject(formValue);
  };

  export default useProcessSubmittedForm
