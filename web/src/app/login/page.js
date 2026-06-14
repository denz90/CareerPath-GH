"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login, register, forgotPassword, googleLogin } from '@/services/api';
import { Mail, Lock, User, ArrowRight, Globe, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Modes: 'login', 'signup', 'forgot'
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const data = await googleLogin(tokenResponse.access_token);
        document.cookie = `auth-token=${data.access_token}; path=/; max-age=604800`;
        router.push('/');
        router.refresh();
      } catch (err) {
        setLoading(false);
        setMessage({ type: 'error', text: 'Google authentication failed. Please try again.' });
      }
    },
    onError: () => {
      setMessage({ type: 'error', text: 'Google sign-in was cancelled or failed.' });
    },
  });

  useEffect(() => {
    const m = searchParams.get('mode');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (m === 'signup') setMode('signup');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (m === 'forgot') setMode('forgot');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else setMode('login');
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      if (mode === 'forgot') {
        const data = await forgotPassword(email);
        setLoading(false);
        setMessage({ type: 'success', text: data.message });
        return;
      }

      let data;
      if (mode === 'signup') {
        await register(email, password, name);
        // Automatically login after signup
        data = await login(email, password);
      } else {
        data = await login(email, password);
      }

      // Set real JWT token in cookie
      document.cookie = `auth-token=${data.access_token}; path=/; max-age=604800`; // 7 days
      
      router.push('/');
      router.refresh();
    } catch (error) {
      setLoading(false);
      const detail = error.response?.data?.detail || "An error occurred. Please try again.";
      setMessage({ type: 'error', text: detail });
    }
  };

  const updateMode = (newMode) => {
    setMode(newMode);
    setMessage(null);
    const url = newMode === 'login' ? '/login' : `/login?mode=${newMode}`;
    window.history.replaceState(null, '', url);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CareerPath GH
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === 'login' && "Welcome to CareerPath GH"}
            {mode === 'signup' && "Create your account"}
            {mode === 'forgot' && "Reset your password"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === 'login' && "Sign in to access your dashboard"}
            {mode === 'signup' && "Join our community today"}
            {mode === 'forgot' && "Enter your email to receive a reset link"}
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-8 border-primary/10 relative overflow-hidden">
          
          {mode !== 'forgot' && (
            <div className="flex mb-8 bg-muted/50 p-1 rounded-xl">
              <button 
                type="button"
                onClick={() => updateMode('login')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${mode === 'login' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sign In
              </button>
              <button 
                type="button"
                onClick={() => updateMode('signup')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${mode === 'signup' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sign Up
              </button>
            </div>
          )}

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-foreground/80">Password</label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => updateMode('forgot')}
                      className="text-xs text-primary hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-6 cursor-pointer"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' && "Sign In"}
                  {mode === 'signup' && "Create Account"}
                  {mode === 'forgot' && "Send Reset Link"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {mode === 'forgot' && (
            <button 
              onClick={() => updateMode('login')}
              className="mt-6 flex items-center justify-center w-full text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Sign In
            </button>
          )}

          {mode !== 'forgot' && (
            <>
              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <span className="relative px-4 text-xs uppercase text-muted-foreground bg-card">Or continue with</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Google Sign-In Button */}
                <button
                  type="button"
                  onClick={() => handleGoogleLogin()}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-all font-medium text-sm cursor-pointer shadow-sm hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {/* Google SVG logo */}
                  <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
                    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
                    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04"/>
                    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <p className="mt-8 text-center text-xs text-muted-foreground">
                {mode === 'login' ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button 
                      type="button"
                      onClick={() => updateMode('signup')}
                      className="text-primary hover:underline font-semibold cursor-pointer"
                    >
                      Create one here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button 
                      type="button"
                      onClick={() => updateMode('login')}
                      className="text-primary hover:underline font-semibold cursor-pointer"
                    >
                      Sign in instead
                    </button>
                  </>
                )}
              </p>
            </>
          )}

          <p className="mt-6 text-center text-[10px] text-muted-foreground/60 leading-relaxed">
            By continuing, you agree to CareerPath GH&apos;s <br />
            <Link href="#" className="text-primary/70 hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary/70 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck size={16} className="text-accent" />
          <span>Secure, encrypted authentication</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex-grow flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
