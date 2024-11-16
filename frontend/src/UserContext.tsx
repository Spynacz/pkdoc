import {createContext, ReactNode, useEffect, useState} from "react";

export const UserContext = createContext({
    id: -1,
    email: "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (id: number, email: string) => {},
    logout: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({children}: UserProviderProps) => {
    const [id, setId] = useState(-1);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("userEmail");
        if (storedId && storedEmail) {
            setId(JSON.parse(storedId));
            setEmail(storedEmail);
        }
    }, []);

    const login = (id: number, email: string) => {
        setId(id);
        setEmail(email);
        localStorage.setItem("userId", JSON.stringify(id));
        localStorage.setItem("userEmail", email);
    };

    const logout = () => {
        setId(-1);
        setEmail("");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
    };

    return (
        <UserContext.Provider value={{id, email, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};
