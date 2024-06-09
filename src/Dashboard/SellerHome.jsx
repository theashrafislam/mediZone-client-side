import React from 'react';
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
            <ShareHeader 
                header={'Welcome to Your Dashboard'} 
                subHeader={'Manage your medicines, track sales, request advertisements, and monitor payments. Your essential tools for running an efficient and successful online pharmacy store.'} 
            />
            <div>
                <h2>Total Sales Revenue</h2>
                <p><strong>Paid Total:</strong> ${paidTotal}</p>
                <p><strong>Pending Total:</strong> ${pendingTotal}</p>
            </div>
        </div>
    );
};

export default SellerHome;
