import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

import { IS_PROD } from 'apps/constants';
import reducer from './reducer';

const middlewares: Middleware[] = [];

if (!IS_PROD) {
  const logger = createLogger({
    diff: true
  });
  IS_PROD && middlewares.push(logger);
}

const store = configureStore({
  reducer,
  middleware: gd => gd({ serializableCheck: false }).concat(...middlewares)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
