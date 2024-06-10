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
import Dashboard from "../Layout/Dashboard";
import PaymentHistory from "../Dashboard/PaymentHistory";
import SellerHome from "../Dashboard/SellerHome";
import ManageMedicines from "../Dashboard/ManageMedicines";
import SellerPaymentHistory from "../Dashboard/SellerPaymentHistory";
import AskForAdvertisement from "../Dashboard/AskForAdvertisement";
import AdminHome from "../Dashboard/AdminComponent/AdminHome";
import ManageUsers from "../Dashboard/AdminComponent/ManageUsers";
import ManageCategory from "../Dashboard/AdminComponent/ManageCategory";
import PaymentManagement from "../Dashboard/AdminComponent/PaymentManagement";
import SalesReport from "../Dashboard/AdminComponent/SalesReport";
import ManagebannerAdvertise from "../Dashboard/AdminComponent/ManagebannerAdvertise";
import CategoryUpdatePage from "../Dashboard/AdminComponent/CategoryUpdatePage";
import AdminRouter from "./AdminRouter";

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
    {
        path: '/dashboard',
        element: <PrivateRouter><Dashboard/></PrivateRouter>,
        children: [

            // user router 
            
            {
                path: 'payment-history',
                element: <PaymentHistory/>
            },

            // seller router 

            {
                path: 'seller-home',
                element: <SellerHome/>
            },
            {
                path: 'manage-medicines',
                element: <ManageMedicines/>
            },
            {
                path: 'seller-payment-history',
                element: <SellerPaymentHistory/>
            },
            {
                path: 'ask-for-advertisement',
                element: <AskForAdvertisement/>
            },

            // admin router 
            {
                path: "admin-home",
                element: <AdminRouter><AdminHome/></AdminRouter>
            },
            {
                path: "manage-users",
                element: <AdminRouter><ManageUsers/></AdminRouter>
            },
            {
                path: "manage-category",
                element: <AdminRouter><ManageCategory/></AdminRouter>
            },
            {
                path: "payment-management",
                element: <AdminRouter><PaymentManagement/></AdminRouter>
            },
            {
                path: "sales-report",
                element: <AdminRouter><SalesReport/></AdminRouter>
            },
            {
                path: 'manage-banner-advertisements',
                element: <AdminRouter><ManagebannerAdvertise/></AdminRouter>
            },
            {
                path: 'category-update-page/:id',
                element: <AdminRouter><CategoryUpdatePage/></AdminRouter>
            }
        ]
    }
]);