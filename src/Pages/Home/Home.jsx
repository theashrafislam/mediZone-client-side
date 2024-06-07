import Banner from "../../Component/Banner/Banner";
import CategoryCardSection from "../../Component/CategoryCardSection/CategoryCardSection";
import FaqSection from "../../Component/FAQSection/FaqSection";
import Testimonial from "../../Component/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <h1>This is home page</h1>
            <Banner/>
            <CategoryCardSection/>
            <FaqSection/>
            <Testimonial/>
        </div>
    );
};

export default Home;