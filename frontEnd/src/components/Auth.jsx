import { useState } from "react";

function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setSuccess(false);
        setLoading(true);

        try {
            const endpoint = isLogin
                ? "http://localhost:5000/api/users/login"
                : "http://localhost:5000/api/users/register";

            const body = isLogin
                ? {
                    email,
                    password
                }
                : {
                    name,
                    email,
                    password
                };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong"
                );
            }

            if (isLogin) {
                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                setSuccess(true);
                setMessage("Login successful!");

                if (onLogin) {
                    onLogin(data.user);
                }

                setPassword("");

            } else {
                setSuccess(true);
                setMessage(
                    "Account created successfully. Please sign in."
                );

                setIsLogin(true);
                setName("");
                setEmail("");
                setPassword("");
            }

        } catch (error) {
            console.error(error);

            setSuccess(false);
            setMessage(error.message);

        } finally {
            setLoading(false);
        }
    };


    return (
        <section
            id="auth"
            className="bg-white px-8 py-16"
        >
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

                <h2 className="text-center text-3xl font-bold text-slate-900">
                    {isLogin
                        ? "Sign In"
                        : "Create Account"}
                </h2>

                <p className="mt-2 text-center text-slate-500">
                    {isLogin
                        ? "Sign in to place your order."
                        : "Create an account to place your order."}
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4"
                >

                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                        />
                    )}


                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                        minLength={6}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                                ? "Sign In"
                                : "Create Account"}
                    </button>

                </form>


                {message && (
                    <p
                        className={`mt-5 text-center font-medium ${
                            success
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {message}
                    </p>
                )}


                <button
                    type="button"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage("");
                        setSuccess(false);
                    }}
                    className="mt-6 w-full text-center text-sm font-medium text-blue-900 hover:underline"
                >
                    {isLogin
                        ? "Don't have an account? Create one"
                        : "Already have an account? Sign in"}
                </button>

            </div>
        </section>
    );
}

export default Auth;