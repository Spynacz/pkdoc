import {IconArrowUp} from "@tabler/icons-react";
import {Checkbox, FloatingLabel, Label, Select} from "flowbite-react";
import {ChangeEvent, ReactElement} from "react";
import {FilterParams, Sorting, SortOrder} from "../../hooks/useFilters";
import {PaperType} from "../../types/PaperType";

interface FilterMenuProps {
    onFilterChange: (filters: FilterParams, sorting: Sorting) => void;
    filters: FilterParams;
    sorting: Sorting;
}

export default function FilterMenu(props: FilterMenuProps): ReactElement {
    const {onFilterChange, filters, sorting} = props;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        onFilterChange({...filters, [name]: value}, sorting);
    };

    const handleKeywordsChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onFilterChange(
            {...filters, keywords: Array.from(event.target.value.split(/[,;]+/))},
            sorting
        );
    };

    const handleCheckboxChange = (type: PaperType): void => {
        const typesSet = new Set(filters.types);
        if (typesSet.has(type)) {
            typesSet.delete(type);
        } else {
            typesSet.add(type);
        }
        onFilterChange({...filters, types: Array.from(typesSet)}, sorting);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        onFilterChange(filters, {...sorting, sort: e.target.value});
    };

    const handleSortOrderChange = (): void => {
        onFilterChange(filters, {
            ...sorting,
            order: sorting.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
        });
    };

    return (
        <div className="m-4 mr-0 flex h-[calc(100vh-97px)] w-60 flex-col gap-3 overflow-scroll rounded-lg border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-5 flex flex-col">
                <Label htmlFor="sorting" value="Sort by" />
                <div className="flex flex-row items-center justify-between">
                    <Select id="sorting" value={sorting.sort} onChange={handleSortChange} className="w-full">
                        <option value="title">Title</option>
                        <option value="publishDate">Date published</option>
                    </Select>
                    {sorting.order === SortOrder.ASC ? (
                        <IconArrowUp
                            stroke={1.75}
                            size={30}
                            className="ml-2 rotate-0 text-gray-700 duration-200 dark:text-gray-300"
                            onClick={handleSortOrderChange}
                        />
                    ) : (
                        <IconArrowUp
                            stroke={1.75}
                            size={30}
                            className="ml-2 rotate-180 text-gray-700 duration-200 dark:text-gray-300"
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
                value={filters.keywords?.join(",")}
                onChange={handleKeywordsChange}
                className="rounded-md"
            />

            <div className="flex max-w-md flex-col gap-1" id="types">
                <h5 className="font-bold">Type</h5>
                {(Object.values(PaperType) as Array<PaperType>).map((type: PaperType) => (
                    <div key={type} className="flex items-center gap-2">
                        <Checkbox
                            id={type}
                            checked={filters?.types?.includes(type)}
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
