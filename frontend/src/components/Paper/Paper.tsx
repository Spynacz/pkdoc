import {ReactElement} from "react";
import useAxios from "../../hooks/useAxios";
import {useParams} from "react-router";

export default function Paper(): ReactElement {
    const {id} = useParams();

    const [{data, loading, error}, fetchPaper] = useAxios({
        url: `/api/papers/${id}`
    });

    if (loading) {
        return <div>loading</div>;
    }

    const {title, authors, doi, publishDate, abstractText} = data;

    return (
        <div className="flex h-[calc(100vh-63px)] flex-col">
            <h1 className="">{title}</h1>
            <div>{authors}</div>
            <div>{doi}</div>
            <div>{publishDate}</div>
            <div>{abstractText}</div>
        </div>
    );
}
