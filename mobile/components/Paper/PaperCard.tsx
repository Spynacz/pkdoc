import {router} from "expo-router";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {PaperType} from "../../types/PaperType";

interface PaperCardProps {
    id: number;
    title: string;
    authors: string[];
    publishDate: string;
    abstractText?: string;
    doi?: string;
    points?: number;
    type: keyof typeof PaperType;
}

export default function PaperCard(props: PaperCardProps): React.ReactElement {
    const {id, title, authors, publishDate, abstractText, doi, type, points} = props;

    const prettyType = PaperType[type];

    const handlePress = () => {
        router.push(`/details/${id}`);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <View style={styles.header}>
                <View style={styles.authorInfo}>
                    <Image source={require("../../assets/account.png")} style={styles.avatar} />
                    <Text style={styles.authorsText}>{authors}</Text>
                </View>
                <Text style={styles.dateText}>{publishDate}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.paperType}>{prettyType}</Text>
                </View>
                {abstractText && <Text style={styles.abstractText}>{abstractText}</Text>}
            </View>
            <View style={styles.footer}>
                <Text style={styles.doiText}>DOI: {doi}</Text>
                {points ? <Text style={styles.pointsText}>Points: {points}</Text> : ""}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8
    },
    authorInfo: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: 8
    },
    authorsText: {
        fontSize: 14,
        color: "#333"
    },
    dateText: {
        fontSize: 14,
        color: "#555"
    },
    body: {
        marginBottom: 8
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
        gap: 4
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        flexShrink: 1
    },
    paperType: {
        fontSize: 16,
        color: "#888"
    },
    abstractText: {
        fontSize: 14,
        color: "#555"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8
    },
    doiText: {
        fontSize: 12,
        color: "#666"
    },
    pointsText: {
        fontSize: 12,
        color: "#666"
    }
});
