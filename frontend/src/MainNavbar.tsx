"use client";

import { Navbar } from "flowbite-react";

export default function MainNavbar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="#">
        <img
          src="/src/assets/favicon.svg"
          className="mr-3 h-6 sm:h-9"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        PKDoc
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Sign In</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
