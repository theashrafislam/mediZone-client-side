import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../Component/ShareHeader/ShareHeader";
import useAxoisPublic from "../Hooks/useAxoisPublic";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxoisSecure from "../Hooks/useAxoisSecure";
import Swal from "sweetalert2";

const ManageMedicines = () => {
    const axiosPublic = useAxoisPublic();
    const axiosSecure = useAxoisSecure();
    const { user } = useAuth();
    const { data: allMedicines = [], refetch } = useQuery({
        queryKey: ['all-medicines'],
        queryFn: () => axiosSecure.get(`/all-medicines/${user?.email}`).then(res => res.data)
    });

    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        if (!data.discountPercentage) {
            data.discountPercentage = 0;
        }
        data.price = parseFloat(data.price);

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(img_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const medicine = {
            sellerEmail: user?.email,
            image: res.data.data.display_url,
            description: data.description,
            price: data.price,
            company: data.company,
            genericName: data.genericName,
            medicineName: data.medicineName,
            category: data.select
        }

        if (res.data.success) {
            axiosSecure.post('/all-medicines', medicine)
                .then(res => {
                    if (res.data.insertedId) {
                        reset()
                        refetch()
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Medicine added successfully.",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }

                })
        }
    }
    return (
        <div>
            <div>
                <ShareHeader header={'Medicine Management'} subHeader={'Efficiently add, update, and organize your medicinal inventory. Stay in control of your product listings with our intuitive management features.'} />
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn block mt-3 w-40 mx-auto py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Medicine</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-xl bg-[#007bff] text-black">
                    <h3 className="font-bold text-lg text-center mb-4">Fill out the form below to add a new medicine to your inventory!</h3>

                    {/* form  */}
                    <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex items-center gap-4'>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="medicineName" className="block dark:text-gray-600">Medicine Name</label>
                                <input type="text" name="medicineName" id="medicineName" placeholder="Medicine Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('medicineName', { required: true })} />
                                {errors.medicineName && <span>{errors.medicineName.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="genericName" className="block dark:text-gray-600">Generic Name</label>
                                <input type="text" name="genericName" id="genericName" placeholder="Generic Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('genericName', { required: true })} />
                                {errors.genericName && <span>{errors.genericName.message}</span>}
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="description" className="block dark:text-gray-600">Discount Percentage</label>
                                <input type="number" name="discountPercentage" id="discountPercentage" placeholder="Discount Percentage" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('discountPercentage')} />
                                {errors.discountPercentage && <span>{errors.discountPercentage.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="description" className="block dark:text-gray-600">Category Selection</label>
                                <select
                                    className="select select-bordered w-full"
                                    {...register('select', { required: 'This field is required' })}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Category Selection</option>
                                    <option value="Capsule">Capsule</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Injection">Injection</option>
                                    <option value="Suppositories">Suppositories</option>
                                    <option value="Syrup">Syrup</option>
                                    <option value="Ointment">Ointment</option>
                                </select>
                                {errors.select && <span>{errors.select.message}</span>}
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="company" className="block dark:text-gray-600">Company</label>
                                <input type="text" name="company" id="company" placeholder="Company" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('company', { required: true })} />
                                {errors.company && <span>{errors.company.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm w-full">
                                <label htmlFor="price" className="block dark:text-gray-600">Price</label>
                                <input type="number" name="price" id="price" placeholder="Price" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('price', { required: true })} />
                                {errors.price && <span>{errors.price.message}</span>}
                            </div>
                        </div>
                        <div className="space-y-1 text-sm w-full">
                            <label htmlFor="description" className="block dark:text-gray-600">Description</label>
                            <input type="text" name="description" id="description" placeholder="Description" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('description', { required: true })} />
                            {errors.description && <span>{errors.description.message}</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <input type="file" className="file-input w-full" {...register('image', { required: true })} />
                            {errors.image && <span>{errors.image.message}</span>}
                        </div>

                        <button className="block w-full p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Add Medicine</button>
                    </form>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div>
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
                                <th>Medicine Name</th>
                                <th>Company Name</th>
                                <th>Price</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allMedicines?.map((medicine, index) => <tr key={medicine._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={medicine.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{medicine.medicineName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {medicine.company}
                                    </td>
                                    <td>${medicine.price}</td>
                                    <th className="font-normal">
                                        {medicine.category}
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

export default ManageMedicines;