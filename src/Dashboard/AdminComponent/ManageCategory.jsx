import { useForm } from "react-hook-form";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageCategory = () => {

    const axoisSecure = useAxoisSecure();
    const { data: allCategory = [], refetch } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => axoisSecure.get(`/categorys`).then(res => res.data)
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            categoryName: '',
            categoryImageurl: ''
        }
    });

    const onSubmit = (data) => {
        const category = {
            categoryImage: data.categoryImageurl,
            categoryName: data.categoryName,
            numberOfCategory: allCategory.length + 1

        }
        axoisSecure.post('/categorys', category)
            .then(res => {
                console.log(res);
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Category added successfully.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    };

    const handleDelete = (id) => {
        axoisSecure.delete(`/categorys/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Category delete successfully.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div>
            <div>
                <ShareHeader header={'Manage Categories'} subHeader={'Add, update, or delete medicine categories. Keep your inventory organized and ensure users can easily find the products they need.'} />
            </div>
            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn block mt-3 w-40 mx-auto py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Category</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-blue-500">
                        <h3 className="font-bold text-lg text-center text-white">Fill out the form to add a new category.</h3>

                        <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="categoryName" className="block dark:text-gray-600 font-semibold">Category Name</label>
                                <input
                                    type="text"
                                    name="categoryName"
                                    id="categoryName"
                                    placeholder="Category Name"
                                    className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                    {...register('categoryName', { required: true })}
                                />
                                {errors.categoryName && <span>{errors.categoryName.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="categoryImageurl" className="block dark:text-gray-600 font-semibold">Category Image URL</label>
                                <input
                                    type="text"
                                    name="categoryImageurl"
                                    id="categoryImageurl"
                                    placeholder="Category Image URL"
                                    className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                    {...register('categoryImageurl', { required: true })}
                                />
                                {errors.categoryImageurl && <span>{errors.categoryImageurl.message}</span>}
                            </div>
                            <button className="block w-full p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Add Category</button>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="mt-6">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Category Image</th>
                                <th>Category Name</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allCategory.map((category, index) => <tr key={category._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-36">
                                                    <img src={category.categoryImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {category.categoryName}
                                    </td>
                                    <th className="flex items-center gap-2 justify-center">
                                        <button className="btn block  py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700" onClick={() => handleDelete(category._id)}>Delete</button>
                                        
                                            <Link to={`/dashboard/category-update-page/${category._id}`}>
                                                <button className="btn block  py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Update</button>
                                            </Link>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCategory;
