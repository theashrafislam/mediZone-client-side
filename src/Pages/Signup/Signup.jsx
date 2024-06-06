import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import useAxoisPublic from '../../Hooks/useAxoisPublic';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';


const Signup = () => {
    const { userLogOut, loginUsingGoogle } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axoisPublic = useAxoisPublic();
    const { createUserEmailPass, updateUserProfile } = useAuth();
    const navigate = useNavigate()

    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const onSubmit = async (data) => {
        const password = data.password;

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }

        const imageFile = { image: data.image[0] }
        const res = await axoisPublic.post(img_hosting_url, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const displayName = data.username;
        const image = res.data.data.display_url;

        const userData = {
            displayName: data.username,
            email: data.email,
            password: password,
            userRole: data.select,
            image: res.data.data.display_url
        }

        if (res.data.success) {
            createUserEmailPass(data.email, data.password)
                .then(() => {
                    updateUserProfile(displayName, image)
                        .then(() => {
                            axoisPublic.post('/users', userData)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        reset()
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "User Create Successfully.",
                                            showConfirmButton: false,
                                            timer: 2000
                                        });
                                        userLogOut()
                                            .then(() => {
                                                navigate('/login');
                                            })
                                            .catch(error => console.log(error))
                                    }
                                })
                        })
                        .catch(error => console.log(error))

                })
                .catch(error => console.log(error))
        }
    };

    const handleGoogle = () => {
        loginUsingGoogle()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    image: res.user.photoURL,
                    email: res.user.email,
                    displayName: res.user.displayName,
                    userRole: 'User'
                }
                axoisPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            navigate('/')
                            toast.success("Great to see you again! You've logged in successfully.");
                        }
                    })
                    .catch(error => {
                        if (error.response.status == 409) {
                            toast.success("Great to see you again! You've logged in successfully.");
                            navigate('/')
                        }
                    })

            })
            .catch(error => console.log(error))
    }

    return (
        <div className="flex justify-center items-center my-5">
            <Helmet>
                <title>Sing Up || MediZone</title>
            </Helmet>
            <div className="w-full max-w-2xl p-8 space-y-3 rounded-xl bg-[#007bff] text-black">
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-4'>
                        <div className="space-y-1 text-sm w-full">
                            <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                            <input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('username', { required: true })} />
                            {errors.username && <span>{errors.username.message}</span>}
                        </div>
                        <div className="space-y-1 text-sm w-full">
                            <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('email', { required: true })} />
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className="space-y-1 text-sm w-full">
                            <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('password', { required: true })} />
                            {errors.password && <span>{errors.password.message}</span>}
                            <div className="flex justify-end text-xs dark:text-gray-600">
                                <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                            </div>
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
                    </div>
                    <div className="space-y-1 text-sm">
                        <input type="file" className="file-input w-full" {...register('image', { required: true })} />
                        {errors.image && <span>{errors.image.message}</span>}
                    </div>

                    <button className="block w-full p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Sign Up</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4"  onClick={handleGoogle}>
                    <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                        <FcGoogle className="text-3xl" />
                        <p className="font-bold">Login with Google</p>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
                    <Link to='/login' rel="noopener noreferrer" href="#" className="underline dark:text-gray-800 font-bold">Login</Link>
                </p>
            </div>
            <Toaster />
        </div>
    );
};

export default Signup;