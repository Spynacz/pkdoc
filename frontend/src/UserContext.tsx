import { createContext, ReactNode, useEffect, useState } from "react";

export const UserContext = createContext({
  email: "",
  login: (email: string) => {},
  logout: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("user");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const login = (email: string) => {
    setEmail(email);
    localStorage.setItem("user", email);
  };

  const logout = () => {
    setEmail("");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ email, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
