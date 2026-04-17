import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import Logo from '../images/Logo.png';
import LanguageSelector from './LanguageSelector';
import {useTranslation} from 'react-i18next';

const Layout = () => {
  const {t} = useTranslation();
  const {handleAutoLogin, user, loading} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  if (!loading) {
    return <div className="text-2xl">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <header className="text-card-foreground from-darkgreen to-darkermidgreen sticky top-0 z-10 mr-5 ml-5 rounded-md bg-linear-to-br from-65% via-75% to-100% shadow-sm">
        <div className="mx-auto mb-2 flex w-full max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <Link
            className="block rounded px-2 py-2 text-center text-2xl font-bold transition-all duration-500 ease-in-out"
            to="/"
          >
            <img src={Logo} alt="Logo" className="w-50" />
          </Link>

          <nav className="text-white">
            <ul className="m-0 flex items-center justify-end gap-1 p-0">
              {user && (
                <>
                  <SearchBar />

                  <li>
                    <Link
                      className="hover:bg-accent hover:text-accent-foreground block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out"
                      to="/"
                    >
                      {t('frontpage')}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="hover:bg-accent hover:text-accent-foreground block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out"
                      to="/upload"
                    >
                      {t('add post')}
                    </Link>
                  </li>

                  {user.level_name === 'Admin' && (
                    <>
                      <li>
                        <Link
                          className="hover:bg-accent hover:text-accent-foreground block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out"
                          to="/profile"
                        >
                          {t('profile')}
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="hover:bg-accent hover:text-accent-foreground block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out"
                          to="/users"
                        >
                          {t('users')}
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Link
                      className="hover:bg-accent hover:text-accent-foreground block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out"
                      to="/logout"
                    >
                      {t('logout')}
                    </Link>
                  </li>
                </>
              )}
              <LanguageSelector />
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
