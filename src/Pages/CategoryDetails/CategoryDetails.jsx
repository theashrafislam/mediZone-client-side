import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxoisPublic from '../../Hooks/useAxoisPublic';
import { useEffect, useState } from 'react';

const CategoryDetails = () => {

    const { id: category } = useParams();
    const axoisPublic = useAxoisPublic();
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    console.log(category);

    const { data: categoryData = [] } = useQuery({
        queryKey: ['categoryData'],
        queryFn: async () => {
            const res = await axoisPublic.get(`/medicines?category=${category}`);
            return res.data;
        }
    });

    console.log(selectedItem);

    const handleEyeButton = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    }

    useEffect(() => {
        if (modalOpen && selectedItem) {
            const modal = document.getElementById('my_modal_1');
            if (modal) {
                modal.showModal();
            }
        }
    }, [modalOpen, selectedItem]);

    return (
        <div className='mt-10'>
            <div className='w-8/12 m-auto text-center'>
                <h1 className='text-xl font-bold mb-3'>Medicine Category Overview</h1>
                <p>Explore treatments, pharmaceuticals, and healthcare trends. Informative resources empower informed health decisions for professionals and individuals alike.</p>
            </div>
            <div className='mt-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>company</th>
                                <th>Price</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoryData.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.medicineName}</td>
                                    <td>{item.company}</td>
                                    <td>${item.price}</td>
                                    <td className='flex items-center justify-center gap-5'>
                                        <button className='btn'>Select</button>
                                        <button onClick={() => handleEyeButton(item)} className='btn'>Eye</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                selectedItem && <dialog id="my_modal_1" className="modal">
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
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            }
        </div>
    );
};

export default CategoryDetails;