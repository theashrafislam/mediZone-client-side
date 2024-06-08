import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Cart/Cart";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import PrivateRouter from "./PrivateRouter";
import UpdateProfilePage from "../Pages/UpdateProfilePage/UpdateProfilePage";
import CategoryDetails from "../Pages/CategoryDetails/CategoryDetails";
import CheckOutPage from "../Pages/CheckOutPage/CheckOutPage";
import Payment from "../Pages/CheckOutPage/Payment";
import InvoicePage from "../Pages/InvoicePage/InvoicePage";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage/>,
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: "/shop",
                element: <Shop/>
            },
            {
                path: "/cart",
                element: <PrivateRouter><Cart/></PrivateRouter>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: "/update-profile",
                element: <PrivateRouter><UpdateProfile/></PrivateRouter>
            },
            {
                path: "/update-profile-page",
                element: <PrivateRouter><UpdateProfilePage/></PrivateRouter>
            },
            {
                path: "/category-details/:id",
                element: <CategoryDetails/>
            },
            {
                path: "/payment",
                element: <PrivateRouter><Payment/></PrivateRouter>
            },
            {
                path: '/invoicePage',
                element: <PrivateRouter><InvoicePage/></PrivateRouter>
            }
        ]
    },
]);