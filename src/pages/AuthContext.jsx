import React, { createContext, useEffect, useState } from 'react';
import { getUserByEmail } from '../API/Fetch_Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const email = localStorage.getItem("user_email")
    if(!email)return;
    async function getUser() {
      try {
        const u = await getUserByEmail(email)
        setUser(u)
      } catch(e) {

      }
    }
    getUser()
  },[]);
  const signIn = (username) => {
    setUser({ name: username, discount: 0.1 }); // 10% discount
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
