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
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

interface User {
  email: string;
  picture: string;
}

interface UserCookie {
  username: string;
  token: string;
}

export default function MainNavbar() {
  const [userCookie] = useCookies<string>(["user"]);

  return (
    <Navbar fluid rounded>
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
  const [cookies] = useCookies<string>(["user"]);
  const userCookie: UserCookie = cookies.user ? JSON.parse(cookies.user) : undefined;

  fetch("localhost:8080/user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userCookie.token
    }
  })

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar alt="User settings" img="/src/assets/account.svg" rounded />
      }
    >
      <DropdownHeader>
        <span className="block text-sm">Le Userinho</span>
        <span className="block truncate text-sm font-medium">
          name@pk.edu.pl
        </span>
      </DropdownHeader>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Sign out</DropdownItem>
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
