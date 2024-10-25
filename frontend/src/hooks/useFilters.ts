import {makeUseAxios} from "axios-hooks";
import {useCallback, useEffect, useState} from "react";
import axiosInstance from "../AxiosConfig";
import {PaperType} from "../PaperType";

const useAxios = makeUseAxios({
    axios: axiosInstance,
});

interface FilterParams {
    title?: string;
    authors?: string;
    fromDate?: string;
    toDate?: string;
    keywords?: string[];
    types?: PaperType[];
}

function useFilters(userId?: number) {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filterParams, setFilterParams] = useState<FilterParams>({});

    const cleanFilterParams = (params: FilterParams) => {
        return Object.fromEntries(
            Object.entries(params).filter(([, value]) => {
                if (typeof value === "string") {
                    return value.trim() !== "";
                }
                if (Array.isArray(value)) {
                    return value.length > 0;
                }
                return value !== "undefined";
            }),
        );
    };

    const cleanParams: Partial<FilterParams> = cleanFilterParams(filterParams);

    const [{data}, fetchLatestPapers] = useAxios({
        url: "/api/papers",
        params: {
            page,
            user: userId,
            size: 10,
            sort: "publishDate",
            order: "desc",
            ...cleanParams,
            keywords: cleanParams.keywords
                ?.map((keyword) => keyword.toLowerCase())
                .join(","),
            types: cleanParams.types
                ?.map((type) => type.toLowerCase())
                .join(","),
        },
    });

    const onPageChange = useCallback((page: number) => setPage(page - 1), []);

    const handleFilterChange = useCallback(
        (filters: FilterParams) => {
            setFilterParams(filters);
            setPage(0);
        },
        [setFilterParams],
    );

    useEffect(() => {
        fetchLatestPapers()
            .then((data) => setTotalPages(data.data.totalPages))
            .catch((err) => console.error(err));
    }, [fetchLatestPapers]);

    return {data, page, totalPages, onPageChange, handleFilterChange};
}

export default useFilters;
