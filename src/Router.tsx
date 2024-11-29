import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminDashboard from "./pages/protectedRoute/AdminDashboard";
import App from "./App";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "dashboard",
                element: <PrivateRoute> <AdminDashboard/> </PrivateRoute>
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    }
])