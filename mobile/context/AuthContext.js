import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem('careerPath_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to load user", e);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    // Mock authentication
    if (email && password) {
      const mockUser = { id: 1, email, name: email.split('@')[0] };
      setUser(mockUser);
      await AsyncStorage.setItem('careerPath_user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (name, email, password) => {
    // Mock registration
    if (name && email && password) {
      const mockUser = { id: Date.now(), email, name };
      setUser(mockUser);
      await AsyncStorage.setItem('careerPath_user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields' };
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('careerPath_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
