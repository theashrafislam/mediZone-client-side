const FaqSection = () => {
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
                    <p className="mt-4 mb-8 dark:text-gray-600">Welcome to the FAQ section of MedicineShop! Find answers to common questions about our platform. For further assistance, contact our support team.</p>
                    <div className="space-y-4">
                        <details className="w-full border rounded-lg" open="">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What payment methods do you accept?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">We accept payments through Stripe, which allows you to use various credit and debit cards securely.</p>
                        </details>
                        <details className="w-full border rounded-lg" open="">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How can I become a seller on MedicineShop?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">To become a seller, create an account and select the "Seller" role during registration. After logging in, you can start adding and managing your products from your seller dashboard.</p>
                        </details>
                        <details className="w-full border rounded-lg" open="">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How do I update my profile information?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">To update your profile information, click on your profile picture in the navbar and select "Update Profile." You can modify your details and save the changes.</p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FaqSection;