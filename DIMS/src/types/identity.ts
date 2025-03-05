export interface Identity {
  did: string;
  publicKey: string;
  name: string;
  email: string;
  createdAt: string;
  verifiedCredentials: VerifiedCredential[];
}

export interface VerifiedCredential {
  id: string;
  type: string;
  issuer: string;
  issuanceDate: string;
  expirationDate: string;
  claims: Record<string, any>;
}