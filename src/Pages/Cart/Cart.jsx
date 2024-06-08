import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import useAuth from "../../Hooks/useAuth";

const Cart = () => {

    const axoisSecure = useAxoisSecure();
    const {user} = useAuth();

    const {data: carts } = useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const res = await axoisSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })

    console.log(carts);

    return (
        <div>
            <h1>THis is cart section</h1>
        </div>
    );
};

export default Cart;