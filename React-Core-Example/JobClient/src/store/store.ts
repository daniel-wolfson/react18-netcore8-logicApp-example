import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import appReducer from '../reducers/app';
import { appLoading } from '../reducers/loading/actions';

// middleware
import jobdata from '../middleware/jobdata.middleware';

// persisted state
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState') || '{}') : {};

// create store with Redux Toolkit
const store = configureStore({
    reducer: appReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(jobdata),
    devTools: process.env.NODE_ENV !== 'production',
});

// save state to localStorage on any change
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// dispatch call action "appLoading"
store.dispatch(appLoading(true));

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
