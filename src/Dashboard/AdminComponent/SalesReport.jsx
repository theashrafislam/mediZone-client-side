import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import { useState } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Helmet } from "react-helmet-async";

const SalesReport = () => {
    const axiosSecure = useAxoisSecure();
    const { data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => axiosSecure.get('/all-payments').then(res => res.data)
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    const filteredSales = sales.filter((item) => {
        const saleDate = new Date(item.data);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) {
            return saleDate >= start && saleDate <= end;
        } else if (start) {
            return saleDate >= start;
        } else if (end) {
            return saleDate <= end;
        } else {
            return true;
        }
    });

    return (
        <div>
            <Helmet>
                <title>Sales Report || MediZone</title>
            </Helmet>
            <div>
                <ShareHeader header={'Sales Report'} subHeader={'View detailed sales data, filter by date range, and download reports in various formats. Analyze performance and make informed business decisions.'} />
            </div>
            <div className="mt-6">
                <div className="mb-4 flex justify-between">
                    <div>
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="mt-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date:</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="mt-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <DownloadTableExcel
                        filename="sales_report"
                        sheet="sales"
                        currentTableRef={document.getElementById('sales-table')}
                    >
                        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Export to Excel</button>
                    </DownloadTableExcel>
                </div>
                <div className="overflow-x-auto">
                    <table id="sales-table" className="table">
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
                            {filteredSales.map((item, index) => (
                                <tr key={item._id}>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;
