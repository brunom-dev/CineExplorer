import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../components/Layout"

import { HomePage } from "../pages/Home"
import { MediaDetailsPage } from '../pages/MediaDetails/index';
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { VerifyEmailPage } from "../pages/VerifyEmail";

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
            },
            {
                path: "/verify-email",
                element: <VerifyEmailPage />
            }

        ],
    }
])