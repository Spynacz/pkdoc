import React from "react";
import {CookiesProvider} from "react-cookie";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router";
import App from "./App.tsx";
import Create from "./Create.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Home from "./Home.tsx";
import "./index.css";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import UserProfile from "./UserProfile.tsx";

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
