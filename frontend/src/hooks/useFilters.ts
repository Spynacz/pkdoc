import {makeUseAxios} from "axios-hooks";
import {useCallback, useEffect, useState} from "react";
import axiosInstance from "../AxiosConfig";
import {PaperType} from "../PaperType";

export enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}

const useAxios = makeUseAxios({
    axios: axiosInstance
});

interface FilterParams {
    title?: string;
    authors?: string;
    fromDate?: string;
    toDate?: string;
    keywords?: string[];
    types?: PaperType[];
}

interface Sorting {
    sort: string;
    order: SortOrder;
}

function useFilters(userId?: number) {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filterParams, setFilterParams] = useState<FilterParams>({});
    const [sorting, setSorting] = useState({
        sort: "",
        order: ""
    });

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
            })
        );
    };

    const cleanParams: Partial<FilterParams> = cleanFilterParams(filterParams);

    const [{data}, fetchPapers] = useAxios({
        url: "/api/papers",
        params: {
            page,
            user: userId,
            size: 10,
            sort: sorting.sort,
            order: sorting.order,
            ...cleanParams,
            keywords: cleanParams.keywords?.map((keyword) => keyword.toLowerCase()).join(","),
            types: cleanParams.types?.map((type) => type.toLowerCase()).join(",")
        }
    });

    const onPageChange = useCallback((page: number) => setPage(page - 1), []);

    const handleFilterChange = useCallback(
        (filters: FilterParams, sorting: Sorting) => {
            setFilterParams(filters);
            setSorting(sorting);
            setPage(0);
        },
        [setFilterParams]
    );

    useEffect(() => {
        fetchPapers()
            .then((data) => setTotalPages(data.data.totalPages))
            .catch((err) => console.error(err));
    }, [fetchPapers]);

    return {data, page, totalPages, onPageChange, handleFilterChange};
}

export default useFilters;
