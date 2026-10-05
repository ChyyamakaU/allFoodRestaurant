import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            if (data.user.role !== "admin") {
                setMessage("Admin access only.");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/admin");

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-center text-3xl font-bold text-slate-900">
                    Admin Login
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="mt-8 space-y-4"
                >
                    <input
                        type="email"
                        placeholder="Admin email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-900 py-3 font-semibold text-white"
                    >
                        Login
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-red-600">
                        {message}
                    </p>
                )}

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 w-full text-sm text-blue-900"
                >
                    Back to Restaurant
                </button>
            </div>
        </div>
    );
}

export default AdminLogin;