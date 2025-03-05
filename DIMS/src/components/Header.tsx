import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import { useIdentityStore } from '../store/identityStore';

export const Header: React.FC = () => {
  const { identity, logout } = useIdentityStore();

  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl font-bold">DID Manager</h1>
        </div>
        {identity && (
          <div className="flex items-center space-x-4">
            <span className="text-sm opacity-90">DID: {identity.did}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-1 bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-400"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};