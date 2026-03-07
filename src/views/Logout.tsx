// import {Navigate} from 'react-router';
import Footer from '@/components/Footer';
import {useUserContext} from '../hooks/ContextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  handleLogout();

  return (
    <>
      <p>Logout</p>
      {/*
      // declarative
      <Navigate to={'/'} />
      */}
      <Footer />
    </>
  );
};

export default Logout;
