import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../Component/ShareHeader/ShareHeader";
import useAxoisSecure from '../Hooks/useAxoisSecure';
import useAuth from "../Hooks/useAuth";

const SellerPaymentHistory = () => {

    const axoisSecure = useAxoisSecure();
    const { user } = useAuth();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axoisSecure.get(`/payment?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="overflow-x-auto">
            <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <div className="mb-6">
                    <ShareHeader header={'Payment History'} subHeader={'Track all your transactions, including paid and pending payments. Monitor your sales revenue and ensure accurate records of your earnings.'} />
                </div>
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SL No</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td className="px-3 py-4 border-b border-gray-200 bg-white text-xs">{index + 1}</td>
                                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{payment.transactionId}</td>
                                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">${payment.price}</td>
                                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{new Date(payment.data).toLocaleDateString()}</td>
                                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerPaymentHistory;
