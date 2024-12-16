import DateTimePicker from "@react-native-community/datetimepicker";
import {router} from "expo-router";
import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, RadioButton, TextInput} from "react-native-paper";
import useAxios from "../../hooks/useAxios";
import {useUser} from "../../hooks/useUser";

export default function Create() {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState([""]);
    const [abstract, setAbstract] = useState("");
    const [date, setDate] = useState<Date | null>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [doi, setDoi] = useState("");
    const [points, setPoints] = useState("");
    const [keywords, setKeywords] = useState([""]);
    const [type, setType] = useState("ARTICLE");
    const {userId} = useUser();

    const [, postPaper] = useAxios(
        {
            url: "/api/papers",
            method: "POST"
        },
        {manual: true}
    );

    const handleSubmit = () => {
        const keywordsClean = Array.from(new Set(keywords));
        const authorsString = authors.join(", ");
        postPaper({
            data: {
                title: title,
                authors: authorsString,
                abstract: abstract,
                publishDate: date ? date.toISOString().substring(0, 10) : "",
                doi: doi,
                points: points || 0,
                keywords: keywordsClean,
                type: type,
                uploader: userId
            }
        });

        router.back();
    };

    const handleDateConfirm = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Add New Publication</Text>

                <Text style={styles.label}>Publication Type</Text>
                <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
                    <View style={styles.radioItem}>
                        <RadioButton value="ARTICLE" />
                        <Text>Article</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="BOOK" />
                        <Text>Book</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="DISSERTATION" />
                        <Text>Dissertation</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="PROJECT" />
                        <Text>Project</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="PATENT" />
                        <Text>Patent</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="JOURNAL" />
                        <Text>Journal</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="CONFERENCE_PAPER" />
                        <Text>Conference paper</Text>
                    </View>
                </RadioButton.Group>

                <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} mode="outlined" />

                <TextInput
                    label="Authors"
                    value={authors.join(", ")}
                    onChangeText={(value) => setAuthors(value.split(/[,;]+/).map((word) => word.trim()))}
                    style={styles.input}
                    mode="outlined"
                />

                <TextInput
                    label="Abstract (optional)"
                    value={abstract}
                    onChangeText={setAbstract}
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    mode="outlined"
                />

                <TextInput
                    label="Keywords (optional)"
                    value={keywords.join(", ")}
                    onChangeText={(value) => setKeywords(value.split(/[,;]+/).map((word) => word.trim()))}
                    style={styles.input}
                    mode="outlined"
                />

                <Text style={styles.label}>Published Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text>{date ? date.toISOString().substring(0, 10) : "Select Date"}</Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={date || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateConfirm}
                    />
                )}
                <TextInput
                    label="DOI Number (optional)"
                    value={doi}
                    onChangeText={setDoi}
                    style={styles.input}
                    mode="outlined"
                />

                <TextInput
                    label="Points (optional)"
                    value={points}
                    onChangeText={setPoints}
                    style={styles.input}
                    keyboardType="numeric"
                    mode="outlined"
                />

                <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                    Save
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#f5f5f5"
    },
    form: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        elevation: 2
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16
    },
    label: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: "500"
    },
    input: {
        marginVertical: 8
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4
    },
    submitButton: {
        marginTop: 16
    }
});
