import {Button} from "flowbite-react";
import {ReactElement} from "react";
import {Link} from "react-router";

export default function CreateButton(): ReactElement {
    return (
        <Button as={Link} to="/create" pill size="lg" className="absolute bottom-4 right-4" color="purple">
            Add new
        </Button>
    );
}
