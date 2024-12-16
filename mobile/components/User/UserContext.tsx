import AsyncStorage from "@react-native-async-storage/async-storage";
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
        const getUser = async () => {
            const storedId = await AsyncStorage.getItem("userId");
            const storedEmail = await AsyncStorage.getItem("userEmail");
            if (storedId && typeof storedId !== "undefined" && storedEmail && typeof storedEmail !== "undefined") {
                setUserId(JSON.parse(storedId));
                setEmail(storedEmail);
            }
        };

        getUser();
    }, []);

    const login = async (id: number, email: string) => {
        setUserId(id);
        setEmail(email);
        await AsyncStorage.setItem("userId", JSON.stringify(id));
        await AsyncStorage.setItem("userEmail", email);
    };

    const logout = async () => {
        setUserId(-1);
        setEmail("");
        await  AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("userEmail");
    };

    return <UserContext.Provider value={{userId: userId, email, login, logout}}>{children}</UserContext.Provider>;
};
