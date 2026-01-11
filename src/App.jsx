
// ==================== UPDATED APP.JSX ====================
// App.jsx

import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import { AppThemeProvider } from './components/theme/ThemeProvider';
import { router } from './routes';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppThemeProvider>
          <RouterProvider router={router} />
        </AppThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
