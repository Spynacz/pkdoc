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

    const [{data, loading, error}, fetchPaper] = useAxios({
        url: `/api/papers/${id}`
    });

    if (loading) {
        return <div>loading</div>;
    }

    const {title, authors, type, doi, publishDate, abstractText, keywords} = data;

    const prettyType = PaperType[type as keyof typeof PaperType];

    return (
        <div className="flex h-[calc(100vh-63px)] flex-col">
            <div className="flex w-screen justify-center">
                <div className="mx-1 mt-4 flex w-full min-w-fit max-w-screen-xl flex-col gap-3 sm:mx-4">
                    <Card>
                        <div className="flex flex-row justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
                                <h6 className="pt-3 text-gray-900 dark:text-white">{authors}</h6>
                            </div>
                            <div className="text-right">
                                <p className="items-center self-center text-lg font-medium text-gray-700 dark:text-gray-400">
                                    {prettyType}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">{doi || "10.1337/pk.2137"}</p>
                                <div>
                                    <p className="my-auto font-normal text-gray-700 dark:text-gray-400">
                                        {publishDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-50">Abstract</h3>
                        <div>{abstractText}</div>
                    </Card>
                    <Card>
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-50">Keywords</h3>
                        <p>
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
                    <Card>full text should go here</Card>
                </div>
            </div>
        </div>
    );
}
