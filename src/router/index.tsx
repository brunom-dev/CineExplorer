import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../components/Layout"

import { HomePage } from "../pages/Home"
import { MediaDetailsPage } from '../pages/MediaDetails/index';
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

export const router = createBrowserRouter([
    {
        element: <Layout />,

        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/movie/:id",
                element: <MediaDetailsPage />
            },
            {
                path: "/tv/:id",
                element: <MediaDetailsPage />
            }, 
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/signup",
                element: <RegisterPage />
            }

        ],
    }
])