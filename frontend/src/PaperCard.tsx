import {Card} from "flowbite-react";
import {ReactElement} from "react";

interface PaperCardProps {
    id: number;
    title: string;
    authors: string;
    publishDate: string;
    abstractText?: string;
    doi?: string;
}

export default function PaperCard(props: PaperCardProps): ReactElement {
    const {id, title, authors, publishDate, abstractText, doi} = props;

    return (
        <Card key={id}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 align-middle">
                    <img src="../src/assets/account.svg" width={"40px"} />
                    <h6 className="my-auto text-gray-900 dark:text-white">{authors}</h6>
                </div>
                <p className="my-auto font-normal text-gray-700 dark:text-gray-400">{publishDate}</p>
            </div>
            <div className="">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{abstractText}</p>
            </div>
        </Card>
    );
}
