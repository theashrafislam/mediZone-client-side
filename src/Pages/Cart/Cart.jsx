import Swal from "sweetalert2";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";

const Cart = () => {

    const [carts, refetch] = useCart();
    const axoisSecure = useAxoisSecure();
    const { user } = useAuth();

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
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

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
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="my-12">
            <div className="w-8/12 m-auto text-center my-5">
                <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
                <p>Review the items in your cart before proceeding to checkout. You can update quantities, remove items, or continue shopping. When you're ready, click 'Checkout' to complete your purchase.</p>
            </div>
            <div className="flex justify-between items-center my-5">
                <button disabled={carts.length <= 0} onClick={handleAllClear} className="block btn p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Clear All </button>
                <Link to="/checkOutPage" className={carts.length === 0 ? 'pointer-events-none' : ''}>
                    <button disabled={carts.length <= 0} className="block btn p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Checkout
                    </button>
                </Link>
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
                            {
                                carts?.map((item, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item.medicineName}</td>
                                    <td>{item.company}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item._id)} className="block w-full p-3 text-center btn rounded-md font-bold hover:bg-black hover:text-white bg-white">Remove</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;