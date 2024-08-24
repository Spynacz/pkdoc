import { Flowbite } from "flowbite-react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "./MainNavbar";

export default function App(): ReactElement {
  return (
    <>
      <Flowbite>
        <MainNavbar />
        <Outlet />
      </Flowbite>
    </>
  );
}
