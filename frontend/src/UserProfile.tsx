import {ReactElement} from "react";
import CreateButton from "./CreateButton";
import {useUser} from "./hooks/useUser";
import PapersList from "./PapersList";

export default function UserProfile(): ReactElement {
    const {id} = useUser();

    return (
        <>
            <PapersList userId={id} />
            <CreateButton />
        </>
    );
}
