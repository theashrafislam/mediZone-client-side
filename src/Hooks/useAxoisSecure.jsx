import axios from "axios";

const axoisSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxoisSecure = () => {
    return axoisSecure;
};

export default useAxoisSecure;