import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  appLoading: boolean;
  setAppLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appLoading, setAppLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ appLoading, setAppLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};