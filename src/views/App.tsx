import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PageURL from 'apps/PageURL';
import { adminRoutes, superAdminRoutes, userRoute } from 'apps/router';
import store from 'store';

import AuthContainer from './container/AuthContainer';
import GuardContainer from './container/GuardContainer';
import LayoutContainer from './container/LayoutContainer';
import ThemeContainer from './container/ThemeContainer';
import { ExamPage } from './pages/exam';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Error from './pages/error';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<></>}>
        <ThemeContainer>
          <BrowserRouter basename={PageURL.BASE}>
            <Routes>
              <Route element={<AuthContainer />}>
                {superAdminRoutes.map((route, index) => (
                  <Route
                    key={`super-admin-${index}`}
                    path={route.path}
                    element={
                      <GuardContainer routeRole="SUPER_ADMIN">
                        <LayoutContainer component={route.element} />
                      </GuardContainer>
                    }
                  />
                ))}
                {adminRoutes.map((route, index) => (
                  <Route
                    key={`admin-${index}`}
                    path={route.path}
                    element={
                      <GuardContainer routeRole="ADMIN_WORKSPACE">
                        <LayoutContainer component={route.element} />
                      </GuardContainer>
                    }
                  />
                ))}
                {userRoute.map((route, index) => (
                  <Route
                    key={`user-${index}`}
                    path={route.path}
                    element={<LayoutContainer component={route.element} />}
                  />
                ))}
                <Route path="/exam/:test_id" element={<ExamPage />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route index element={<Home />} />

              <Route path="/error">
                <Route path="403" element={<Error code={403} />} />
              </Route>

              <Route path="*" element={<Error code={404} />} />
            </Routes>
          </BrowserRouter>
        </ThemeContainer>
      </Suspense>
    </Provider>
  );
}

App.displayName = 'App';
export default App;
