import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxoisSecure from "../../Hooks/useAxoisSecure";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";


const CheckOutPage = () => {
    const [error, setError] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useAxoisSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [carts, refetch] = useCart();
    const totalPrice = carts.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error:', error);
            setError(error.message)
        }
        else {
            console.log('payment method:', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('paymentIntent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    data: new Date(), //utc data convert. use moment js to
                    status: 'Payment Successfully',
                    cartIds: carts.map(item => item._id),
                    transactionId: paymentIntent.id
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log(res);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    navigate('/invoicePage')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for payment.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary my-2" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <div>
                <p className="text-red-500">{error}</p>
                {transactionId && <p>Your transactionId is: {transactionId}</p>}
            </div>
        </form>
    );
};

export default CheckOutPage;