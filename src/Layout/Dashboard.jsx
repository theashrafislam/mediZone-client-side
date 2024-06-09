import { FaBook, FaCalendarAlt, FaCartPlus, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdContact, IoMdMenu } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlinePayment, MdOutlineReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const isAdmin = false;
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#D1A054]">

                <ul className="menu p-4">
                    <h2 className="text-center text-2xl font-bold">Dashboard</h2>
                    <div className="divider"></div>
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/admin-home"><IoHomeSharp className="text-2xl" />Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/add-items"><FaUtensils className="text-2xl" />Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manage-items"><FaList className="text-2xl" />Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/manage-bookings"><FaBook className="text-2xl" />Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/all-users"><FaUsers className="text-2xl" />All Users</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to="/dashboard/user-home"><IoHomeSharp className="text-2xl" />User Home</NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaCalendarAlt className="text-2xl" />Reservation</NavLink></li>
                                {/* <li><NavLink to="/dashboard/cart"><FaCartPlus className="text-2xl" />My Cart ({cart?.length > 0 ? cart.length : '0'})</NavLink></li> */}
                                <li><NavLink to="/dashboard/payment-history"><MdOutlinePayment className="text-2xl" />Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/review"><MdOutlineReviews className="text-2xl" />Add Review</NavLink></li>
                                <li><NavLink to="/dashboard/booking"><TbBrandBooking className="text-2xl" />My Booking</NavLink></li>
                            </>
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