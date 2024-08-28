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
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

interface User {
  email: string;
  picture: string;
}

interface UserCookie {
  email: string;
  token: string;
}

export default function MainNavbar() {
  const [userCookie] = useCookies<string>(["user"]);

  return (
    <Navbar fluid>
      <NavbarBrand href="/">
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
        {"user" in userCookie ? <UserDropdown /> : <GuestLogin />}
      </div>
    </Navbar>
  );
}

function UserDropdown() {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies<string>(["user"]);
  const userCookie: UserCookie = cookies.user || undefined;

  useEffect(() => {
    fetch(`/api/users/${userCookie.email}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userCookie.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data: User) => {
        return data;
      })
      .then((data) => {
        setUser({
          email: data.email,
          picture: data.picture,
        });
      })
      .catch((err) => console.log(err));
  }, [userCookie.email, userCookie.token]);

  function logOut(): void {
    removeCookie("user");
  }

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar alt="User settings" img="/src/assets/account.svg" rounded />
      }
    >
      <DropdownHeader>
        <span className="block truncate text-sm font-medium">
          {user?.email}
        </span>
      </DropdownHeader>
      <DropdownItem>Profile</DropdownItem>
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
