import Account from "@/components/Account";
import {UserProvider} from "@/components/User/UserContext";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {PaperProvider} from "react-native-paper";

export default function RootLayout() {
    return (
        <UserProvider>
            <PaperProvider>
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
            </PaperProvider>
        </UserProvider>
    );
}
