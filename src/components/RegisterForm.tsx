import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import type {RegisterCredentials} from '../types/LocalTypes';
import {Button} from './ui/button';
import {useTranslation} from 'react-i18next';

type Props = {onSuccess?: () => void};
const RegisterForm = ({onSuccess}: Props) => {
  const {t} = useTranslation();
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
  const [registerError, setRegisterError] = useState<string>('');

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async (
    values: RegisterCredentials,
    setValues: React.Dispatch<React.SetStateAction<RegisterCredentials>>,
  ) => {
    try {
      const userResponse = await getUsernameAvailable(values.username);
      setUsernameAvailable(userResponse.available);
      const emailResponse = await getEmailAvailable(values.email);
      setEmailAvailable(emailResponse.available);
      if (userResponse.available && emailResponse.available) {
        await postRegister(values);
        setValues({
          username: '',
          password: '',
          email: '',
        });
        setRegisterError('');
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.log((error as Error).message);
      setRegisterError((error as Error).message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} =
    useForm<RegisterCredentials>(doRegister, initValues);

  // option: check username & email availibilities based on state updates using useEffects
  useEffect(() => {
    const checkUsername = async () => {
      if (inputs.username.length > 2) {
        try {
          const userResponse = await getUsernameAvailable(inputs.username);
          setUsernameAvailable(userResponse.available);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    checkUsername();
  }, [inputs.username, getUsernameAvailable]);

  useEffect(() => {
    const checkEmail = async () => {
      if (inputs.email.length > 4) {
        try {
          const response = await getEmailAvailable(inputs.email);
          setEmailAvailable(response.available);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    checkEmail();
  }, [inputs.email, getEmailAvailable]);

  return (
    <>
      <h2 className="mt-4 text-center text-2xl font-semibold">
        {t('rekisteröi käyttäjä')}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground mx-auto mt-4 flex w-full max-w-md flex-col gap-4 rounded-md p-6 shadow"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginusername">
            {t('käyttäjänimi')}
          </label>
          <input
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            value={inputs.username}
          />
          {!usernameAvailable && (
            <p className="text-destructive text-sm">
              {t('käyttäjänimi ei saatavilla')}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="email">
            {t('sähköposti')}
          </label>
          <input
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="email"
            type="text"
            id="email"
            onChange={handleInputChange}
            autoComplete="email"
            value={inputs.email}
          />
          {!emailAvailable && (
            <p className="text-destructive text-sm">
              {t('sähköposti ei saatavilla')}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="password">
            {t('salasana')}
          </label>
          <input
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          {registerError && (
            <p className="text-destructive text-sm">{registerError}</p>
          )}
        </div>
        <Button
          className="mt-2 w-full font-semibold"
          type="submit"
          // TODO: disable when form is not valid
        >
          {t('rekisteröi käyttäjä')}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
