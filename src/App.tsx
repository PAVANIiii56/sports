import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import AdminDashboard from './components/Admin/Dashboard';
import { Store } from 'lucide-react';

function AppContent() {
  const [showSignUp, setShowSignUp] = useState(false);
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Store className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              Sports Store
            </h1>
            <p className="text-gray-600 text-lg">
              Your one-stop shop for all sports equipment
            </p>
          </div>

          <div className="flex justify-center">
            {showSignUp ? (
              <SignUp onToggle={() => setShowSignUp(false)} />
            ) : (
              <Login onToggle={() => setShowSignUp(true)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (profile.role === 'admin') {
    return <AdminDashboard />;
  }

  return <CustomerDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
