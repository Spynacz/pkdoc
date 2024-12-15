import {createContext, ReactNode, useEffect, useState} from "react";

export const UserContext = createContext({
    userId: -1,
    email: "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (id: number, email: string) => {},
    logout: () => {}
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({children}: UserProviderProps) => {
    const [userId, setUserId] = useState(-1);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("userEmail");
        if (storedId && typeof storedId !== "undefined" && storedEmail && typeof storedEmail !== "undefined") {
            setUserId(JSON.parse(storedId));
            setEmail(storedEmail);
        }
    }, []);

    const login = (id: number, email: string) => {
        setUserId(id);
        setEmail(email);
        localStorage.setItem("userId", JSON.stringify(id));
        localStorage.setItem("userEmail", email);
    };

    const logout = () => {
        setUserId(-1);
        setEmail("");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
    };

    return <UserContext.Provider value={{userId: userId, email, login, logout}}>{children}</UserContext.Provider>;
};
