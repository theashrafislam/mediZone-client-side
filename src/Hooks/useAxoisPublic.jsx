import axios from "axios";


const axoisPublic = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxoisPublic = () => {
    return axoisPublic;
};

export default useAxoisPublic;