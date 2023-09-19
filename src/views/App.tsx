import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {privateRoutes, publicRoutes} from 'apps/router';
import PageURL from 'apps/PageURL';
import i18n from 'apps/i18n';
import store from 'store';

import ThemeContainer from './container/ThemeContainer';
import AuthContainer from './container/AuthContainer';
import GuardContainer from './container/GuardContainer';
import LayoutContainer from './container/LayoutContainer';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
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
                </Routes>
              </AuthContainer>
            </BrowserRouter>
          </ThemeContainer>
        </Suspense>
      </I18nextProvider>
    </Provider>
  );
}

App.displayName = 'App';
export default App;
