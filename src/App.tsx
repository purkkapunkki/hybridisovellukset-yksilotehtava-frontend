import {Route, BrowserRouter as Router, Routes} from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';
import TagSearch from './views/TagSearch';
import {UserProvider} from './contexts/UserContext';
import UserRoute from './components/UserRoute';
import UsersPage from './views/UsersPage';
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  // TODO: update the URL in the address bar when redirecting to login, currently it stays as "/"
                  <UserRoute anonymousRoute={<Login />}>
                    <Home />
                  </UserRoute>
                }
              />
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <UserRoute>
                    <AdminRoute>
                      <Profile />
                    </AdminRoute>
                  </UserRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <UserRoute>
                    <Upload />
                  </UserRoute>
                }
              />
              <Route path="/single" element={<Single />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/users"
                element={
                  <UserRoute>
                    <AdminRoute>
                      <UsersPage />
                    </AdminRoute>
                  </UserRoute>
                }
              />
              <Route
                path="/tag/:tagname"
                element={
                  <UserRoute>
                    <TagSearch />
                  </UserRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <UserRoute>
                    <Logout />
                  </UserRoute>
                }
              />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
};

export default App;
