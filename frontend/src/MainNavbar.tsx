import { makeUseAxios } from "axios-hooks";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosConfig";
import { useUser } from "./useUser";

interface User {
  email: string;
  picture: string;
}

export default function MainNavbar() {
  const { email } = useUser()

  return (
    <Navbar fluid>
      <NavbarBrand as={Link} to="/">
        <img
          src="/src/assets/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="PKDoc"
        />
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

function UserDropdown() {
  const { email, logout } = useUser()
  const navigate = useNavigate();

  const useAxios = makeUseAxios({
    axios: axiosInstance,
  });

  const [{ data, loading, error }, refetch] = useAxios(
    `/api/users/${email}`,
  );

  const logOut = (): void => {
    logout()
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    refetch()
      .catch ((err) => console.error(err));
}, [refetch]);

return (
  <Dropdown
    arrowIcon={false}
    inline
    label={
      <Avatar alt="User settings" img="/src/assets/account.svg" rounded />
    }
  >
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
