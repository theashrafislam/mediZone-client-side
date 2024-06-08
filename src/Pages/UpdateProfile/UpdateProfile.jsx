import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
    const { user } = useAuth();
    const axoisSecure = useAxoisSecure();

    const { data: userData = [] } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axoisSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })
    const { userRole, email, displayName, image } = userData;
    return (
        <div className="flex justify-center items-center mt-5">
            <Helmet>
                <title>Update Profile || MediZone</title>
            </Helmet>
            <div className="flex flex-col justify-center w-6/12 m-auto p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
                <img src={image} alt="" className="w-52 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">{displayName}</h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-600"><span className="font-medium">Email:</span> {email}</p>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-600"><span className="font-medium">Role:</span> {userRole}</p>
                    </div>
                    <div className="flex justify-center pt-2 space-x-4 align-center">
                        <Link to='/update-profile-page' className="btn btn-secondary">Update Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;