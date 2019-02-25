const validate = values => {
    const errors = {
        name: null,
        age:null,
    };
    // console.log('values.name.trim()', values.name.trim());
    // Validate for name
    if (!values.name || values.name.trim() == '') {
      errors.name = 'userNameIsRequired';
    } else if (values.name.length > 10) {
        errors.name = 'mustBe10CharactersOrLess'
    }

    // Validate age
    if (!values.age) {
        errors.age = 'ageIsRequired'
    }
    else if (isNaN(Number(values.age)) || !Number.isInteger(Number(values.age))) {
        errors.age = 'mustBeANumber'
    } 
    else if (Number(values.age) <= 0) {
        errors.age = 'mustBeLargeThan0'
    }
    else if (values.age.length > 3) {
        errors.age = 'mustBe3CharactersOrLess'
    }
    return errors;
  };
  
export default validate;