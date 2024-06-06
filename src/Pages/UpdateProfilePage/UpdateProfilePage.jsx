import { useForm } from "react-hook-form";
import useAxoisPublic from "../../Hooks/useAxoisPublic";
import useAuth from "../../Hooks/useAuth";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const UpdateProfilePage = () => {
    const { updateUserProfile, user } = useAuth();
    const axoisSecure = useAxoisSecure();

    const { data: userData = [], refetch, isLoading } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axoisSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });
    // console.log(userData);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axoisPublic = useAxoisPublic();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    useEffect(() => {

    })
    useEffect(() => {
        if (userData) {
            reset({
                username: userData.displayName || '',
                select: userData.userRole || ''
            });
        }
    }, [userData, reset])

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axoisPublic.post(img_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const displayName = data.username;
        const image = res.data.data.display_url;
        console.log(displayName, image);

        updateUserProfile(displayName, image)
            .then(() => {
                console.log('user profile update done');
                const userData = {
                    displayName: displayName,
                    userRole: data.select,
                    image: image
                }
                axoisSecure.patch(`/users/${user?.email}`, userData)
                    .then(res => {
                        refetch()
                        console.log('database responce', res);
                    })
            })
            .catch(error => console.log(error))
    }

    if (isLoading) {
        return <div className='flex justify-center items-center mt-10'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        <div className="flex justify-center items-center mt-5">
            <div className="w-full max-w-2xl p-8 space-y-3 rounded-xl bg-[#007bff] text-black">
                <h1 className="text-3xl font-bold text-center">Update Your Profile</h1>
                <h1 className="text-lg text-center">Welcome to your profile update page! Keeping your profile information current ensures you get the best personalized experience.</h1>
                <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1 text-sm w-full">
                        <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                        <input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('username', { required: true })} defaultValue={userData?.displayName} />
                        {errors.username && <span>{errors.username.message}</span>}
                    </div>
                    <div className="space-y-1 text-sm w-full">
                        <select
                            className="select select-bordered w-full"
                            {...register('select', { required: 'This field is required' })}
                            defaultValue={userData?.userRole}
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