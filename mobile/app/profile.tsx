import Account from "@/components/Account";
import UserProfile from "@/components/User/UserProfile";
import {Stack} from "expo-router";
import React from "react";

export default function ProfileScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Profile",
                    headerRight: () => <Account />
                }}
            />
            <UserProfile />
        </>
    );
}
