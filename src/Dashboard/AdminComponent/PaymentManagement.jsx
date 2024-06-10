import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const PaymentManagement = () => {
    
    const axoisSecure = useAxoisSecure();
    const {data: payments = [], refetch} = useQuery({
        queryKey: ['payments'],
        queryFn: async () => axoisSecure.get('/all-payments').then(res => res.data)
    });

    const handleAccept = (id) => {
        axoisSecure.patch(`/payments/${id}`)
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment accepted successfully!",
                        showConfirmButton: false,
                        timer: 2000
                      });
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>Payment Management || MediZone</title>
            </Helmet>
            <div>
                <ShareHeader header={'Payment Management'} subHeader={'Track and manage all payment transactions. Approve pending payments and ensure smooth financial operations for your e-commerce platform.'} />
            </div>
            <div className="mt-8">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Email</th>
                                <th>Transaction IDs</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) => <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                    <td>{payment.status == 'Pending' ? <button onClick={() => handleAccept(payment._id)} className="btn block py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Accept Payment</button> : ''}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentManagement;