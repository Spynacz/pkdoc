import {Link, Stack, useLocalSearchParams} from "expo-router";
import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Card} from "react-native-paper";
import useAxios from "../../hooks/useAxios";
import {PaperType} from "../../types/PaperType";
import {API_URL} from "../AxiosConfig";

interface Keyword {
    id: number;
    text: string;
}

export default function Paper(): React.ReactElement {
    const {id} = useLocalSearchParams<{id: string}>();
    const [{data, loading}] = useAxios({
        url: `${API_URL}/papers/${id}`
    });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    const {title, authors, type, doi, publishDate, abstractText, keywords} = data;
    const authorsList: string[] = Array.from(authors.split(","));
    const prettyType = PaperType[type as keyof typeof PaperType];

    return (
        <View style={styles.containerer}>
            <ScrollView contentContainerStyle={styles.container}>
                <Stack.Screen
                    options={{
                        title: title
                    }}
                />
                <Card style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.titleSection}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.authors}>
                                {authorsList.map((author: string, index: number) => (
                                    <Text key={index}>
                                        <Link href={{pathname: "/", params: {authors: author}}}>{author}</Link>
                                        {index < authorsList.length - 1 && ", "}
                                    </Text>
                                ))}
                            </Text>
                        </View>
                        <View style={styles.infoSection}>
                            <Text style={styles.type}>
                                <Link href={{pathname: "/", params: {types: prettyType}}}>{prettyType}</Link>
                            </Text>
                            <Text style={styles.doi}>DOI: {doi || "10.1337/pk.2137"}</Text>
                            <Text style={styles.publishDate}>Published on: {publishDate}</Text>
                        </View>
                    </View>
                </Card>

                <Card style={styles.card}>
                    <Text style={styles.sectionTitle}>Abstract</Text>
                    <Text style={styles.text}>{abstractText}</Text>
                </Card>

                <Card style={styles.card}>
                    <Text style={styles.sectionTitle}>Keywords</Text>
                    <Text style={styles.text}>
                        {keywords.map((keyword: Keyword, index: number) => (
                            <Text key={keyword.id}>
                                <Link href={{pathname: "/", params: {keywords: keyword.text}}}>{keyword.text}</Link>
                                {index < keywords.length - 1 && ", "}
                            </Text>
                        ))}
                    </Text>
                </Card>

                <Card style={styles.card}>
                    <Text style={styles.text}>
                        Full text should go here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                        laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
                    </Text>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    containerer: {
        flex: 1,
        backgroundColor: "#f9f9f9"
    },
    container: {
        padding: 16
    },
    card: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 3
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleSection: {
        flex: 2
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333"
    },
    authors: {
        marginTop: 8,
        color: "#555"
    },
    infoSection: {
        flex: 1,
        alignItems: "flex-end"
    },
    type: {
        fontSize: 16,
        fontWeight: "500",
        color: "#666",
        textAlign: "right"
    },
    doi: {
        marginTop: 4,
        color: "#888",
        textAlign: "right"
    },
    publishDate: {
        marginTop: 4,
        color: "#888",
        textAlign: "right"
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
        color: "#222"
    },
    text: {
        fontSize: 16,
        color: "#444"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        fontSize: 18,
        color: "#888"
    }
});
