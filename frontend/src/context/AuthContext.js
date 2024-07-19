import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();
export const AuthProvider = ({ Children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storeDate = JSON.parse(localStorage.getItem("user_data"));
  useEffect(() => {
    if (storeDate) {
      const { userToken, user } = storeDate;
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);
  const login = (newToken, newData) => {
    localStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, user: newData })
    );
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("user_data");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={(token, isAuthenticated, login, logout, userData)}
    >
      {Children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
