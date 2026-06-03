import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('registeredUsers');
    // Ensure existing users have a role
    let users = saved ? JSON.parse(saved) : [];
    
    // Add default admin if not exists
    if (!users.some(u => u.email === 'admin@ritual.com')) {
      users.push({
        fullName: 'Admin Ritual',
        email: 'admin@ritual.com',
        password: 'admin123',
        role: 'admin'
      });
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
    
    return users.map(user => ({ ...user, role: user.role || 'user' }));
  });

  const isLoggedIn = !!currentUser;

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = (credentials) => {
    const user = registeredUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password!" };
  };

  const register = (newUser) => {
    if (registeredUsers.some(u => u.email === newUser.email)) {
      return { success: false, message: "Email already registered!" };
    }
    // Set default role to 'user' if not provided
    const userWithRole = { ...newUser, role: newUser.role || 'user' };
    setRegisteredUsers(prev => [...prev, userWithRole]);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoggedIn, 
      isAdmin,
      login, 
      register, 
      logout,
      registeredUsers 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
