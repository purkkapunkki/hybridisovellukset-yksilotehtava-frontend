import {Button} from '@/components/ui/button';
import {useUserContext} from '../hooks/ContextHooks';
import useForm from '@/hooks/formHooks';
import type {UserDetails} from '@/types/LocalTypes';
import {useState} from 'react';
import Input from '@/components/ui/input';
import {useUser} from '@/hooks/apiHooks';
import Footer from '@/components/Footer';
import {useTranslation} from 'react-i18next';

const Profile = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {putUser} = useUser();
  const [formEnabled, setFormEnabled] = useState(false);
  const [editError, setEditError] = useState<string>('');
  const initialValues: UserDetails = {
    email: user?.email ?? '',
    username: user?.username ?? '',
  };

  const doEditUser = async <T extends Record<string, string>>(
    values: T,
  ): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      const editResponse = await putUser(
        values as unknown as UserDetails,
        token,
      );
      if (!editResponse) {
        return;
      }
      setFormEnabled(!formEnabled);
    } catch (error) {
      console.log((error as Error).message);
      setEditError((error as Error).message);
    }
  };
  const {handleSubmit, handleInputChange, inputs} = useForm(
    doEditUser,
    initialValues,
  );

  if (user === null) {
    return;
  }

  return (
    <>
      {user && (
        <article className="bg-card border-border w-full rounded-md border">
          <form className="p-4" onSubmit={handleSubmit}>
            <h3 className="text-center text-2xl">Profile</h3>
            <fieldset
              className="border-input my-2 rounded-md border p-2"
              disabled={!formEnabled}
            >
              <label>
                {t('username')}:
                <Input
                  name="username"
                  defaultValue={inputs.username}
                  onChange={handleInputChange}
                ></Input>
              </label>
              <label>
                {t('email')}:
                <Input
                  name="email"
                  type="email"
                  defaultValue={inputs.email}
                  onChange={handleInputChange}
                ></Input>
              </label>
            </fieldset>
            {editError && (
              <p className="text-destructive text-sm">{editError}</p>
            )}
            {formEnabled ? (
              <>
                <Button
                  variant="outline"
                  className="mt-2 w-full font-semibold"
                  type="button"
                  onClick={() => {
                    setFormEnabled(!formEnabled);
                  }}
                >
                  Cancel
                </Button>
                <Button className="mt-2 w-full font-semibold" type="submit">
                  Save
                </Button>
              </>
            ) : (
              <Button
                className="mt-2 w-full font-semibold"
                type="button"
                onClick={() => {
                  setFormEnabled(!formEnabled);
                }}
              >
                Edit
              </Button>
            )}
          </form>
        </article>
      )}
      <Footer />
    </>
  );
};

export default Profile;
