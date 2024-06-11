import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../Hooks/useAxoisSecure";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const axiosSecure = useAxoisSecure();
    const { user } = useAuth();

    const { data: paymentHistory = [] } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    console.log(paymentHistory);

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg">
            <Helmet>
                <title>Payment History || MediZone</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Transaction ID</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.length > 0 ? (
                            paymentHistory.map((payment) => (
                                <tr key={payment.transactionId}>
                                    <td className="py-2 px-4 border">{payment.transactionId}</td>
                                    <td className="py-2 px-4 border">{new Date(payment.data).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</td>
                                    <td className="py-2 px-4 border">${payment.price.toFixed(2)}</td>
                                    <td className="py-2 px-4 border">{payment.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="py-2 px-4 border" colSpan="4">No payment history available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;