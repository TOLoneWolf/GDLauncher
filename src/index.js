import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, history } from './common/store/configureStore';
// import theme from './ui/theme';
import RootDev from './Root-Dev';
import RootWeb from './Root-Web';
import RootElectron from './Root-Electron';
import ModalsManager from './common/components/ModalsManager';

import 'typeface-roboto';
import ErrorBoundary from './app/desktop/ErrorBoundary';

const Root =
  // eslint-disable-next-line no-nested-ternary
  process.env.NODE_ENV === 'development'
    ? RootDev
    : process.env.APP_TYPE === 'web'
    ? RootWeb
    : RootElectron;

const ThemeProvider = ({ children }) => {
  const themeState = useSelector(state => state.settings.theme);
  const activeTheme = themeState.active;
  const currentTheme = themeState.themes[activeTheme];
  // console.log(themeState);
  return (
    <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
  );
};

const { store, persistor } = configureStore();

window.__store = store;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <ConnectedRouter history={history}>
          <ErrorBoundary>
            <ModalsManager />
            <Root history={history} store={store} persistor={persistor} />
          </ErrorBoundary>
        </ConnectedRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
