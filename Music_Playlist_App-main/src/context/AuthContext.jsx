import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signUp = (email, password, name) => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.find(u => u.email === email);
    
    if (userExists) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      name,
      createdAt: new Date().toISOString()
    };

    // Save user to users list
    const userData = {
      ...newUser,
      password // In a real app, this would be hashed
    };
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Set as current user
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    
    return newUser;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    
    return userWithoutPassword;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    signUp,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

