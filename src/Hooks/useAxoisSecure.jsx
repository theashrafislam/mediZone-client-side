import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axoisSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxoisSecure = () => {
    const navigate =useNavigate();
    const {userLogOut} = useAuth();

    axoisSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('token'); // Corrected this line
        if (token) {
            config.headers.authorization = `token ${token}`; // Corrected this line
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Add a response interceptor
    axoisSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
         console.log(status);
        if(status === 401 || status === 403){
            await userLogOut();
            navigate('/login')
        }
        return Promise.reject(error);
    });

    return axoisSecure;
};

export default useAxoisSecure;