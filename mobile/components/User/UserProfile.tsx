import {ReactElement} from "react";
import CreateButton from "../../CreateButton";
import {useUser} from "../../hooks/useUser";
import PapersList from "../Paper/PapersList";

export default function UserProfile(): ReactElement {
    const {userId} = useUser();

    return (
        <>
            <PapersList userId={userId} />
            <CreateButton />
        </>
    );
}
