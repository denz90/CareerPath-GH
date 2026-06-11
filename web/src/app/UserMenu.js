"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for auth cookie on mount and when path/router changes
    const checkAuth = () => {
      const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('auth-token='));
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        setIsLoggedIn(!!token);
        
        // Decode JWT payload to get email
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const payload = JSON.parse(jsonPayload);
          if (payload && payload.sub) {
            setEmail(payload.sub);
          }
        } catch (e) {
          console.error("Failed to parse auth token:", e);
        }
      } else {
        setIsLoggedIn(false);
        setEmail('');
      }
    };

    checkAuth();
    
    // Simple way to listen for changes if we're on the same page
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, [pathname]);

  const handleLogout = () => {
    // Clear cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setEmail('');
    setIsOpen(false);
    router.push('/login');
    router.refresh();
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
          Sign In
        </Link>
        <Link href="/login?mode=signup" className="bg-primary hover:bg-secondary text-primary-foreground px-4 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg text-sm">
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-muted/50 hover:bg-muted/80 px-3 py-1.5 rounded-full transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <User size={18} />
        </div>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-border">
              <p className="text-sm font-semibold truncate">
                {email ? email.split('@')[0] : 'Student Account'}
              </p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
            <div className="p-2">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
