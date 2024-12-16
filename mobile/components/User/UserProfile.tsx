import React, {ReactElement} from "react";
import CreateButton from "../Create/CreateButton";
import {useUser} from "../../hooks/useUser";
import PapersList from "../Paper/PaperList";

export default function UserProfile(): ReactElement {
    const {userId} = useUser();

    return (
        <>
            <PapersList userId={userId} />
            <CreateButton />
        </>
    );
}
