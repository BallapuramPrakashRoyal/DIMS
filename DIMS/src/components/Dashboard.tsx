import React from 'react';
import { Shield, Key, Clock, Plus } from 'lucide-react';
import { useIdentityStore } from '../store/identityStore';

export const Dashboard: React.FC = () => {
  const { identity, addCredential } = useIdentityStore();

  const handleAddDemoCredential = () => {
    addCredential({
      id: `vc_${Math.random().toString(36).substring(2, 9)}`,
      type: 'EmailVerification',
      issuer: 'did:eth:0x1234...5678',
      issuanceDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 31536000000).toISOString(),
      claims: {
        email: identity?.email,
        verified: true,
      },
    });
  };

  if (!identity) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold">Identity Details</h2>
          </div>
          <div className="space-y-3">
            <p><span className="font-medium">Name:</span> {identity.name}</p>
            <p><span className="font-medium">Email:</span> {identity.email}</p>
            <p className="font-mono text-sm break-all">
              <span className="font-medium">DID:</span> {identity.did}
            </p>
            <p className="font-mono text-sm break-all">
              <span className="font-medium">Public Key:</span> {identity.publicKey}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Key className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Verified Credentials</h2>
            </div>
            <button
              onClick={handleAddDemoCredential}
              className="flex items-center space-x-1 text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500"
            >
              <Plus className="w-4 h-4" />
              <span>Add Demo</span>
            </button>
          </div>
          
          {identity.verifiedCredentials.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No credentials yet</p>
          ) : (
            <div className="space-y-4">
              {identity.verifiedCredentials.map((credential) => (
                <div key={credential.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{credential.type}</span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Issuer: {credential.issuer}</p>
                  <p className="text-sm text-gray-600">
                    Expires: {new Date(credential.expirationDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};