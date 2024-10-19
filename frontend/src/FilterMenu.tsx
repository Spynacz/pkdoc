import {makeUseAxios} from "axios-hooks";
import {Checkbox, FloatingLabel, Label} from "flowbite-react";
import axiosInstance from "./AxiosConfig";
import {PaperType} from "./PaperType";
import {ReactElement, useState, useEffect} from "react";

const useAxios = makeUseAxios({
    axios: axiosInstance,
});

interface Keyword {
    id: number;
    text: string;
}

interface FilterParams {
    title?: string;
    authors?: string;
    fromDate?: string;
    toDate?: string;
    keywords?: string;
    types?: PaperType[];
}

export default function FilterMenu({
    onFilterChange,
}: {
    onFilterChange: (filters: FilterParams) => void;
}): ReactElement {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [keywords, setKeywords] = useState();
    const [checkedTypes, setCheckedTypes] = useState<
        Record<PaperType, boolean>
    >({} as Record<PaperType, boolean>);

    //const [{data, error}, fetchKeywords] = useAxios({
    //    url: "/api/keywords",
    //});
    //
    //useEffect(() => {
    //    fetchKeywords();
    //}, [fetchKeywords]);

    useEffect(() => {
        const selectedTypes = Object.keys(checkedTypes)
            .filter((key) => checkedTypes[key as PaperType]) // only include checked types
            .map((key) => key as PaperType);

        const filters: FilterParams = {
            title,
            authors,
            fromDate,
            toDate,
            keywords,
            types: selectedTypes,
        };

        onFilterChange(filters);
    }, [authors, checkedTypes, fromDate, keywords, onFilterChange, title, toDate]);

    const handleFromDateChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const selectedDate = event.target.value;
        setFromDate(selectedDate);

        if (toDate && selectedDate > toDate) {
            setToDate("");
        }
    };

    const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value;
        setToDate(selectedDate);
    };

    const handleCheckboxChange = (type: PaperType) => {
        setCheckedTypes((prevCheckedTypes) => ({
            ...prevCheckedTypes,
            [type]: !prevCheckedTypes[type],
        }));
    };

    return (
        <div className="m-4 flex h-[calc(100vh-97px)] flex-col gap-3 overflow-scroll rounded-lg border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <FloatingLabel
                label="Title"
                variant="filled"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-md"
            />

            <FloatingLabel
                label="Authors"
                variant="filled"
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                className="rounded-md"
            />

            <div className="flex flex-row gap-2">
                <FloatingLabel
                    label="Published date from"
                    variant="filled"
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    className="rounded-md"
                />
                <FloatingLabel
                    label="Published date to"
                    variant="filled"
                    type="date"
                    value={toDate}
                    min={fromDate}
                    onChange={handleToDateChange}
                    className="rounded-md"
                />
            </div>

            <FloatingLabel
                label="Keywords"
                variant="filled"
                type="text"
                className="rounded-md"
            />

            <div className="flex max-w-md flex-col gap-1" id="types">
                <h5 className="font-bold">Type</h5>
                {(Object.values(PaperType) as Array<PaperType>).map(
                    (type: PaperType) => (
                        <div key={type} className="flex items-center gap-2">
                            <Checkbox
                                id={type}
                                checked={!!checkedTypes[type]} // Make sure it's either true or false
                                onChange={() => handleCheckboxChange(type)} // Update the state on change
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
// <div>{data?.map((keyword: Keyword) => <p>{keyword.text}</p>)}</div>
