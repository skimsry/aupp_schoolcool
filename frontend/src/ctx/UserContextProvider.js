import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context
export const UserContext = createContext({});

// Create a provider
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userStudent, setUserStudent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_APIURL;
  const getUserStudent = async () => {
    setLoading(true);
    setError(null);
    try {
      // const response = await axios.get();

      const response = await axios.get(
        `${apiUrl}api/users/getUsersStudent`
        // `http://localhost:3001api/users/getUsers`
      );
      //console.log(response.data);
      setUserStudent(response.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
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
    // getUsers();
    // console.log(userStudent);
    const user = JSON.parse(localStorage.getItem("schoolcool-user"));
    const token = localStorage.getItem("schoolcool-token");
    //getUserStudent();
    if (user) {
      //console.log(user);
      setUser(user);
      setIsAuthenticated(true);
      setToken(token);
      //getuserStudent
      getUserStudent();
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

  function updateUser(user, token) {
    // Save the user to localStorage
    localStorage.setItem("schoolcool-user", JSON.stringify(user));
    // Save the token to localStorage
    localStorage.setItem("schoolcool-token", token);
    // Set the user and token in state
    setUser(user);
    setToken(token);
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
        // setUser,
        userStudent,
        setUserStudent,
        getUserStudent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
