// import img1 from '../assets/BannerImages/image1.jpg';
// import img2 from '../assets/BannerImages/image2.jpeg';
// import img3 from '../assets/BannerImages/image3.jpeg';
// import img4 from '../assets/BannerImages/image4.jpg';
// import img5 from '../assets/BannerImages/image5.jpg';
// import img6 from '../assets/BannerImages/image6.jpg';

import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import useAxoisPublic from '../../Hooks/useAxoisPublic';


const Banner = () => {

    const axoisPublic = useAxoisPublic();

    const { data: sliders = [] } = useQuery({
        queryKey: ['slider'],
        queryFn: async () => {
            const res = await axoisPublic.get('/sliders');
            return res.data;
        }
    });


    return (
        <div className=''>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                {
                    sliders.map(slider => <SwiperSlide className='border-2 rounded-2xl' key={slider._id}><img className='h-full' src={slider.medicineImage} alt="" /></SwiperSlide>)
                }
                
            </Swiper>
        </div>
    );
};

export default Banner;