import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/mediZone-logo.png";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
    const { user, userLogOut } = useAuth();
    console.log(user);

    const handleLogOut = () => {
        userLogOut()
            .then(() => {
                toast.success('You have logged out successfully. See you next time!');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div className="navbar bg-gray-300 rounded-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/shop">Shop</NavLink></li>
                            <li><NavLink to="/cart"><FaShoppingCart className="text-gray-500 text-2xl" /></NavLink></li>
                        </ul>
                    </div>
                    <Link to="/" className="text-xl flex items-center gap-2 pl-4">
                        <img className="w-1/6" src={logo} alt="MediZone Logo" />
                        <h3 className="font-bold">MediZone</h3>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/shop">Shop</NavLink></li>
                        <li><NavLink to="/cart"><FaShoppingCart className="text-gray-500 text-2xl" /></NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end mr-4">
                        <button tabIndex={0} className="btn m-1">Language</button>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="font-semibold"><button>English</button></li>
                            <li className="font-semibold"><button>Bangla</button></li>
                        </ul>
                    </div>
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="font-semibold"><NavLink to="/update-profile">Update Profile</NavLink></li>
                                <li className="font-semibold"><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li className="font-semibold"><button onClick={handleLogOut}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end mr-4">
                            <button tabIndex={0} className="btn m-1">Join Us</button>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="font-semibold"><NavLink to="/signup">Sign Up</NavLink></li>
                                <li className="font-semibold"><NavLink to="/login">Login</NavLink></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Navbar;
