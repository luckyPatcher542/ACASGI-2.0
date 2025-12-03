import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router/index';
import { AuthProvider } from './router/AuthContext';
import { LanguageProvider } from './router/LanguageContext';
import { NotificationsProvider } from './router/NotificationsContext';

function App() {
  useEffect(() => {
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <NotificationsProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </NotificationsProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
