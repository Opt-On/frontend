"use client";
// src/context/AuthContext.tsx
import { onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebaseConfig";
import { loginWithGoogle, logout } from "../services/authService";

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  userInfo: UserInfo | null;
  transcriptIndex: number;
  updateTranscript: () => void;
  courseTerms: { [key: string]: string };
}

interface UserInfo {
  firstName: string;
  lastName: string;
  program: string;
  graduationYear: number;
  uploadDate: string;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [courseTerms, setCourseTerms] = useState<{ [key: string]: string }>({});
  const [transcriptIndex, setTranscriptIndex] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) {
        setUserInfo(null);
        return;
      }

      const userRef = doc(db, "user", user.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        try {
          const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            program: data.programName,
            graduationYear: 2069,
            uploadDate: data.uploadDate,
          };
          setUserInfo(userData);

          const newCourseTerms: { [key: string]: string } = {};

          for (const term of data.termSummaries) {
            const level = term.level;
            for (const course of term.courses) {
              newCourseTerms[`${Object.keys(course)[0]}`] = level;
            }
          }
          setCourseTerms(newCourseTerms);
        } catch {
          console.error("missing user data field :I");
        }
      } else {
        // handle maybe
        console.log("No such user!");
      }
    };

    fetchData();
  }, [user, transcriptIndex]);

  const updateTranscript = () => {
    setTranscriptIndex(transcriptIndex + 1);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
        userInfo,
        transcriptIndex,
        updateTranscript,
        courseTerms,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
