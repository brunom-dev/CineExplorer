import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../components/Layout"

import { Home } from "../pages/Home"
import { MediaDetails } from '../pages/MediaDetails/index';

export const router = createBrowserRouter([
    {
        element: <Layout />,

        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/movie/:id",
                element: <MediaDetails />
            }

        ],
    }
])