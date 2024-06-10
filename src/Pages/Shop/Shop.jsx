import { useQuery } from "@tanstack/react-query";
import useAxoisPublic from "../../Hooks/useAxoisPublic";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const Shop = () => {
    const axoisPublic = useAxoisPublic();
    const axiosSecure = useAxoisSecure();
    const { user } = useAuth();
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [ ,refetch] = useCart();

    const { data: allMedicines = [] } = useQuery({
        queryKey: ['allMedicines'],
        queryFn: async () => {
            const res = await axoisPublic.get('/all-medicines');
            return res.data;
        }
    });

    const handleEyeButton = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    useEffect(() => {
        if (modalOpen && selectedItem) {
            const modal = document.getElementById('my_modal_1');
            if (modal) {
                modal.showModal();
            }
        }
    }, [modalOpen, selectedItem]);

    const handleAddCart = (item) => {
        if (user && user.email) {
            const cartItem = {
                productId: item._id,
                email: user.email,
                medicineName: item.medicineName,
                price: item.price,
                company: item.company,
                genericName: item.genericName,
                category: item.category,
                description: item.description,
                image: item.image,
                sellerEmail: item.sellerEmail
            };
            axiosSecure.post('/carts', cartItem)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${item.medicineName}, Added to the cart.`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        } else {
            Swal.fire({
                title: "User Not Logged In",
                text: "If you want to add to the cart, please log in.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log In"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMedicines = allMedicines.filter((item) => {
        return (
            item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const sortedMedicines = [...filteredMedicines].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    return (
        <div className="my-12">
            <Helmet>
                <title>Shop || MediZone</title>
            </Helmet>
            <div className="text-center w-8/12 m-auto">
                <h1 className="text-3xl">Shop Our Medicines</h1>
                <p>Welcome to our shop! Browse detailed information on our medicines. Add your desired items to the cart for a seamless and convenient shopping experience.</p>
            </div>
            <div className="mt-6">
                <div className="mb-4 flex justify-between items-center mx-5">
                    <div>
                        <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700">Sort By Price:</label>
                        <select
                            id="sort-order"
                            value={sortOrder}
                            onChange={(e) => handleSortOrderChange(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
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
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMedicines.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.medicineName}</td>
                                    <td>{item.company}</td>
                                    <td>${item.price}</td>
                                    <td className='flex items-center justify-center gap-5'>
                                        <button onClick={() => handleAddCart(item)} className='btn'>Select</button>
                                        <button onClick={() => handleEyeButton(item)} className='btn'>Eye</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedItem && (
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <div className='flex items-center justify-center'>
                            <img className='w-52' src={selectedItem.image} alt="" />
                        </div>
                        <h3 className="text-lg"><span className='font-bold'>Medicine Name:</span> {selectedItem.medicineName}</h3>
                        <h3 className="text-lg"><span className='font-bold'>Category:</span> {selectedItem.category}</h3>
                        <h3 className="text-lg"><span className='font-bold'>Company:</span> {selectedItem.company}</h3>
                        <p className="py-2"><span className='font-bold'>Generic Name:</span> {selectedItem.genericName}</p>
                        <p className="py-2"><span className='font-bold'>Description:</span> {selectedItem.description}</p>
                        <p className="py-2"><span className='font-bold'>Price:</span> {selectedItem.price}</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Shop;