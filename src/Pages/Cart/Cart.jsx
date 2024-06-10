import Swal from "sweetalert2";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
    const [carts, refetch] = useCart();
    const totalPrice = carts.reduce((total, currentValue) => total + currentValue.price, 0);
    const axoisSecure = useAxoisSecure();
    const { user } = useAuth();
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleDeleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axoisSecure.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleAllClear = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete all!"
        }).then((result) => {
            if (result.isConfirmed) {
                axoisSecure.delete(`/cart/${user.email}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "All items have been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCarts = carts.filter((item) => {
        return (
            item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.company.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const sortedCarts = [...filteredCarts].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedCarts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCarts.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="my-12">
            <div className="w-8/12 m-auto text-center my-5">
                <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
                <p>Review the items in your cart before proceeding to checkout. You can update quantities, remove items, or continue shopping. When you're ready, click 'Checkout' to complete your purchase.</p>
            </div>
            <div className="flex justify-evenly items-center border-b-2 pb-2">
                <h3 className="text-3xl">Total Product: {carts.length}</h3>
                <h3 className="text-3xl">Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
            <div className="flex justify-between items-center my-5">
                <button disabled={carts.length <= 0} onClick={handleAllClear} className="block btn p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Clear All </button>
                <Link to="/payment" className={carts.length === 0 ? 'pointer-events-none' : ''}>
                    <button disabled={carts.length <= 0} className="block btn p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Checkout</button>
                </Link>
            </div>
            <div className="mb-4 flex justify-between items-center mx-5">
                <div>
                    <label htmlFor="search-query" className="block text-sm font-medium text-gray-700">Search:</label>
                    <input
                        type="text"
                        id="search-query"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name, company, etc."
                        className="mt-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mr-2">Sort By Price:</label>
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => handleSortOrderChange(e.target.value)}
                        className="mt-1 block pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Medicine Name</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <th>{index + 1 + indexOfFirstItem}</th>
                                    <td>{item.medicineName}</td>
                                    <td>{item.company}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item._id)} className="block w-full p-3 text-center btn rounded-md font-bold hover:bg-black hover:text-white bg-white">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-center">
                    <nav className="inline-flex">
                        <ul className="flex pl-0 rounded list-none flex-wrap">
                            {[...Array(totalPages)].map((_, pageIndex) => (
                                <li key={pageIndex} className={`page-item ${currentPage === pageIndex + 1 ? 'active' : ''}`}>
                                    <button onClick={() => handlePageChange(pageIndex + 1)} className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                                        {pageIndex + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Cart;