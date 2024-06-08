import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-361px)]'>
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );
};

export default Root;