"use client";
import { onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { loginWithGoogle, logout } from "../services/authService";

interface Course {
  [courseCode: string]: string;
}

interface TermSummary {
  termId: number;
  level: string;
  courses: Course[];
}

interface UserInfo {
  firstName: string;
  lastName: string;
  studentNumber: number;
  programName: string;
  optionNames: string[];
  termSummaries: TermSummary[];
  uploadDate: string;
}

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  userInfo: UserInfo | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setUserInfo(null);
        return;
      }

      const userRef = doc(db, "user", user.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        try {
          const termSummaries: TermSummary[] = data.termSummaries.map((term: any) => ({
            termId: term.termId,
            level: term.level,
            courses: term.courses.map((course: any) => course), 
          }));

          const userData: UserInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            studentNumber: data.studentNumber,
            programName: data.programName,
            optionNames: data.optionNames || [],
            termSummaries,
            uploadDate: data.uploadDate,
          };

          setUserInfo(userData);
        } catch (error) {
          console.error("Error processing user data:", error);
        }
      } else {
        console.log("No such user!");
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, userInfo }}>
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
