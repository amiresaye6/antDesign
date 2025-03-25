import React from 'react';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes';

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;