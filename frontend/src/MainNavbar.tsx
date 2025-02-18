import useAxios from "./hooks/useAxios";
import {
    Avatar,
    Button,
    DarkThemeToggle,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand
} from "flowbite-react";
import {ReactElement, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router";
import {useUser} from "./hooks/useUser";

function UserDropdown() {
    const {email, logout} = useUser();
    const [picture, setPicture] = useState(""); // probably temporary
    const navigate = useNavigate();

    const [, refetch] = useAxios(`/api/users/${email}`);

    const logOut = (): void => {
        logout();
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        refetch().catch((err) => console.error(err));
    }, [refetch]);

    function getLabel(): React.ReactNode {
        return picture ? <Avatar alt="User" img="/src/assets/account.svg" rounded /> : <Avatar alt="User" rounded />;
    }

    return (
        <Dropdown arrowIcon={false} inline label={getLabel()}>
            <DropdownHeader>
                <span className="block truncate text-sm font-medium">{email}</span>
            </DropdownHeader>
            <DropdownItem as={Link} to="/profile">
                Profile
            </DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={logOut}>Sign out</DropdownItem>
        </Dropdown>
    );
}

function GuestLogin() {
    return (
        <Button as={Link} to="/login">
            Sign In
        </Button>
    );
}

export default function MainNavbar(): ReactElement {
    const {email} = useUser();

    return (
        <Navbar fluid className="sticky z-10 top-0 border border-gray-200 shadow-md dark:border-gray-700">
            <NavbarBrand as={Link} to={{pathname: "/", search: ""}}>
                <img src="/src/assets/favicon.svg" className="mr-3 h-6 sm:h-9" alt="PKDoc" />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-700 dark:text-white">
                    PKDoc
                </span>
            </NavbarBrand>
            <div className="flex gap-3">
                <DarkThemeToggle />
                {email.length > 0 ? <UserDropdown /> : <GuestLogin />}
            </div>
        </Navbar>
    );
}
