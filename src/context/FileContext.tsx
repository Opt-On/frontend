"use client"
import { submitTranscript } from '@/api/transcript';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface FileContextType {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  submitTranscript: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const {user} = useAuth();
  const [file, setFile] = useState<File | null>(null);

  const handleSubmitTranscript = async () => {
    if (!file || !user?.email) return;

    try {
      await submitTranscript(file, user?.email); 
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FileContext.Provider value={{ file, setFile, submitTranscript: handleSubmitTranscript }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) throw new Error('useFile must be used within a FileProvider');
  return context;
};
