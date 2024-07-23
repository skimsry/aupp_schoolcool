import React, { createContext, useState, useEffect } from "react";

// Create a context
export const UserContext = createContext({});

// Create a provider
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // // Load the user from localStorage
    // const user = JSON.parse(localStorage.getItem("schoolcool-user"));
    // // Load the token from localStorage
    // const token = localStorage.getItem("schoolcool-token");
    // if (user && token) {
    //   // setUser(JSON.parse(user)); //some change
    //   setUser(user);
    //   setIsAuthenticated(true);
    //   setToken(token);
    // } else {
    //   setIsAuthenticated(false);
    // }

    const user = JSON.parse(localStorage.getItem("schoolcool-user"));
    const token = localStorage.getItem("schoolcool-token");
    if (user) {
      console.log(user);
      setUser(user);
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  function login(user, token) {
    // Save the user to localStorage
    localStorage.setItem("schoolcool-user", JSON.stringify(user));
    // Save the token to localStorage
    localStorage.setItem("schoolcool-token", token);
    // Set the user and token in state
    setUser(user);
    setIsAuthenticated(true);
    setToken(token);
  }

  function updateUser(user) {
    // Save the user to localStorage
    localStorage.setItem("schoolcool-user", JSON.stringify(user));
    // Set the user and token in state
    setUser(user);
  }

  function logout() {
    // Remove the user and token from localStorage
    localStorage.removeItem("schoolcool-user");
    localStorage.removeItem("schoolcool-token");
    // Remove the user and token from state
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        isAuthenticated,
        token,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
