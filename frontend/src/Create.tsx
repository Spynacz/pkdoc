import useAxios from "./hooks/useAxios";
import {Button, Datepicker, Label, Select, Textarea, TextInput} from "flowbite-react";
import {FormEvent, ReactElement, useState} from "react";
import {useUser} from "./hooks/useUser";
import {useNavigate} from "react-router";

export default function Create(): ReactElement {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState([""]);
    const [abstract, setAbstract] = useState("");
    const [date, setDate] = useState("");
    const [doi, setDoi] = useState("");
    const [points, setPoints] = useState("");
    const [keywords, setKeywords] = useState([""]);
    const [type, setType] = useState("ARTICLE");
    const {userId} = useUser();

    const navigate = useNavigate();

    const [, postPaper] = useAxios(
        {
            url: "/api/papers",
            method: "POST"
        },
        {manual: true}
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const keywordsClean = Array.from(new Set(keywords));
        const authorsString = authors.join(", ");
        postPaper({
            data: {
                title: title,
                authors: authorsString,
                abstract: abstract,
                publishDate: date,
                doi: doi,
                points: points || 0,
                keywords: keywordsClean,
                type: type,
                uploader: userId
            }
        });

        navigate(-1);
    };

    return (
        <div className="my-auto flex min-w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="w-full min-w-fit max-w-5xl space-y-4 rounded bg-white p-8 shadow-md dark:bg-gray-900">
                <h2 className="text-center text-2xl font-bold text-black dark:text-white">Add new publication</h2>
                <form onSubmit={handleSubmit} className="min-w-56 space-y-6">
                    <div>
                        <Label htmlFor="type" value="Publication type" />
                        <Select id="type" required className="mt-1" onChange={(event) => setType(event.target.value)}>
                            <option value="ARTICLE">Article</option>
                            <option value="BOOK">Book</option>
                            <option value="DISSERTATION">Dissertation</option>
                            <option value="PROJECT">Project</option>
                            <option value="PATENT">Patent</option>
                            <option value="JOURNAL">Journal</option>
                            <option value="CONFERENCE_PAPER">Conference Paper</option>
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
                            value={authors.join(", ")}
                            onChange={(event) =>
                                setAuthors(event.target.value.split(/[,;]+/).map((word) => word.trim()))
                            }
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
                        <Label htmlFor="keywords" value="Keywords (optional)" />
                        <TextInput
                            id="keywords"
                            type="text"
                            value={keywords.join(", ")}
                            onChange={(event) =>
                                setKeywords(event.target.value.split(/[,;]+/).map((word) => word.trim()))
                            }
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
                    <div>
                        <Label htmlFor="points" value="Points (optional)" />
                        <TextInput
                            id="points"
                            type="number"
                            min={0}
                            value={points}
                            onChange={(event) => setPoints(event.target.value)}
                        />
                    </div>
                    <Button color="purple" type="submit" fullSized>
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
}
