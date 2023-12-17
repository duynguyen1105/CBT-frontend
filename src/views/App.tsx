import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PageURL from 'apps/PageURL';
import { privateRoutes, publicRoutes } from 'apps/router';
import store from 'store';

import AuthContainer from './container/AuthContainer';
import GuardContainer from './container/GuardContainer';
import LayoutContainer from './container/LayoutContainer';
import ThemeContainer from './container/ThemeContainer';
import { ExamPage } from './pages/exam';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<></>}>
        <ThemeContainer>
          <BrowserRouter basename={PageURL.BASE}>
            <AuthContainer>
              <Routes>
                {privateRoutes.map((route, index) => (
                  <Route
                    key={`private-${index}`}
                    path={route.path}
                    element={
                      <GuardContainer>
                        <LayoutContainer component={route.element} />
                      </GuardContainer>
                    }
                  />
                ))}
                {publicRoutes.map((route, index) => (
                  <Route
                    key={`public-${index}`}
                    path={route.path}
                    element={<LayoutContainer component={route.element} />}
                  />
                ))}
                <Route path="/exam" element={<ExamPage />} />
              </Routes>
            </AuthContainer>
          </BrowserRouter>
        </ThemeContainer>
      </Suspense>
    </Provider>
  );
}

App.displayName = 'App';
export default App;
