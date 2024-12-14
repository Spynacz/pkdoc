import {Card} from "flowbite-react";
import {ReactElement} from "react";
import {PaperType} from "../../types/PaperType";
import {Link} from "react-router";

interface PaperCardProps {
    id: number;
    title: string;
    authors: string[];
    publishDate: string;
    abstractText?: string;
    doi?: string;
    points?: number;
    type: keyof typeof PaperType;
}

export default function PaperCard(props: PaperCardProps): ReactElement {
    const {id, title, authors, publishDate, abstractText, doi, type, points} = props;

    const prettyType = PaperType[type];

    return (
        <Link to={`/papers/${id}`}>
            <Card key={id}>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3 align-middle">
                        <img src="../src/assets/account.svg" width={"40px"} />
                        <h6 className="my-auto text-gray-900 dark:text-white">{authors}</h6>
                    </div>
                    <div>
                        <p className="my-auto font-normal text-gray-700 dark:text-gray-500">{publishDate}</p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-between">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                        <p className="items-center self-center text-lg font-medium text-gray-700 dark:text-gray-400">
                            {prettyType}
                        </p>
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{abstractText}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-gray-600 dark:text-gray-400">DOI: {doi}</p>
                    <p className="text-gray-700 dark:text-gray-500">Points: {points}</p>
                </div>
            </Card>
        </Link>
    );
}
