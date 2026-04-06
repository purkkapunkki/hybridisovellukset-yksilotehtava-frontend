import type {UserWithNoPassword} from 'hybrid-types/DBTypes';
import {useTranslation} from 'react-i18next';

const UserList = ({users}: {users: UserWithNoPassword[]}) => {
  const {t} = useTranslation();

  return (
    <>
      <h2 className="mt-4 text-center text-2xl font-semibold">
        {t('käyttäjät')}
      </h2>

      <section className="bg-card text-card-foreground mx-auto mt-4 flex w-full max-w-md flex-col gap-4 rounded-md p-6 shadow">
        <table className="table-auto">
          <thead>
            <tr>
              <th>{t('käyttäjänimi')}</th>
              <th>{t('sähköposti')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default UserList;
