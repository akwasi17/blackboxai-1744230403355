import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Chatbot from './components/Chatbot';
import CrimeReportForm from './components/CrimeReportForm';
import CrimeFeeds from './components/CrimeFeeds';
import PoliceStations from './components/PoliceStations';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UserProfile from './components/auth/UserProfile';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

function AppContent() {
  const [currentView, setCurrentView] = useState('chat');
  const { currentUser } = useAuth();

  const handleViewChange = (view) => {
    if (!currentUser && (view === 'report' || view === 'feeds')) {
      setCurrentView('login');
      return;
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <Login
            onBack={() => setCurrentView('chat')}
            onSwitchToSignup={() => setCurrentView('signup')}
          />
        );
      case 'signup':
        return (
          <Signup
            onBack={() => setCurrentView('chat')}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      case 'profile':
        return (
          <UserProfile
            onBack={() => setCurrentView('chat')}
          />
        );
      case 'report':
        return <CrimeReportForm onBack={() => setCurrentView('chat')} />;
      case 'feeds':
        return <CrimeFeeds onBack={() => setCurrentView('chat')} />;
      case 'stations':
        return <PoliceStations onBack={() => setCurrentView('chat')} />;
      default:
        return <Chatbot onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('chat')}>
              <ShieldCheckIcon className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold">Crime Awareness Chatbot</h1>
            </div>
            {currentUser && (
              <button
                onClick={() => setCurrentView('profile')}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors"
              >
                <span className="text-sm font-medium">
                  {currentUser.profile?.name || currentUser.email}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          <p>© 2025 Crime Awareness Chatbot. All rights reserved.</p>
          <p className="mt-1">In case of emergency, please dial your local emergency number immediately.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
