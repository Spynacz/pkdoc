import {IconArrowUp} from "@tabler/icons-react";
import {Checkbox, FloatingLabel, Label, Select} from "flowbite-react";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {PaperType} from "./PaperType";
import useDebounce from "./hooks/useDebounce";
import {SortOrder} from "./hooks/useFilters";

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

export default function FilterMenu({
    onFilterChange
}: {
    onFilterChange: (filters: FilterParams, sorting: Sorting) => void;
}): ReactElement {
    const [filters, setFilters] = useState({
        title: "",
        authors: "",
        fromDate: "",
        toDate: "",
        keywords: [] as string[],
        checkedTypes: {} as Record<PaperType, boolean>
    });
    const [sorting, setSorting] = useState({
        sort: "publishDate",
        order: SortOrder.ASC
    });

    const debouncedFilters = useDebounce(filters, 200);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFilters((prev) => ({...prev, [name]: value}));
    };

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilters((prev) => ({
            ...prev,
            keywords: e.target.value.split(",").map((k) => k.trim())
        }));
    };

    const handleCheckboxChange = (type: PaperType): void => {
        setFilters((prev) => ({
            ...prev,
            checkedTypes: {
                ...prev.checkedTypes,
                [type]: !prev.checkedTypes[type]
            }
        }));
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSorting({
            ...sorting,
            sort: event.target.value
        });
    };

    const handleSortOrderChange = (): void => {
        setSorting({
            ...sorting,
            order: sorting.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
        });
    };

    useEffect(() => {
        const selectedTypes = Object.keys(debouncedFilters.checkedTypes)
            .filter((key) => debouncedFilters.checkedTypes[key as PaperType])
            .map((key) => key as PaperType);

        const filters: FilterParams = {
            title: debouncedFilters.title,
            authors: debouncedFilters.authors,
            fromDate: debouncedFilters.fromDate,
            toDate: debouncedFilters.toDate,
            keywords: debouncedFilters.keywords,
            types: selectedTypes
        };

        onFilterChange(filters, sorting);
    }, [
        debouncedFilters.authors,
        debouncedFilters.checkedTypes,
        debouncedFilters.fromDate,
        debouncedFilters.keywords,
        debouncedFilters.title,
        debouncedFilters.toDate,
        onFilterChange,
        sorting
    ]);

    return (
        <div className="m-4 flex h-[calc(100vh-97px)] flex-col gap-3 overflow-scroll rounded-lg border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-5 flex flex-col">
                <Label htmlFor="sorting" value="Sort by" />
                <div className="flex flex-row items-center">
                    <Select id="sorting" value={sorting.sort} onChange={handleSortChange}>
                        <option value="title">Title</option>
                        <option value="publishDate">Date published</option>
                    </Select>
                    {sorting.order === SortOrder.ASC ? (
                        <IconArrowUp
                            stroke={1.75}
                            size={30}
                            className="ml-2 text-gray-700 dark:text-gray-300 rotate-0 duration-200"
                            onClick={handleSortOrderChange}
                        />
                    ) : (
                        <IconArrowUp
                            stroke={1.75}
                            size={30}
                            className="ml-2 text-gray-700 dark:text-gray-300 rotate-180 duration-200"
                            onClick={handleSortOrderChange}
                        />
                    )}
                </div>
            </div>

            <FloatingLabel
                label="Title"
                name="title"
                variant="filled"
                type="text"
                value={filters.title}
                onChange={handleInputChange}
                className="rounded-md"
            />

            <FloatingLabel
                label="Authors"
                name="authors"
                variant="filled"
                type="text"
                value={filters.authors}
                onChange={handleInputChange}
                className="rounded-md"
            />

            <FloatingLabel
                label="Published date from"
                name="fromDate"
                variant="filled"
                type="date"
                value={filters.fromDate}
                onChange={handleInputChange}
                className="rounded-md"
            />

            <FloatingLabel
                label="Published date to"
                name="toDate"
                variant="filled"
                type="date"
                value={filters.toDate}
                min={filters.fromDate}
                onChange={handleInputChange}
                className="rounded-md"
            />

            <FloatingLabel
                label="Keywords"
                variant="filled"
                type="text"
                onChange={handleKeywordsChange}
                className="rounded-md"
            />

            <div className="flex max-w-md flex-col gap-1" id="types">
                <h5 className="font-bold">Type</h5>
                {(Object.values(PaperType) as Array<PaperType>).map((type: PaperType) => (
                    <div key={type} className="flex items-center gap-2">
                        <Checkbox
                            id={type}
                            checked={!!filters.checkedTypes[type]}
                            onChange={() => handleCheckboxChange(type)}
                        />
                        <Label htmlFor={type} className="flex">
                            {type}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
