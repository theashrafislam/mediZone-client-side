import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UpdateProfilePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

    }

    return (
        <div className="flex justify-center items-center mt-5">
            <div className="w-full max-w-2xl p-8 space-y-3 rounded-xl bg-[#007bff] text-black">
                <h1 className="text-3xl font-bold text-center">Your Profile Information</h1>
                <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1 text-sm w-full">
                        <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                        <input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('username', { required: true })} />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className="space-y-1 text-sm w-full">
                        <select
                            className="select select-bordered w-full"
                            {...register('select', { required: 'This field is required' })}
                            defaultValue=""
                        >
                            <option value="" disabled>What do you want to be?</option>
                            <option value="User">User</option>
                            <option value="Seller">Seller</option>
                        </select>
                        {errors.select && <span>{errors.select.message}</span>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <input type="file" className="file-input w-full" {...register('image', { required: true })} />
                        {errors.image && <span>{errors.image.message}</span>}
                    </div>

                    <button className="block w-full p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfilePage;