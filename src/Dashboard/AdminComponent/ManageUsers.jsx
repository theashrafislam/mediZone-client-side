import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
    const axoisSecure = useAxoisSecure();
    const { data: allUsers = [], refetch, isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => axoisSecure.get('/users').then(res => res.data)
    });

    const handleRoleUser = (user) => {
        const role = {
            userRole: 'User'
        }
        axoisSecure.patch(`/users?id=${user._id}`, role)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('User Creation Successful.')
                }
            })
    }
    const handleRoleSeller = (user) => {
        const role = {
            userRole: 'Seller'
        }
        axoisSecure.patch(`/users?id=${user._id}`, role)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Seller Creation Successful.')
                }
            })
    }
    const handleRoleAdmin = (user) => {
        const role = {
            userRole: 'Admin'
        }
        axoisSecure.patch(`/users?id=${user._id}`, role)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success('Admin Creation Successful.')
                }
            })
    }



    if (isLoading) {
        return <div className='flex justify-center items-center mt-10'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return (
        <div>
            <div>
                <ShareHeader header={'Manage Users'} subHeader={'Oversee user roles, upgrade users to sellers or admins, and manage account statuses. Ensure smooth operations and maintain control over platform access and permissions.'} />
            </div>
            <div>
                <div className="overflow-x-auto">
                    <Helmet>
                        <title>Manage Users || MediZone</title>
                    </Helmet>
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-center">Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers?.map((user, index) => {
                                    return (
                                        <tr key={user._id}>
                                            <th>{index + 1}</th>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.userRole}</td>
                                            <td className="flex items-center justify-between">
                                                <button onClick={() => handleRoleUser(user)} className="btn block bg-blue-500 text-white font-bold rounded hover:bg-blue-700">User</button>
                                                <button onClick={() => handleRoleSeller(user)} className="btn block  bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Seller</button>
                                                <button onClick={() => handleRoleAdmin(user)} className="btn block  bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Admin</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ManageUsers;