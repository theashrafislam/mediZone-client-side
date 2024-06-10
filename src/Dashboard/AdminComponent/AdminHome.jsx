import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
    const axoisSecure = useAxoisSecure();

    const { data: allPayments = [] } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => axoisSecure.get('/all-payments').then(res => res.data)
    })

    const paidTotal = allPayments.filter(item => item.status === 'Paid').reduce((sum, item) => sum + item.price, 0);
    const pendingTotal = allPayments.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.price, 0);
    return (
        <div>
            <Helmet>
                <title>Dashboard Home|| MediZone</title>
            </Helmet>
            <div>
                <ShareHeader header={'Dashboard Overview'} subHeader={'Monitor total sales revenue, manage users and categories, handle payments, and oversee advertisements. Your central hub for maintaining a thriving e-commerce platform.'} />
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

export default AdminHome;