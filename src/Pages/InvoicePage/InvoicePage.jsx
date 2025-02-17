import { useQuery } from '@tanstack/react-query';
import logo from '../../../public/mediZone-logo.png';
import useAuth from '../../Hooks/useAuth';
import useAxoisSecure from '../../Hooks/useAxoisSecure';
import useCart from '../../Hooks/useCart';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const InvoicePage = () => {
    const { user } = useAuth();
    const axoisSecure = useAxoisSecure();
    const printRef = useRef(null);

    const { data: users = {}, isLoading: isUserLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axoisSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });
    const [carts, refetch] = useCart();

    const handlePrint = () => {
        axoisSecure.delete(`/cart/${user.email}`)
            .then(res => {

                if (res.data.deletedCount > 0) {
                    refetch()
                    const printContent = printRef.current.innerHTML;
                    const originalContents = document.body.innerHTML;
                    document.body.innerHTML = printContent;
                    window.print();
                    document.body.innerHTML = originalContents;
                }
            })

    };

    const calculateTotal = () => {
        return carts.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    if (isUserLoading) {
        return <div className='flex justify-center items-center mt-10'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg">
            <Helmet>
                <title>Your Invoice || MediZone</title>
            </Helmet>
            <div className='border-2 p-3' ref={printRef}>
                <header className="text-center mb-8">
                    <img src={logo} alt="Website Logo" className="w-32 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Your Invoice</h1>
                </header>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
                    <p className="mb-2"><strong>Name:</strong> {users.displayName}</p>
                    <p><strong>Email:</strong> {users.email}</p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Purchase Information</h2>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Medicine Name</th>
                                <th className="py-2 px-4 border">Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.length > 0 ? (
                                carts.map((item) => (
                                    <tr key={item._id}>
                                        <td className="py-2 px-4 border">{item.medicineName}</td>
                                        <td className="py-2 px-4 border">${item.price.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="py-2 px-4 border" colSpan="2">No items in cart</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
                {carts.length > 0 && (
                    <div className="text-right mt-4">
                        <h3 className="text-xl font-semibold">Total: ${calculateTotal()}</h3>
                    </div>
                )}
            </div>
            <button
                onClick={handlePrint}
                className="block mt-3 w-32 mx-auto py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
            >
                Print
            </button>
        </div>
    );
};

export default InvoicePage;
