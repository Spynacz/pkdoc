import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import { useCookies } from "react-cookie";

export default function MainNavbar() {
  const [cookies] = useCookies(["user"]);

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
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
        {"user" in cookies ? <UserDropdown /> : <GuestDropdown />}
      </div>
    </Navbar>
  );
}

function UserDropdown() {
  

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

function GuestDropdown() {
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
