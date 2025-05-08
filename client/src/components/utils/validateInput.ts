import { useState } from "react";

interface FormValues {
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
}

interface Errors {
  [key: string]: string; 
}

interface UseValidateInputsProps {
  errors: Errors;
  formValues: FormValues;
}

const containsSymbols = (password: string) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return symbolRegex.test(password);
}

export function useValidateInputs({errors, formValues }: UseValidateInputsProps) {
  const [formErrors, setFormErrors] = useState<Errors>(errors);
  const isOnRegisterPage = formValues.repeatPassword !== undefined;

  const validateInputs = (): boolean => {
    const newErrors: Errors = {}; 
    let isValid = true;

    if (formValues.name !== undefined && formValues.name.trim() === "") {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (formValues.email !== undefined && !/\S+@\S+\.\S+/.test(formValues?.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (formValues.password !== undefined && formValues?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    // for register only
    if (formValues.password !== undefined && !/[A-Z]/.test(formValues.password) && isOnRegisterPage) {
        newErrors.password = "Password must contain at least one uppercase letter.";
        isValid = false;
    }    

    // for register only
    if (formValues.password !== undefined && !containsSymbols(formValues.password) && isOnRegisterPage) {
        newErrors.password = 'The password must include at least one of the following symbols: [!@#$%^&*(),.?":{}|<>]';
        isValid = false;
    }   
    
    if (formValues.repeatPassword !== undefined && formValues.password !== formValues.repeatPassword) {
      console.log('repeatPassword')
      newErrors.repeatPassword = "Passwords do not match.";
      isValid = false;
    }

    setFormErrors(newErrors);

    return isValid;
  };

  return { validateInputs, formErrors, setFormErrors };
}

export default useValidateInputs;
