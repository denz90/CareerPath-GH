"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function ClientProviders({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "276277061558-qind0vp4m2v2bejg68upnfoggo0oaka8.apps.googleusercontent.com";
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
