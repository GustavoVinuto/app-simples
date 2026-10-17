import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeSetLocalStorage, safeGetLocalStorage } from '../utils/storageUtils';
import { DEFAULT_AVATARS } from '../data/avatars';

const AuthContext = createContext();

const INITIAL_USERS = [
  {
    id: 'user-demo-1',
    name: 'Irmã Alice',
    emailOrPhone: 'alice@simples.com',
    password: '123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Membro da Simples',
    createdAt: '2026-01-10'
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return safeGetLocalStorage('simples_current_user', null);
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return safeGetLocalStorage('simples_registered_users', INITIAL_USERS);
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authPrompt, setAuthPrompt] = useState('');
  const [afterAuthSuccess, setAfterAuthSuccess] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      safeSetLocalStorage('simples_current_user', currentUser);
    } else {
      localStorage.removeItem('simples_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    safeSetLocalStorage('simples_registered_users', registeredUsers);
  }, [registeredUsers]);

  const openAuthModal = (promptText = '', onSuccess = null) => {
    setAuthPrompt(promptText);
    setAfterAuthSuccess(() => onSuccess);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthPrompt('');
    setAfterAuthSuccess(null);
  };

  const signup = ({ name, emailOrPhone, password, avatar, role }) => {
    const cleanContact = emailOrPhone.trim().toLowerCase();
    
    // Check if user with same contact already exists
    const existing = registeredUsers.find(u => u.emailOrPhone.toLowerCase() === cleanContact);
    if (existing) {
      return { success: false, message: 'Já existe uma conta com este WhatsApp/E-mail. Faça login.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      emailOrPhone: cleanContact,
      password,
      avatar: avatar || DEFAULT_AVATARS[0].url,
      role: role || 'Membro da Simples',
      createdAt: new Date().toISOString()
    };

    const updated = [newUser, ...registeredUsers];
    setRegisteredUsers(updated);
    setCurrentUser(newUser);

    if (afterAuthSuccess) {
      afterAuthSuccess(newUser);
    }

    closeAuthModal();
    return { success: true, user: newUser };
  };

  const login = (emailOrPhone, password) => {
    const cleanContact = emailOrPhone.trim().toLowerCase();
    const found = registeredUsers.find(
      u => u.emailOrPhone.toLowerCase() === cleanContact && u.password === password
    );

    if (!found) {
      return { success: false, message: 'WhatsApp/E-mail ou senha incorretos.' };
    }

    setCurrentUser(found);

    if (afterAuthSuccess) {
      afterAuthSuccess(found);
    }

    closeAuthModal();
    return { success: true, user: found };
  };

  const quickLoginAs = (user) => {
    setCurrentUser(user);
    if (afterAuthSuccess) {
      afterAuthSuccess(user);
    }
    closeAuthModal();
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateCurrentUserAvatar = (newAvatarUrl) => {
    if (!currentUser) return;
    const updated = { ...currentUser, avatar: newAvatarUrl };
    setCurrentUser(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id || u.emailOrPhone === currentUser.emailOrPhone ? { ...u, avatar: newAvatarUrl } : u))
    );
    safeSetLocalStorage('simples_current_user', updated);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      registeredUsers,
      isAuthModalOpen,
      authPrompt,
      openAuthModal,
      closeAuthModal,
      signup,
      login,
      quickLoginAs,
      logout,
      updateCurrentUserAvatar
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
