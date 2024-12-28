import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, Stack} from "expo-router";
import React, {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import {Button, Checkbox} from "react-native-paper";
import {useUser} from "../../hooks/useUser";
import {API_URL} from "../AxiosConfig";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const {login} = useUser();

    const handleSubmit = () => {
        fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                login(data.userId, data.email);
                const setTokens = async () => {
                    await AsyncStorage.setItem("token", data.token);
                    await AsyncStorage.setItem("refreshToken", data.refreshToken);
                };
                setTokens();

                router.push("/");
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Login failed", "Please check your credentials and try again.");
            });
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Sign in"
                }}
            />
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="name.surname@pk.edu.pl"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoComplete="password"
                    />
                </View>
                <View style={styles.rememberMeContainer}>
                    <Checkbox
                        status={rememberMe ? "checked" : "unchecked"}
                        onPress={() => setRememberMe(!rememberMe)}
                    />
                    <Text style={styles.rememberMeText}>Remember me</Text>
                </View>
                <Button mode="contained" onPress={handleSubmit} style={styles.loginButton}>
                    Login
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => router.navigate("Register")}
                    style={styles.registerButton}
                >
                    I don't have an account
                </Button>
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
        backgroundColor: "#f9f9f9"
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
        marginBottom: 10,
        paddingVertical: 10
    },
    registerButton: {
        borderColor: "#6200ea"
    }
});
