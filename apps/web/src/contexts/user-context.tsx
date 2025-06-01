"use client";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export default function UserProvider(props) {
  const [userData, setUserData] = useState(null);
  const [refreshUser, setRefreshUser] = useState(0);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await fetch(
          "http://localhost:2012/api/v1/users/current-user",
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUserData(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCurrentUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ setRefreshUser, userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
}
