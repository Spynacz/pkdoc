import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router";
import useDebounce from "./useDebounce";

export enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}

export interface FilterParams {
    title?: string;
    authors?: string;
    fromDate?: string;
    toDate?: string;
    keywords?: string[];
    types?: string[];
}

export interface Sorting {
    sort: string;
    order: SortOrder;
}

function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<FilterParams>(() => {
        const query = Object.fromEntries(searchParams.entries());
        const params: FilterParams = {
            title: query.title || "",
            authors: query.authors || "",
            fromDate: query.fromDate || "",
            toDate: query.toDate || "",
            keywords: query.keywords?.split(",") || [],
            types: query.types?.split(",") || []
        };
        return params;
    });

    const [sorting, setSorting] = useState<Sorting>(() => {
        const query = Object.fromEntries(searchParams.entries());
        const sorting: Sorting = {
            sort: query.sort || "publishDate",
            order: (query.order as SortOrder) || SortOrder.DESC
        };
        return sorting;
    });

    const debouncedFilters = useDebounce(filters, 300);

    useEffect(() => {
        const updatedParams: Record<string, string> = {
            ...(debouncedFilters.title && {title: debouncedFilters.title}),
            ...(debouncedFilters.authors && {authors: debouncedFilters.authors}),
            ...(debouncedFilters.fromDate && {fromDate: debouncedFilters.fromDate}),
            ...(debouncedFilters.toDate && {toDate: debouncedFilters.toDate}),
            ...(debouncedFilters.keywords &&
                debouncedFilters.keywords?.length > 0 &&
                debouncedFilters.keywords.every((key) => key.length > 0) && {
                    keywords: debouncedFilters.keywords.join(",")
                }),
            ...(filters.types && filters.types.length > 0 && {types: filters.types.join(",")}),
            ...(sorting.sort && {sort: sorting.sort}),
            order: sorting.order
        };
        setSearchParams(updatedParams);
    }, [sorting, setSearchParams, debouncedFilters, filters.types]);

    const handleFilterChange = useCallback((filters: FilterParams, sorting: Sorting) => {
        setFilters(filters);
        setSorting(sorting);
    }, []);

    return {filters, sorting, handleFilterChange};
}

export default useFilters;
