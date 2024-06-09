import { useQuery } from "@tanstack/react-query";
import ShareHeader from "../../Component/ShareHeader/ShareHeader";
import useAxoisSecure from "../../Hooks/useAxoisSecure";

const ManageUsers = () => {
    const axoisSecure = useAxoisSecure();
    const { data: allUsers = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => axoisSecure.get('/users').then(res => res.data)
    })
    return (
        <div>
            <div>
                <ShareHeader header={'Manage Users'} subHeader={'Oversee user roles, upgrade users to sellers or admins, and manage account statuses. Ensure smooth operations and maintain control over platform access and permissions.'} />
            </div>
            <div>
                <div className="overflow-x-auto">
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
                                allUsers.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userRole}</td>
                                    <td className="flex gap-2 justify-center items-center">
                                        <button className="btn bg-[#007bff] text-white">User</button>
                                        <button className="btn bg-[#007bff] text-white">Seller</button>
                                        <button className="btn bg-[#007bff] text-white">Admin</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;