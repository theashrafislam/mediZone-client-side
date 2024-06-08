import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxoisPublic from '../../Hooks/useAxoisPublic';


const DiscountProducts = () => {
    const axoisPublic = useAxoisPublic();

    const { data: discountProducts = [] } = useQuery({
        queryKey: ['discountProducts'],
        queryFn: async () => {
            const res = await axoisPublic.get('/discountProducts');
            return res.data;
        }
    })

    return (
        <div className='my-20'>
            <div>
                <h3 className='text-3xl font-semibold text-center mb-8'>Discount products</h3>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        discountProducts.map(photo => <SwiperSlide className='border-2 rounded-xl p-5' key={photo._id}><img className='w-96 h-96' src={photo.image} alt="" /></SwiperSlide>)
                    }
                </div>
            </Swiper>
        </div>
    );
};

export default DiscountProducts;