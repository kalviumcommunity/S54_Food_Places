import { createContext, useEffect, useState } from "react";
import { getCookie } from "../ManageCookie";

export const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [Username,setUsername] = useState("")
  return (
    <UserContext.Provider value={{ isLoggedin, setIsLoggedin,Username,setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;