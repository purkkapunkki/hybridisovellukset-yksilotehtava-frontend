import React, {useState} from 'react';

type Callback<T> = (
  values: T,
  setValues: React.Dispatch<React.SetStateAction<T>>,
) => Promise<void>;

const useForm = <T extends Record<string, string>>(
  callback: Callback<T>,
  initState: T,
) => {
  const [inputs, setInputs] = useState(initState);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    if (event) {
      event.preventDefault();
    }
    await callback(inputs, setInputs);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.persist();
    // console.log(event.target.name, event.target.value);
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
  };
};

export default useForm;
