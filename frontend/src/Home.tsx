import {ReactElement} from "react";
import CreateButton from "./CreateButton";
import PapersList from "./PapersList";

export default function Home(): ReactElement {
    return (
        <>
            <PapersList />
            <CreateButton />
        </>
    );
}
