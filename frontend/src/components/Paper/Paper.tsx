import {Card} from "flowbite-react";
import {ReactElement} from "react";
import {Link, useParams} from "react-router";
import useAxios from "../../hooks/useAxios";
import {PaperType} from "../../types/PaperType";

interface Keyword {
    id: number;
    text: string;
}

export default function Paper(): ReactElement {
    const {id} = useParams();

    const [{data, loading}] = useAxios({
        url: `/api/papers/${id}`
    });

    if (loading) {
        return <div>loading</div>;
    }

    const {title, authors, type, doi, publishDate, abstractText, keywords} = data;
    const authorsList: string[] = Array.from(authors.split(","));

    const prettyType = PaperType[type as keyof typeof PaperType];

    return (
        <div className="flex h-[calc(100vh-63px)] flex-col">
            <div className="flex w-screen justify-center overflow-auto">
                <div className="mx-1 mt-4 flex w-full min-w-fit max-w-screen-xl flex-col gap-3 sm:mx-4">
                    <Card>
                        <div className="flex flex-col justify-between sm:flex-row">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
                                <p className="pt-3 text-gray-900 dark:text-white">
                                    {authorsList.map((author: string, index: number) => (
                                        <span key={index}>
                                            <Link to={{pathname: "/", search: `?authors=${author}`}}>{author}</Link>
                                            {index < authorsList.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="items-center self-center text-lg font-medium text-gray-700 dark:text-gray-400">
                                    {prettyType}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">DOI: {doi || "10.1337/pk.2137"}</p>
                                <div>
                                    <p className="my-auto font-normal text-gray-700 dark:text-gray-400">
                                        Published on: {publishDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-50">Abstract</h3>
                        <div className="text-gray-900 dark:text-gray-100">{abstractText}</div>
                    </Card>
                    <Card>
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-50">Keywords</h3>
                        <p className="text-gray-900 dark:text-gray-100">
                            {keywords.map((keyword: Keyword, index: number) => (
                                <span key={keyword.id}>
                                    <Link to={{pathname: "/", search: `?keywords=${keyword.text}`}}>
                                        {keyword.text}
                                    </Link>
                                    {index < keywords.length - 1 && ", "}
                                </span>
                            ))}
                        </p>
                    </Card>
                    <Card className="text-gray-900 dark:text-gray-100">full text should go here</Card>
                </div>
            </div>
        </div>
    );
}
