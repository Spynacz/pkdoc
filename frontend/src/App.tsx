import { Flowbite } from "flowbite-react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import { UserProvider } from "./UserContext";

export default function App(): ReactElement {
  return (
    <div className="flex min-h-screen flex-col">
      <Flowbite>
        <UserProvider>
          <MainNavbar />
          <div className="flex flex-grow">
            <Outlet />
          </div>
          </UserProvider>
      </Flowbite>
    </div>
  );
}
