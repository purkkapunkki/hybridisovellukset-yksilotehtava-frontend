import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {handleAutoLogin, user, loading} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  if (!loading) {
    return <div className="text-2xl">Loading...</div>;
  }

  return (
    <div>
      <header className="flex items-center justify-between bg-stone-600">
        <Link
          className="block p-4 text-center text-2xl font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
          to="/"
        >
          NSFW App
        </Link>
        <nav>
          <ul className="m-0 flex items-center justify-end p-0">
            <li>
              <Link
                className="block p-4 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block p-4 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
