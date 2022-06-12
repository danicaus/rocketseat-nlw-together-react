import { createContext, useEffect, useState, ReactNode } from "react";
import { auth, firebase } from '../services/firebase';


export type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProvidesType = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProvidesType) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;
        
        if(!displayName || !photoURL) {
          throw new Error('Faltando informações da conta Google');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider);
    
    if(result.user) {
      const { displayName, photoURL, uid } = result.user;
      
      if(!displayName || !photoURL) {
        throw new Error('Faltando informações da conta Google');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  
  return(

    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}