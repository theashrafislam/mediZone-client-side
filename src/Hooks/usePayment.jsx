import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxoisSecure from "./useAxoisSecure";

const usePayment = () => {
    const axiosSecure = useAxoisSecure();
    const {user} = useAuth();
    const { refetch, data: paymentHistory = [] } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?email=${user.email}`);
            return res.data;
        }
    })
    return [paymentHistory, refetch]
};

export default usePayment;