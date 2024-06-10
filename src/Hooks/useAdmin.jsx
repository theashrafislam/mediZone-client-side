import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "./useAxoisSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
    const axiosSecure = useAxoisSecure();
    const {user, loading} = useAuth();
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log(res.data);
            return res.data.admin;
        }
    });
    return [isAdmin, isAdminLoading]
};

export default useAdmin;