import {makeUseAxios} from "axios-hooks";
import {Button, Datepicker, Label, Select, Textarea, TextInput} from "flowbite-react";
import {FormEvent, ReactElement, useState} from "react";
import axiosInstance from "./AxiosConfig";
import {useUser} from "./hooks/useUser";

const useAxios = makeUseAxios({
    axios: axiosInstance
});

export default function Create(): ReactElement {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [abstract, setAbstract] = useState("");
    const [date, setDate] = useState("");
    const [doi, setDoi] = useState("");
    const {userId} = useUser();

    const [{data, error}, postPaper] = useAxios(
        {
            url: "/api/papers",
            method: "POST"
        },
        {manual: true}
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        postPaper({
            data: {
                title: title,
                authors: authors,
                abstract: abstract,
                publishDate: date,
                doi: doi,
                uploader: userId
            }
        });
    };

    return (
        <div className="my-auto flex min-w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="w-full min-w-fit max-w-5xl space-y-4 rounded bg-white p-8 shadow-md dark:bg-gray-900">
                <h2 className="text-center text-2xl font-bold text-black dark:text-white">Add new publication</h2>
                <form onSubmit={handleSubmit} className="min-w-56 space-y-6">
                    <div>
                        <Label htmlFor="type" value="Publication type" />
                        <Select id="type" required className="mt-1">
                            <option>Article</option>
                            <option>Book</option>
                            <option>Chapter</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="authors" value="Authors" />
                        <TextInput
                            id="authors"
                            type="text"
                            value={authors}
                            onChange={(event) => setAuthors(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="abstract" value="Abstract (optional)" />
                        <Textarea
                            id="abstract"
                            rows={4}
                            value={abstract}
                            onChange={(event) => setAbstract(event.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="date" value="Published date" />
                        <Datepicker
                            id="date"
                            weekStart={1}
                            required
                            value={date}
                            onSelectedDateChanged={(date) => setDate(date.toISOString().substring(0, 10))}
                        />
                    </div>
                    <div>
                        <Label htmlFor="doi" value="DOI number (optional)" />
                        <TextInput id="doi" type="text" value={doi} onChange={(event) => setDoi(event.target.value)} />
                    </div>
                    <Button type="submit" fullSized>
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
}
