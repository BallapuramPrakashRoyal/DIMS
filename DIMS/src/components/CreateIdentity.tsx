import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useIdentityStore } from '../store/identityStore';

export const CreateIdentity: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const createIdentity = useIdentityStore((state) => state.createIdentity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createIdentity(name, email);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <UserPlus className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Digital Identity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Identity
        </button>
      </form>
    </div>
  );
};