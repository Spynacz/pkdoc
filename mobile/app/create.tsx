import Create from "@/components/Create/Create";
import {Stack} from "expo-router";
import React from "react";

export default function CreateScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Add new publication"
                }}
            />
            <Create />;
        </>
    );
}
