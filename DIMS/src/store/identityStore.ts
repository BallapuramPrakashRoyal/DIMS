import { create } from 'zustand';
import { Identity, VerifiedCredential } from '../types/identity';

interface IdentityState {
  identity: Identity | null;
  isAuthenticated: boolean;
  createIdentity: (name: string, email: string) => void;
  addCredential: (credential: VerifiedCredential) => void;
  logout: () => void;
}

export const useIdentityStore = create<IdentityState>((set) => ({
  identity: null,
  isAuthenticated: false,
  createIdentity: (name: string, email: string) => {
    const newIdentity: Identity = {
      did: `did:eth:${Math.random().toString(36).substring(2, 15)}`,
      publicKey: `0x${Math.random().toString(36).substring(2, 15)}`,
      name,
      email,
      createdAt: new Date().toISOString(),
      verifiedCredentials: [],
    };
    set({ identity: newIdentity, isAuthenticated: true });
  },
  addCredential: (credential: VerifiedCredential) =>
    set((state) => ({
      identity: state.identity
        ? {
            ...state.identity,
            verifiedCredentials: [...state.identity.verifiedCredentials, credential],
          }
        : null,
    })),
  logout: () => set({ identity: null, isAuthenticated: false }),
}));