import Account from "@/components/Account";
import Paper from "@/components/Paper/Paper";
import {Stack} from "expo-router";
import React from "react";

export default function DetailsScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Publication details",
                    headerRight: () => <Account />
                }}
            />
            <Paper />
        </>
    );
}
