import {Button, Checkbox, Label, Textarea, TextInput} from "flowbite-react";
import {FormEvent, ReactElement, useState} from "react";
import {Link} from "react-router-dom";

export default function Create(): ReactElement {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [abstract, setAbstract] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="my-auto flex min-w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-md dark:bg-gray-900">
                <h2 className="text-center text-2xl font-bold text-black dark:text-white">Add new paper</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <Label htmlFor="authors" value="Authors" />
                        <TextInput
                            id="authors"
                            type="text"
                            placeholder="Authors"
                            value={authors}
                            onChange={(e) => setAuthors(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div>
                        <Label htmlFor="abstract" value="Abstract" />
                        <Textarea
                            id="abstract"
                            placeholder="Abstract"
                            value={abstract}
                            onChange={(e) => setAbstract(e.target.value)}
                        />
                    </div>
                    <Button type="submit" fullSized>
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
}
