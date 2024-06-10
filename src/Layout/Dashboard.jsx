import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { IoHome, IoHomeSharp } from "react-icons/io5";
import { MdCategory, MdOutlinePayment, MdOutlinePayments, MdPayment } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxoisSecure from "../Hooks/useAxoisSecure";
import { TbMedicineSyrup, TbReportAnalytics } from "react-icons/tb";
import { RiAdvertisementFill, RiAdvertisementLine } from "react-icons/ri";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const { user } = useAuth();
    const axoisSecure = useAxoisSecure();

    const { data: users = {} } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axoisSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });


    const isUser = users.userRole === 'User';
    const isSeller = users.userRole === 'Seller';
    const isAdmin = users.userRole === 'Admin';

    // console.log(isAdmin, isSeller, isUser);


    return (
        <div className="flex">
            <Helmet>
                <title>Dashboard || MediZone</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#007bff] text-white">

                <ul className="menu p-4">
                    <h2 className="text-center text-2xl font-bold">Dashboard</h2>
                    <div className="divider"></div>
                    {
                        isUser ? <>
                            <li><NavLink to="/dashboard/payment-history"><MdOutlinePayment className="text-2xl" />Payment History</NavLink></li>
                        </> : <> </>
                    }
                    {
                        isSeller ? <>
                            <li><NavLink to="/dashboard/seller-home"><IoHomeSharp className="text-2xl" />Home page</NavLink></li>
                            <li><NavLink to="/dashboard/manage-medicines"><TbMedicineSyrup className="text-2xl" />Manage Medicines</NavLink></li>
                            <li><NavLink to="/dashboard/seller-payment-history"><MdPayment className="text-2xl" />Payment History</NavLink></li>
                            <li><NavLink to="/dashboard/ask-for-advertisement"><RiAdvertisementLine className="text-2xl" />Ask For Advertisement</NavLink></li>
                        </> : <> </>
                    }
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/admin-home"><IoHome className="text-2xl" />Home Page</NavLink></li>
                            <li><NavLink to="/dashboard/manage-users"><FaUsers className="text-2xl" />Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/manage-category"><MdCategory className="text-2xl" />Manage Category</NavLink></li>
                            <li><NavLink to="/dashboard/payment-management"><MdOutlinePayments className="text-2xl" />Payment management</NavLink></li>
                            <li><NavLink to="/dashboard/sales-report"><TbReportAnalytics className="text-2xl" />Sales Report</NavLink></li>
                            <li><NavLink to="/dashboard/manage-banner-advertisements"><RiAdvertisementFill className="text-2xl" />Manage Banner Advertisements</NavLink></li>
                        </> : <> </>
                    }

                    <div className="divider"></div>

                    {/* shareed nav links */}

                    <li><NavLink to="/"><IoHomeSharp className="text-2xl" />Home</NavLink></li>
                    <li><NavLink to="/shop"><GiShoppingBag className="text-2xl" />Shop</NavLink></li>
                    <li><NavLink to="/cart"><FaShoppingCart className="text-2xl" />Carts</NavLink></li>
                    {/* <li><NavLink to="/contact"><IoMdContact className="text-2xl" />Contact</NavLink></li> */}
                </ul>
            </div>
            {/* dashboard content  */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;