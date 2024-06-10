
import { useForm } from "react-hook-form";
import ShareHeader from "../Component/ShareHeader/ShareHeader";
import useAxoisPublic from "../Hooks/useAxoisPublic";
import useAxoisSecure from "../Hooks/useAxoisSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AskForAdvertisement = () => {

    const { user } = useAuth();
    const axoisSecure = useAxoisSecure();
    const axoisPublic = useAxoisPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axoisPublic.post(img_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const image = res.data.data.display_url;
        data.image = image;
        const info = {
            medicineName: data.medicineName,
            description: data.description,
            image: image,
            status: 'Request',
            sellerEmail: user?.email
        }
        if (res.data.success) {
            refetch()
            axoisSecure.post('/advertisements', info)
                .then(res => {
                    refetch()
                    console.log(res);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Send you advertisement request.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
        }

    };

    const {data: advertisements = [], refetch} = useQuery({
        queryKey: ['advertisements'],
        queryFn: async () => axoisSecure.get(`/advertisement?email=${user.email}`).then(res => res.data)
    })

    console.log(advertisements);

    return (
        <div>
            <Helmet>
                <title>Ask for Advertisement || MediZone</title>
            </Helmet>
            <div>
                <ShareHeader header={'Ask for Advertisement'} subHeader={'Promote your medicines by requesting an advertisement placement on the homepage slider. Fill out the details below to get started.'} />
            </div>
            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn block mt-3 w-40 mx-auto py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Advertise</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-[#007bff] text-white">
                        <div className="mb-5">
                            <h3 className="font-bold text-lg text-center">Fill out the details below to get started.!</h3>
                        </div>

                        <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="description" className="block dark:text-gray-600">Description</label>
                                <input type="text" name="description" id="description" placeholder="Description" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 text-black dark:text-gray-800 focus:dark:border-violet-600" {...register('description', { required: true })} />
                                {errors.description && <span>{errors.description.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="medicineName" className="block dark:text-gray-600">Medicine Name</label>
                                <input type="text" name="medicineName" id="medicineName" placeholder="Medicine Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 text-black dark:text-gray-800 focus:dark:border-violet-600" {...register('medicineName', { required: true })} />
                                {errors.medicineName && <span>{errors.medicineName.message}</span>}
                            </div>
                            <div className="space-y-1 text-sm">
                                <input type="file" className="file-input w-full text-black" {...register('image', { required: true })} />
                                {errors.image && <span>{errors.image.message}</span>}
                            </div>
                            <div>
                                <button className="block w-full text-black p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Add Advertise</button>
                            </div>
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
                                <th>Photo</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                advertisements?.map(item => <tr key={item._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-36">
                                                    <img className="w-full" src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            {/* <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div> */}
                                        </div>
                                    </td>
                                    <td>
                                        {item.description}
                                    </td>
                                    <td className="text-lg font-semibold">{item.status}</td>
                                    
                                </tr>)
                            }
                            
                            
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AskForAdvertisement;