import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Mentor {
  mentorId: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  location: string;
  organization: string;
  designation: string;
  experience: number;
}

interface MentorContextType {
  mentor: Mentor | null;
  token: string | null;
  login: (mentorData: Mentor, token: string) => void;
  logout: () => void;
  updateMentor: (mentor: Partial<Mentor>) => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mentor_token');
    const savedMentor = localStorage.getItem('mentor');
    
    if (savedToken) setToken(savedToken);
    if (savedMentor) {
      try {
        setMentor(JSON.parse(savedMentor));
      } catch (e) {
        localStorage.removeItem('mentor');
      }
    }
  }, []);

  const login = (mentorData: Mentor, authToken: string) => {
    setMentor(mentorData);
    setToken(authToken);
    localStorage.setItem('mentor_token', authToken);
    localStorage.setItem('mentor', JSON.stringify(mentorData));
  };

  const logout = () => {
    setMentor(null);
    setToken(null);
    localStorage.removeItem('mentor_token');
    localStorage.removeItem('mentor');
  };

  const updateMentor = (updates: Partial<Mentor>) => {
    if (mentor) {
      const updated = { ...mentor, ...updates };
      setMentor(updated);
      localStorage.setItem('mentor', JSON.stringify(updated));
    }
  };

  return (
    <MentorContext.Provider value={{ mentor, token, login, logout, updateMentor }}>
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = () => {
  const context = useContext(MentorContext);
  if (!context) {
    throw new Error('useMentor must be used within MentorProvider');
  }
  return context;
};
