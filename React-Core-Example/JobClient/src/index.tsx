import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProvider } from './context/AppContext';
import reportWebVitals from "./reportWebVitals";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Do not reload when the window has focus
      retry: 1, // Attempt to retry the request once if an error occurs
      staleTime: 5 * 60 * 1000 // After 5 minutes, the data is considered stale
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
