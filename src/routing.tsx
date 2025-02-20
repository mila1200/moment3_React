import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManageProductsPage from "./pages/ManageProductsPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProductPage from "./pages/UpdateProductPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/manageproducts",
                element: (
                    <ProtectedRoute>
                        <ManageProductsPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/manageproducts/:id",
                element: (
                    <ProtectedRoute>
                        <UpdateProductPage />
                    </ProtectedRoute>
                )
            }
        ]
    }
])

export default router;