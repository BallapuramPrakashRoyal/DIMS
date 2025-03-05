import React from 'react';
import { Header } from './components/Header';
import { CreateIdentity } from './components/CreateIdentity';
import { Dashboard } from './components/Dashboard';
import { useIdentityStore } from './store/identityStore';

function App() {
  const isAuthenticated = useIdentityStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {isAuthenticated ? <Dashboard /> : <CreateIdentity />}
    </div>
  );
}

export default App;