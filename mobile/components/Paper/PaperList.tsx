import {API_URL} from "@/components/AxiosConfig";
import React, {ReactElement, useCallback, useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {Button} from "react-native-paper";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import useAxios from "../../hooks/useAxios";
import useFilters from "../../hooks/useFilters";
import FilterMenu from "./FilterMenu";
import PaperCard from "./PaperCard";

interface PapersListProps {
    userId?: number;
}

export default function PapersList(props: PapersListProps): ReactElement {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === "light" ? styles.lightContainer : styles.lightContainer;

    const {userId} = props;
    const {filters, sorting, handleFilterChange} = useFilters();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const [{data, loading}, fetchPapers] = useAxios(
        {
            url: `${API_URL}/papers`,
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
            })
            .catch((error) => {
                if (error.code === "ERR_CANCELED") {
                    return Promise.resolve({status: 499});
                }
            });
    }, [fetchPapers]);

    const onPageChange = useCallback((page: number) => setPage(page - 1), []);

    const hiddenFilter = useSharedValue<number>(-Dimensions.get("window").width);

    const config = {
        duration: 300,
        easing: Easing.bezier(0.5, 0.01, 0, 1)
    };

    const animatedFilterMenu = useAnimatedStyle(() => ({
        left: withTiming(menuOpen ? 0 : hiddenFilter.value, config)
    }));

    const animatedFilterButton = useAnimatedStyle(() => ({
        left: withTiming(menuOpen ? 220 : 10, config)
    }));

    const renderFilterMenu = () => {
        const pointerEvents = menuOpen ? "auto" : "none";
        return (
            <>
                <Animated.View style={[styles.menuButton, animatedFilterButton]}>
                    <Button mode="contained" onPress={() => setMenuOpen(!menuOpen)}>
                        <Text>{menuOpen ? "Close" : "Filters"}</Text>
                    </Button>
                </Animated.View>
                <Animated.View style={[styles.filterMenu, animatedFilterMenu]} pointerEvents={pointerEvents}>
                    <FilterMenu onFilterChange={handleFilterChange} filters={filters} sorting={sorting} />
                </Animated.View>
            </>
        );
    };

    const renderPapersList = () => {
        return (
            <View style={styles.listContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data?.content}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <PaperCard
                            id={item.id}
                            title={item.title}
                            authors={item.authors}
                            abstractText={item.abstractText}
                            publishDate={item.publishDate}
                            type={item.type}
                            doi={item.doi || "10.1337/pk.2137"}
                            points={item.points}
                        />
                    )}
                />
                <View style={styles.pagination}>
                    <Button style={styles.paginationButton} onPress={() => onPageChange(Math.max(1, page))}>
                        <Text>Previous</Text>
                    </Button>
                    <Text style={styles.paginationText}>
                        Page {page + 1} of {totalPages}
                    </Text>
                    <Button
                        style={styles.paginationButton}
                        onPress={() => onPageChange(Math.min(totalPages, page + 2))}
                    >
                        <Text>Next</Text>
                    </Button>
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
        <View style={[styles.container, themeContainerStyle]}>
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
    lightContainer: {
        backgroundColor: "#f9f9f9"
    },
    darkContainer: {
        backgroundColor: "#374151"
    },
    filterMenu: {
        position: "absolute",
        zIndex: 20
    },
    menuButton: {
        position: "absolute",
        bottom: 60,
        zIndex: 20
    },
    listContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        marginHorizontal: 10
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 7,
        gap: 10
    },
    paginationText: {
        verticalAlign: "middle",
        color: "#714696"
    },
    paginationButton: {
        flexBasis: 0,
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
