import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxoisPublic from "../../Hooks/useAxoisPublic";

const Login = () => {
    const { loginWithEmailPassword, loginUsingGoogle } = useAuth();
    const axoisPublic = useAxoisPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";
    console.log(location);

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        loginWithEmailPassword(email, password)
            .then(res => {
                toast.success("Great to see you again! You've logged in successfully.");
                navigate(from)
            })
            .catch(error => toast.error("Login unsuccessful. Please ensure your email and password are correct and try again."))
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
                            navigate(from)
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
                <title>Login || MediZone</title>
            </Helmet>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#007bff] text-black">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <form noValidate="" action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                        <input type="text" name="email" id="email" placeholder="email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('email', { required: true })} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" {...register('password', { required: true })} />
                        {errors.password && <span>{errors.password.message}</span>}
                        <div className="flex justify-end text-xs dark:text-gray-600">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <button className="block w-full p-3 text-center rounded-md font-bold hover:bg-black hover:text-white bg-white">Login</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div onClick={handleGoogle} className="flex justify-center space-x-4">
                    <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                        <FcGoogle className="text-3xl" />
                        <p className="font-bold">Login with Google</p>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-600">Do not have an account?
                    <Link to='/signup' rel="noopener noreferrer" href="#" className="underline dark:text-gray-800 font-bold">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;