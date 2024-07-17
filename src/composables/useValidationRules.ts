


function validationRules(ruleName: string, required: Boolean = true, min: number = 2, max: number = 70) {
    if (ruleName == "stringRules") {
    
      return [
        required ? (v) => !!v || "Field is required" : true,
        required
          ? (v) =>
              (v && v.length <= max && v.length > min && /^[a-zA-Z0-9 .,-]+$/.test(v)) ||
              `Field must be more than ${min} characters but less than  ${max} clean characters`
          : true,
          !required ? (v) => (!!v == false)? true : (v.length <= max && v.length > min && /^[a-zA-Z0-9 .,-]+$/.test(v))? true :  `Field must be more than ${min} characters but less than  ${max} clean characters` : true,
      ];
    }

    if (ruleName == "passwordRules") {
    
      return [
        required ? (v) => !!v || "Field is required" : true,
        required
          ? (v) =>
              (v && v.length <= max && v.length > min) ||
              `Password must be more than ${min} characters but less than ${max} characters`
          : true,
          !required ? (v) => (!!v == false)? true : (v.length <= max && v.length > min )? true : `Password must be more than ${min} characters but less than ${max} characters` : true,
      ];
    }

    if(ruleName == "phoneRules"){
      return [
        required ? (v) => !!v || "Field is required" : true,
        required
        ? (v) =>
            (v && v.length >= 8 && v.length < 20) ||
            "Field must be between 8 and 15 characters"
        : true,
        required ? (v) => (v && /^\+\d+$/.test(v)) || "Phone is not valid, eg: +233245998877" : true,
        !required ? (v) => (!!v == false)? true : ( /^\+\d+$/.test(v))? true :  "Phone is not valid, eg: +233245998877" : true,
      ]

    }

    if(ruleName == "numberRules"){
      return [
        required ? (v) => !!v || "Field is required" : true,
        required ? (v) => (v && v.length <= max && v.length > min) || `Number must be more than ${min} characters but less than ${max} characters` : true,
        required ? (v) => (v && /^\d+$/.test(v)) || "Number is not valid" : true,
        !required ? (v) => (!!v == false)? true : ( /^\d+$/.test(v))? true : "Number is not valid" : true,
      ]
    }

    if(ruleName == "selectRules"){
      
      return [
        
        required ? (v) => !!v || "Field is required" : true,
        ]
    }

    if(ruleName == "checkboxRules"){
      return [
        required ? (v) => !!v || "Field is required" : true,
      ]
    }

    if (ruleName == "textRules"){
      const pattern = /^[a-zA-Z0-9 !@#$%^&*()\[\]{}\-_=+,.?/:;"'\\]+$/
      return [
        required ? (v) => !!v || "Field is required" : true,
        required ? (v) => (v && pattern.test(v)) || "Text cannot include unsafe characters" : true,
        !required ? (v) => (!!v == false)? true : ( pattern.test(v))? true : "Text cannot include unsafe characters 2" : true,
      
      ]
    }
  
    if (ruleName === "emailRules") {
      return [
        required ? (v) => !!v || "Email is required" : true,
        required ? (v) => (v && /.+@.+\..+/.test(v)) || "Email is not valid" : true,
        !required ? (v) => (!!v == false)? true : ( /.+@.+\..+/.test(v))? true : "Email is not valid" : true,
      ];
    }
  
    if (ruleName === "imageRules") {
      return [
        required ? (v) => !!v || "Image is required" : true,
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            "Picture size should be less than 2 MB!"
          );
        },
      ];
    }
  }

  export default validationRules
