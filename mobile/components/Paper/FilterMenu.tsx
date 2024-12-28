import React from "react";
import {View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import {Checkbox} from "react-native-paper";
import {Picker} from "@react-native-picker/picker";
import {IconButton} from "react-native-paper";
import {FilterParams, Sorting, SortOrder} from "../../hooks/useFilters";
import {PaperType} from "../../types/PaperType";

interface FilterMenuProps {
    onFilterChange: (filters: FilterParams, sorting: Sorting) => void;
    filters: FilterParams;
    sorting: Sorting;
}

export default function FilterMenu(props: FilterMenuProps): React.ReactElement {
    const {onFilterChange, filters, sorting} = props;

    const handleInputChange = (name: string, value: string) => {
        onFilterChange({...filters, [name]: value}, sorting);
    };

    const handleKeywordsChange = (value: string) => {
        onFilterChange({...filters, keywords: value.split(/[,;]+/)}, sorting);
    };

    const handleCheckboxChange = (type: PaperType) => {
        const typesSet = new Set(filters.types);
        if (typesSet.has(type)) {
            typesSet.delete(type);
        } else {
            typesSet.add(type);
        }
        onFilterChange({...filters, types: Array.from(typesSet)}, sorting);
    };

    const handleSortChange = (sort: string) => {
        onFilterChange(filters, {...sorting, sort});
    };

    const handleSortOrderChange = () => {
        onFilterChange(filters, {
            ...sorting,
            order: sorting.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
        });
    };

    const handleClearAll = () => {
        onFilterChange({}, sorting);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.label}>Sort by</Text>
                    <View style={styles.sortRow}>
                        <Picker selectedValue={sorting.sort} onValueChange={handleSortChange} style={styles.picker}>
                            <Picker.Item label="Title" value="title" />
                            <Picker.Item label="Date published" value="publishDate" />
                        </Picker>
                        <IconButton
                            icon={sorting.order === SortOrder.ASC ? "arrow-up" : "arrow-down"}
                            size={24}
                            onPress={handleSortOrderChange}
                            style={styles.sortIcon}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <TextInput
                        placeholder="Title"
                        value={filters.title}
                        onChangeText={(value) => handleInputChange("title", value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Authors"
                        value={filters.authors}
                        onChangeText={(value) => handleInputChange("authors", value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Published date from"
                        value={filters.fromDate}
                        onChangeText={(value) => handleInputChange("fromDate", value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Published date to"
                        value={filters.toDate}
                        onChangeText={(value) => handleInputChange("toDate", value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Keywords"
                        value={filters.keywords?.join(", ")}
                        onChangeText={handleKeywordsChange}
                        style={styles.input}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Type</Text>
                    {Object.values(PaperType).map((type) => (
                        <View key={type} style={styles.checkboxRow}>
                            <Checkbox
                                status={filters?.types?.includes(type) ? "checked" : "unchecked"}
                                onPress={() => handleCheckboxChange(type)}
                            />
                            <Text style={styles.checkboxLabel}>{type}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Clear All */}
            {Object.keys(filters).length ? (
                <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear all filters</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 16
    },
    scrollContent: {
        paddingBottom: 16
    },
    section: {
        marginBottom: 16
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333"
    },
    sortRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    picker: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        paddingTop: 0,
        borderColor: "#ddd",
        borderWidth: 1
    },
    sortIcon: {
        marginLeft: 8
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 8
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: "#333"
    },
    clearButton: {
        backgroundColor: "#6200ee",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
        marginTop: 16
    },
    clearButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    }
});
