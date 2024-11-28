import React from "react";
import {CookiesProvider} from "react-cookie";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router";
import App from "./App.tsx";
import Login from "./components/User/Login.tsx";
import Register from "./components/User/Register.tsx";
import UserProfile from "./components/User/UserProfile.tsx";
import Create from "./Create.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Home from "./Home.tsx";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/profile",
                element: <UserProfile />
            },
            {
                path: "/create",
                element: <Create />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CookiesProvider defaultSetOptions={{path: "/"}}>
            <RouterProvider router={router} />
        </CookiesProvider>
    </React.StrictMode>
);
