import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxoisSecure from "./useAxoisSecure";

const useCart = () => {
    const axiosSecure = useAxoisSecure();
    const {user} = useAuth();
    const token = localStorage.getItem('token');
    const { refetch, data: carts = [], isLoading } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })
    return [carts, refetch, isLoading]
};

export default useCart;