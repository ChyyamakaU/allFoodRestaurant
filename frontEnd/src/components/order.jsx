import { useState } from "react";

function Order({ orderItems, isLoggedIn }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const totalAmount = orderItems.reduce(
        (total, item) => {
            return total + Number(item.price) * item.quantity;
        },
        0
    );

    const createOrder = async () => {
        if (!isLoggedIn) {
            setMessage(
                "Please sign in or create an account before placing your order."
            );
            return;
        }

        if (orderItems.length === 0) {
            setMessage(
                "Your order is empty. Add items from the menu first."
            );
            return;
        }

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
            setMessage(
                "Please sign in before placing your order."
            );
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        items: orderItems.map((item) => ({
                            menuItemId: item.id,
                            quantity: item.quantity
                        }))
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create order"
                );
            }

            setMessage(
                `Order #${data.id} created successfully! Total: ₦${Number(
                    data.totalAmount
                ).toLocaleString()}`
            );

        } catch (error) {
            console.error("Error creating order:", error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="order"
            className="min-h-screen bg-slate-50 px-8 py-16"
        >
            <div className="mx-auto max-w-4xl">

                <h2 className="mb-8 text-center text-4xl font-bold text-slate-900">
                    Your Order
                </h2>

                {!isLoggedIn && (
                    <div className="mb-8 rounded-xl bg-yellow-50 p-5 text-center">
                        <p className="font-medium text-yellow-800">
                            Please sign in or create an account before
                            placing your order.
                        </p>

                        <a
                            href="#auth"
                            className="mt-3 inline-block font-semibold text-blue-900 hover:underline"
                        >
                            Sign In / Create Account
                        </a>
                    </div>
                )}

                {orderItems.length === 0 ? (
                    <p className="text-center text-slate-500">
                        Your order is empty. Add some items from the menu.
                    </p>
                ) : (
                    <div className="space-y-4">

                        {orderItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-xl bg-white p-5 shadow"
                            >
                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        ₦{Number(item.price).toLocaleString()} ×{" "}
                                        {item.quantity}
                                    </p>
                                </div>

                                <p className="font-bold text-blue-900">
                                    ₦{(
                                        Number(item.price) *
                                        item.quantity
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}

                        <div className="flex items-center justify-between border-t pt-6">
                            <h3 className="text-xl font-bold">
                                Total
                            </h3>

                            <h3 className="text-2xl font-bold text-blue-900">
                                ₦{totalAmount.toLocaleString()}
                            </h3>
                        </div>

                        <button
                            type="button"
                            onClick={createOrder}
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Creating Order..."
                                : "Create Order"}
                        </button>

                        {message && (
                            <p className="mt-4 text-center font-medium text-blue-900">
                                {message}
                            </p>
                        )}

                    </div>
                )}

            </div>
        </section>
    );
}

export default Order;