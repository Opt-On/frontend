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
import { flushSync } from "react-dom";
import { auth, db } from "../firebaseConfig";
import { loginWithGoogle, logout } from "../services/authService";
import { courseNames } from "./courseTermMap";

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
  transcriptIndex: number;
  avatar: number[];
  updateTranscript: () => void;
  updateAvatar: (emoji: number, color: number) => void;
  courseNameMap: { [key: string]: string };
  userCourseInfo: UserCourseInfo | undefined;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  program: string;
  uploadDate: string;
  declaredOptions: string[];
}

interface CourseData {
  term: string;
  result: string;
}

interface UserCourseInfo {
  userInfo: UserInfo;
  courseData: { [key: string]: CourseData };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // const [courseDataMap, setCourseData] = useState<{
  //   [key: string]: CourseData;
  // }>({});
  const [userCourseInfo, setUserCourseInfo] = useState<UserCourseInfo>();
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
      setCourseNameMap(courseNames);
    };
    fetchCourseMapping();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "user", String(user!.email));
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

          const newCourseData: { [key: string]: CourseData } = {};

          for (const term of data["termSummaries"]) {
            const level = term["level"];
            for (const course of term["courses"]) {
              const courseName = Object.keys(course)[0];
              const singleCourseData: CourseData = {
                term: level,
                result: course[courseName],
              };
              newCourseData[courseName] = singleCourseData;
            }
          }

          // batch setStates
          flushSync(() => {
            // don't update from non-empty to empty state if it shouldnt be empty (mostly for dev)
            setUserCourseInfo({
              userInfo: userData,
              courseData: newCourseData,
            });
            if (
              data.avatar &&
              Array.isArray(data.avatar) &&
              data.avatar.length === 2
            ) {
              setAvatar(data.avatar);
            }
          });
        } catch (e) {
          console.error("Missing user data field", e);
        }
      } else {
        console.error("Missing user");
      }
    };

    if (user && user.email) fetchData();
  }, [user]);

  useEffect(() => {
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
    updateAvatar();
  }, [avatar]);

  const updateAvatarState = (emoji: number, color: number) => {
    setAvatar([emoji, color]);
  };

  const updateTranscript = () => {
    // leaving for now
    // setTranscriptIndex(transcriptIndex + 1);
  };

  const loginWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
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
        transcriptIndex,
        avatar,
        updateTranscript,
        updateAvatar: updateAvatarState,
        userCourseInfo,
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
