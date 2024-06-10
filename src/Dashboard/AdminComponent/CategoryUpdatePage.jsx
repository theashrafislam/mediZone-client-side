import { useNavigate, useParams } from 'react-router-dom';
import ShareHeader from '../../Component/ShareHeader/ShareHeader';
import { useForm } from 'react-hook-form';
import useAxoisSecure from '../../Hooks/useAxoisSecure';
import Swal from 'sweetalert2';

const CategoryUpdatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axoisSecure = useAxoisSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const change = {
            categoryName: data.categoryName,
            categoryImage: data.categoryImage
        }
        axoisSecure.patch(`/categorys/${id}`, change)
            .then(res => {
                if(res.data.modifiedCount > 0){
                    reset()
                    navigate('/dashboard/manage-category')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
    }
    return (
        <div>
            <div>
                <ShareHeader header={'Update Category'} subHeader={'Fill out the form to update the selected category details. Ensure the category name and image URL are accurate to keep your inventory organized.'} />
            </div>
            <div>
                <form noValidate="" action="" className="space-y-6 bg-[#007bff] p-5 text-black" onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className='p-5'> */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="categoryName" className="block dark:text-gray-600">Category Name</label>
                            <input type="text" name="categoryName" id="categoryName" placeholder="Category Name" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('categoryName', { required: true })} />
                            {errors.categoryName && <span>{errors.categoryName.message}</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="categoryImage" className="block dark:text-gray-600">Category mage</label>
                            <input type="text" name="categoryImage" id="categoryImage" placeholder="Category Image URL" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('categoryImage', { required: true })} />
                            {errors.categoryImage && <span>{errors.categoryImage.message}</span>}
                        </div>
                        <button className="block w-full p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Update</button>
                    {/* </div> */}
                </form>
            </div>
        </div>
    );
};

export default CategoryUpdatePage;