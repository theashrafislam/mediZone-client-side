import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = (data) => {
        console.log(data);
    };

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
                        {/* <div className="space-y-1 text-sm w-full">
                            <select className="select select-bordered w-full">
                                <option disabled selected>Who shot first?</option>
                                <option>Han Solo</option>
                                <option>Greedo</option>
                            </select>
                        </div> */}
                        <div className="space-y-1 text-sm w-full">
                            <select
                                className="select select-bordered w-full"
                                {...register('select', { required: 'This field is required' })}
                                defaultValue=""
                            >
                                <option value="" disabled>What do you want to be?</option>
                                <option value="Han Solo">User</option>
                                <option value="Greedo">Seller</option>
                            </select>
                            {errors.select && <span>{errors.select.message}</span>}
                        </div>
                    </div>
                    <div className="space-y-1 text-sm">
                        <input type="file" className="file-input w-full" {...register('photo', { required: true })} />
                        {errors.photo && <span>{errors.photo.message}</span>}
                    </div>

                    <button className="block w-full p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Sign Up</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                        <FcGoogle className="text-3xl" />
                        <p className="font-bold">Login with Google</p>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
                    <Link to='/login' rel="noopener noreferrer" href="#" className="underline dark:text-gray-800 font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;