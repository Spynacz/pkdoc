import {Checkbox, FloatingLabel, Label} from "flowbite-react";
import {ReactElement, useEffect, useState} from "react";
import {PaperType} from "./PaperType";
import useDebounce from "./hooks/useDebounce";

interface FilterParams {
    title?: string;
    authors?: string;
    fromDate?: string;
    toDate?: string;
    keywords?: string[];
    types?: PaperType[];
}

export default function FilterMenu({
    onFilterChange,
}: {
    onFilterChange: (filters: FilterParams) => void;
}): ReactElement {
    const [filters, setFilters] = useState({
        title: "",
        authors: "",
        fromDate: "",
        toDate: "",
        keywords: [] as string[],
        checkedTypes: {} as Record<PaperType, boolean>,
    });

    const debouncedFilters = useDebounce(filters, 200);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFilters((prev) => ({...prev, [name]: value}));
    };

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            keywords: e.target.value.split(",").map((k) => k.trim()),
        }));
    };

    const handleCheckboxChange = (type: PaperType) => {
        setFilters((prev) => ({
            ...prev,
            checkedTypes: {
                ...prev.checkedTypes,
                [type]: !prev.checkedTypes[type], // Toggle the checkbox state
            },
        }));
    };

    useEffect(() => {
        const selectedTypes = Object.keys(debouncedFilters.checkedTypes)
            .filter((key) => debouncedFilters.checkedTypes[key as PaperType])
            .map((key) => key as PaperType);

        const filtersss: FilterParams = {
            title: debouncedFilters.title,
            authors: debouncedFilters.authors,
            fromDate: debouncedFilters.fromDate,
            toDate: debouncedFilters.toDate,
            keywords: debouncedFilters.keywords,
            types: selectedTypes,
        };

        onFilterChange(filtersss);
    }, [
        debouncedFilters.authors,
        debouncedFilters.checkedTypes,
        debouncedFilters.fromDate,
        debouncedFilters.keywords,
        debouncedFilters.title,
        debouncedFilters.toDate,
        onFilterChange,
    ]);

    return (
        <div className="m-4 flex h-[calc(100vh-97px)] flex-col gap-3 overflow-scroll rounded-lg border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
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
                {(Object.values(PaperType) as Array<PaperType>).map(
                    (type: PaperType) => (
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
                    ),
                )}
            </div>
        </div>
    );
}
