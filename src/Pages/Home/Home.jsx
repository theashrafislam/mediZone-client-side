import { Helmet } from "react-helmet-async";
import Banner from "../../Component/Banner/Banner";
import CategoryCardSection from "../../Component/CategoryCardSection/CategoryCardSection";
import DiscountProducts from "../../Component/DiscountProducts/DiscountProducts";
import FaqSection from "../../Component/FAQSection/FaqSection";
// import Footer from "../../Component/Footer/Footer";
import Testimonial from "../../Component/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || MediZone</title>
            </Helmet>
            <Banner className='mt-2'/>
            <CategoryCardSection/>
            <DiscountProducts/>
            <FaqSection/>
            <Testimonial/>
            {/* <Footer/> */}
        </div>
    );
};

export default Home;