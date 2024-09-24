import { Flowbite } from "flowbite-react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./UserContext";
import MainNavbar from "./MainNavbar";

export default function App(): ReactElement {
  return (
    <div className="flex h-screen flex-col bg-white dark:bg-gray-700">
      <Flowbite>
        <UserProvider>
          <MainNavbar />
          <Outlet />
        </UserProvider>
      </Flowbite>
    </div>
  );
}
