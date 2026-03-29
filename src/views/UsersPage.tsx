import RegisterForm from '@/components/RegisterForm';
import Footer from '../components/Footer';
import UserList from '@/components/UserList';
import {useUser} from '@/hooks/apiHooks';
import type {UserWithNoPassword} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState<UserWithNoPassword[]>([]);
  const {getUsers} = useUser();

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((e) => console.log(e.message));
  }, [getUsers]);

  const refreshUsers = async () => {
    const updated = await getUsers();
    setUsers(updated);
  };

  return (
    <>
      <RegisterForm onSuccess={refreshUsers} />
      <UserList users={users} />
      <Footer />
    </>
  );
};

export default UsersPage;
