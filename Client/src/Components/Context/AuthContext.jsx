import { createContext, useEffect, useState } from "react";
import { getCookie } from "../ManageCookie";

export const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <UserContext.Provider value={{ isLoggedin, setIsLoggedin }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;