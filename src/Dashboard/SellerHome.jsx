import { useQuery } from '@tanstack/react-query';
import ShareHeader from '../Component/ShareHeader/ShareHeader';
import useAxoisSecure from '../Hooks/useAxoisSecure';
import useAuth from '../Hooks/useAuth';

const SellerHome = () => {
    const axoisSecure = useAxoisSecure();
    const { user } = useAuth();

    const { data: payment = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => axoisSecure.get(`/payment?email=${user.email}`).then(res => res.data)
    });

    const paidTotal = payment.filter(item => item.status === 'Paid').reduce((sum, item) => sum + item.price, 0);
    const pendingTotal = payment.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <div className='mb-6'>
                <ShareHeader
                    header={'Welcome to Your Dashboard'}
                    subHeader={'Manage your medicines, track sales, request advertisements, and monitor payments. Your essential tools for running an efficient and successful online pharmacy store.'}
                />
            </div>
            <div>
                <h2 className='text-center text-3xl font-bold mb-5 border-b-2 pb-2'>Total Sales Revenue</h2>
                <div className='flex justify-evenly items-center'>
                    <p className='text-2xl'><strong>Paid Total:</strong> ${paidTotal}</p>
                    <p className='text-2xl'><strong>Pending Total:</strong> ${pendingTotal}</p>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
