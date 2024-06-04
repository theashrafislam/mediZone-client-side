import { FaShoppingCart } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logo from '../../../public/mediZone-logo.png';

const notLoggedNavlinks = <>
    <li className="font-semibold"><NavLink to="/">Home</NavLink></li>
    <li className="font-semibold"><NavLink to="/shop">Shop</NavLink></li>
    <li className="font-semibold"><NavLink to="/cart"><FaShoppingCart className="text-gray-500 text-2xl" /></NavLink></li>
    <li className="font-semibold"><NavLink to="/signup">Join Us</NavLink></li>
    <li className="font-semibold"><NavLink to="/signup">Join Us</NavLink></li>
    <li className="font-semibold"><NavLink to="/login">Login</NavLink></li>


</>

const Navbar = () => {
    return (
        <div className="navbar bg-gray-100 rounded-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {notLoggedNavlinks}
                    </ul>
                </div>
                <Link to='/' className="text-xl flex items-center gap-2 pl-4">
                    <img className="w-1/6" src={logo} alt="" />
                    <h3 className="font-bold">MediZone</h3>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="font-semibold"><NavLink to="/">Home</NavLink></li>
                    <li className="font-semibold"><NavLink to="/shop">Shop</NavLink></li>
                    <li className="font-semibold"><NavLink to="/cart"><FaShoppingCart className="text-gray-500 text-2xl" /></NavLink></li>
                    <li className="font-semibold"><NavLink to="/signup">Join Us</NavLink></li>
                    {/* <li className="font-semibold"><NavLink to="/signup">Join Us</NavLink></li> */}
                    <li className="font-semibold"><NavLink to="/login">Login</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                {/* <div>
                    {user ? <div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li><Link to="/my-profile">My Profile</Link></li>
                                <li><Link to="/my-attemted-assignments">My Attempted Assignments</Link></li>
                                <li onClick={handleLogOutUser}><a>Logout</a></li>
                            </ul>
                        </div>
                    </div> : ''}
                </div> */}
                <div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1"><MdWbSunny className="text-3xl" /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <li onClick={() => handleThemeChange('dark')}><a>Dark</a></li>
                            <li onClick={() => handleThemeChange('light')}><a>Light</a></li>
                            <li onClick={() => handleThemeChange('system')}><a>System</a></li> */}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;