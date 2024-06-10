import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import useAxoisSecure from "../../Hooks/useAxoisSecure";

const SalesReport = () => {
    const axiosSecure = useAxoisSecure();
    const { data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => axiosSecure.get('/all-payments').then(res => res.data)
    });
    console.log(sales);
    return (
        <div>
            <div>
                <ShareHeader header={'Sales Report'} subHeader={'View detailed sales data, filter by date range, and download reports in various formats. Analyze performance and make informed business decisions.'} />
            </div>
            <div className="mt-6">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Medicine Name</th>
                                <th>Seller Email</th>
                                <th>Buyer Email</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sales.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <ul>
                                            {item.medicineName.map((name, idx) => (
                                                <li key={idx}>{name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{item.sellerEmail[0]}</td>
                                    <td>{item.email}</td>
                                    <td>{new Date(item.data).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;