import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManagebannerAdvertise = () => {

    const axoisSecure = useAxoisSecure();
    const { data: advertisements = [], refetch } = useQuery({
        queryKey: ['advertisements'],
        queryFn: async () => axoisSecure.get('/advertisements').then(res => res.data)
    });

    console.log(advertisements);

    const handleReject = (id) => {
        const status = {
            status: 'Rejected'
        }
        axoisSecure.patch(`/advertisements/${id}`, status)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    axoisSecure.delete(`/slider/${id}`)
                        .then(res => {
                            console.log(res);
                            if(res.data.deletedCount > 0){
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Rejected successfully.",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                }
            })
    }

    const handleAdd = (item) => {
        const status = {
            status: 'Running'
        }
        const sliderData = {
            id: item._id,
            medicineName: item.medicineName,
            medicineImage: item.image,
            description: item.description
        }
        axoisSecure.patch(`/advertisements/${item._id}`, status)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    axoisSecure.post('/sliders', sliderData)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Add to the slider.",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>Manage Banner Advertisements || MediZone</title>
            </Helmet>
            <div>
                <ShareHeader header={'Manage Banner Advertisements'} subHeader={'Control homepage advertisements. Add or remove products from the slider, and ensure the most relevant products are prominently displayed to attract customers.'} />
            </div>
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
                                <th>Name and Description</th>
                                <th>Seller Email</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                advertisements.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-20">
                                                    <img className="w-full" src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.medicineName}</div>
                                                <div className="text-sm opacity-50">{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.sellerEmail}
                                    </td>
                                    <td>
                                        {item.status == 'Running' && 'Running'}
                                        {item.status == 'Rejected' && 'Rejected'}
                                    </td>
                                    {/* <td>Purple</td> */}
                                    <th className="flex justify-center items-center ">
                                        <button onClick={() => handleAdd(item)} className="btn block  bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Add</button>

                                        <button onClick={() => handleReject(item._id)} className="btn block bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Reject</button>
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

export default ManagebannerAdvertise;