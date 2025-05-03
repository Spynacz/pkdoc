import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, Stack} from "expo-router";
import React, {ReactElement, useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {useUser} from "../../hooks/useUser";
import {Button} from "react-native-paper";

interface RegisterResponse {
    userId: number;
    email: string;
    refreshToken: string;
    token: string;
}

export default function Register(): ReactElement {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const {login} = useUser();

    const handleSubmit = async () => {
        if (password2 !== password) {
            setError("Passwords don't match");
            return;
        }
        setError(null);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data: RegisterResponse = await response.json();
            login(data.userId, data.email);
            const setTokens = async () => {
                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem("refreshToken", data.refreshToken);
            };
            setTokens();
            router.navigate("/");
        } catch (err) {}
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "Register"}} />
            <View style={styles.card}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="name.surname@pk.edu.pl"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    <Text style={styles.label}>Repeat Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password2}
                        onChangeText={setPassword2}
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    <Button mode="contained" onPress={handleSubmit} style={styles.loginButton}>
                        Register
                    </Button>

                    <Button mode="outlined" onPress={() => router.navigate("/login")} style={styles.registerButton}>I already have an account</Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f5"
    },
    card: {
        width: "90%",
        maxWidth: 400,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333"
    },
    inputContainer: {
        marginBottom: 15
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: "#555"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: "#333",
        backgroundColor: "#f9f9f9",
        marginBottom: 8
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    rememberMeText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#555"
    },
    loginButton: {
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 10
    },
    registerButton: {
        borderColor: "#6200ea"
    }
});
