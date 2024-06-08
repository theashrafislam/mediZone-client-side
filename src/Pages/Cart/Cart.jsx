import useCart from "../../Hooks/useCart";

const Cart = () => {

    const [carts, refetch] = useCart();
    console.log(carts);

    return (
        <div>
            <h1>THis is cart section</h1>
        </div>
    );
};

export default Cart;