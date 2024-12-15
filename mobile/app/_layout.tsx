import Account from "@/components/Account";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";

export default function RootLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#714696"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "PKDoc",
                        headerRight: () => <Account />
                    }}
                />
            </Stack>
            <StatusBar style="light" />
        </>
    );
}
