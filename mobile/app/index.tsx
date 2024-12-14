import React, {ReactElement, useCallback, useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator} from "react-native";
import useAxios from "../hooks/useAxios";
import useFilters from "../hooks/useFilters";
// import FilterMenu from "./FilterMenu"; // Update this to a React Native component
// import PaperCard from "./PaperCard"; // Update this to a React Native component

interface PapersListProps {
    userId?: number;
}

export default function PapersList(props: PapersListProps): ReactElement {
    const {userId} = props;
    const {filters, sorting, handleFilterChange} = useFilters();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const [{data, loading}, fetchPapers] = useAxios(
        {
            url: "http://localhost:8080/api/papers",
            params: {
                page,
                user: userId,
                size: 10,
                sort: sorting.sort,
                order: sorting.order,
                ...filters,
                types: filters.types?.join(","),
                keywords: filters.keywords?.join(",")
            }
        },
        {manual: true}
    );

    useEffect(() => {
        fetchPapers()
            .then((data) => {
                setTotalPages(data.data.totalPages);
                console.log(data);
            })
            .catch((error) => {
                if (error.code === "ERR_CANCELED") {
                    return Promise.resolve({status: 499});
                }
            });
    }, [fetchPapers]);

    const onPageChange = useCallback((page: number) => setPage(page - 1), []);

    const renderFilterMenu = () => {
        return (
            <View style={[styles.filterMenu, menuOpen && styles.menuOpen]}>
                {/* <FilterMenu onFilterChange={handleFilterChange} filters={filters} sorting={sorting} /> */}
                <TouchableOpacity
                    style={[styles.menuButton, menuOpen ? styles.menuButtonOpen : styles.menuButtonClosed]}
                    onPress={() => setMenuOpen(!menuOpen)}
                >
                    <Text>{menuOpen ? "Close" : "Filters"}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderPapersList = () => {
        return (
            <View style={styles.listContainer}>
                {/* <FlatList */}
                {/*     data={data?.content} */}
                {/*     keyExtractor={(item) => item.id.toString()} */}
                {/*     renderItem={({item}) => ( */}
                {/*         <PaperCard */}
                {/*             id={item.id} */}
                {/*             title={item.title} */}
                {/*             authors={item.authors} */}
                {/*             abstractText={item.abstractText} */}
                {/*             publishDate={item.publishDate} */}
                {/*             type={item.type} */}
                {/*             doi={item.doi || "10.1337/pk.2137"} */}
                {/*             points={item.points} */}
                {/*         /> */}
                {/*     )} */}
                {/* /> */}
                <View style={styles.pagination}>
                    {/* Custom Pagination Logic */}
                    <Text>
                        Page {page + 1} of {totalPages}
                    </Text>
                    <TouchableOpacity onPress={() => onPageChange(Math.max(1, page))}>
                        <Text>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPageChange(page + 2)}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderLoading = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderFilterMenu()}
            {loading ? renderLoading() : renderPapersList()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    filterMenu: {
        position: "absolute",
        left: -Dimensions.get("window").width
        // transition: "transform 300ms"
    },
    menuOpen: {
        transform: [{translateX: 0}]
    },
    menuButton: {
        position: "absolute",
        bottom: 20,
        zIndex: 10
    },
    menuButtonOpen: {
        left: 200
    },
    menuButtonClosed: {
        left: 10
    },
    listContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
