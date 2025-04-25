import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/type";
import { useRouter } from "expo-router";


// Context for authentication: 

const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();

  // 🔐 Auth state listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Firebase User:", firebaseUser);
  
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          email: firebaseUser?.email,
          name: firebaseUser?.displayName
        });
        updateUserData(firebaseUser.uid);
        router.replace("/(tabs)");
      } else {
        // User is signed out
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });
  
    return () => unsub();
  }, []);
  

  // 🔑 Login
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("Login error:", msg);
      // Handle specific error messages
      if(msg.includes('(auth/invalid-credential)')) 
      msg = "Wrong Credentials!!";
      if(msg.includes('(auth/invalid-email)')) 
      msg = "Invalid Email!!";
      return { success: false, msg };
    }
  };

  // 🆕 Register
  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(firestore, "users", response?.user?.uid), {
        uid: response?.user?.uid,
        email: response.user.email,
        name: name,
        // image: "",
      });

      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("Registration error:", msg);
      // Handle specific error messages:

      if(msg.includes('(auth/email-already-in-use)')) 
      msg = "Email already in use!!";
      if(msg.includes('(auth/invalid-email)')) 
      msg = "Invalid Email!!";
      return { success: false, msg };
    }
  };

  // 🧠 Update user data
  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser({...userData});
      }
    } catch (error: any) {
      let msg = error.message;
      console.error("Failed to update user data:", error);
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
