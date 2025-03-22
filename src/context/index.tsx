"use client";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebaseConfig";
import { loginWithGoogle, logout } from "../services/authService";
import { courseTermMap } from "./courseTermMap";

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<UserCredential | null>;
  loginWithGitHub: () => Promise<UserCredential | null>;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<UserCredential | null>;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  userInfo: UserInfo | null;
  transcriptIndex: number;
  avatar: number[];
  updateTranscript: () => void;
  updateAvatar: (emoji: number, color: number) => void;
  courseTerms: { [key: string]: string };
  courseResultMap: { [key: string]: string | number };
  courseNameMap: { [key: string]: string };
}

interface UserInfo {
  firstName: string;
  lastName: string;
  program: string;
  uploadDate: string;
  declaredOptions: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [courseTerms, setCourseTerms] = useState<{ [key: string]: string }>({});
  const [courseResultMap, setCourseResultMap] = useState<{
    [key: string]: string;
  }>({});
  const [transcriptIndex, setTranscriptIndex] = useState<number>(0);
  const [avatar, setAvatar] = useState<number[]>([-1, -1]);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [courseNameMap, setCourseNameMap] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthResolved(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCourseMapping = async () => {
      setCourseNameMap(courseTermMap);
    };
    fetchCourseMapping();
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
            uploadDate: data.uploadDate,
            declaredOptions: data.optionNames,
          };
          setUserInfo(userData);

          if (
            data.avatar &&
            Array.isArray(data.avatar) &&
            data.avatar.length === 2
          ) {
            setAvatar(data.avatar);
          }

          const newCourseTerms: { [key: string]: string } = {};
          const newCourseResults: { [key: string]: string } = {};

          for (const term of data.termSummaries) {
            const level = term.level;
            for (const course of term.courses) {
              newCourseTerms[`${Object.keys(course)[0]}`] = level;
              newCourseResults[`${Object.keys(course)[0]}`] =
                course[Object.keys(course)[0]];
            }
          }

          setUserInfo(userData);
          setCourseTerms(newCourseTerms);
          setCourseResultMap(newCourseResults);
        } catch {
          console.error("Missing user data field");
        }
      } else {
        console.error("Missing user");
      }
    };

    if (user) fetchData();
  }, [user, transcriptIndex]);

  useEffect(() => {
    updateAvatar();
  }, [avatar]);

  const updateAvatar = async () => {
    if (user?.email && avatar.length === 2) {
      try {
        const userRef = doc(db, "user", user.email);
        await setDoc(userRef, { avatar }, { merge: true });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateAvatarState = (emoji: number, color: number) => {
    setAvatar([emoji, color]);
    updateAvatar();
  };

  const updateTranscript = () => {
    setTranscriptIndex(transcriptIndex + 1);
  };

  const loginWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  if (!isAuthResolved) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginWithGitHub,
        loginWithEmail,
        signUpWithEmail,
        logout,
        userInfo,
        transcriptIndex,
        avatar,
        updateTranscript,
        updateAvatar: updateAvatarState,
        courseTerms,
        courseResultMap,
        courseNameMap,
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
