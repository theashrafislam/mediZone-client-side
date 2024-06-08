import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutPage from "./CheckOutPage";


//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateway_PK);

const Payment = () => {

    return (
        <div>
            <div className="my-10">
                <Elements stripe={stripePromise}>
                    <CheckOutPage/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;