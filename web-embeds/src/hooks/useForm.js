import { useState } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({});

  function setFieldValue(field, value) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  }

  function handleSubmit(event) {
    if (typeof callback === 'function') {
      callback();
    }
  }

  function reset() {
    setValues({});
  }

  return {
    setFieldValue,
    handleSubmit,
    values,
    reset,
    setValues,
  };
};

export default useForm;
