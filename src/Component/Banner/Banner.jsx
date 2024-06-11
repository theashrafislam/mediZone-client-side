import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../public/IMG-20231023-WA0137.webp"
import useAxoisPublic from "../../Hooks/useAxoisPublic";
import { useQuery } from "@tanstack/react-query";


const Banner = () => {
    const axoisPublic = useAxoisPublic();

    const { data: sliders = [] } = useQuery({
        queryKey: ['slider'],
        queryFn: async () => {
            const res = await axoisPublic.get('/sliders');
            return res.data;
        }
    });
    console.log(sliders);
    return (
        <Carousel>
            {
                sliders.map(banner => <div key={banner._id}>
                    <img className="max-h-screen" src={banner.medicineImage} />
                </div>)
            }
        </Carousel>
    );
};

export default Banner;