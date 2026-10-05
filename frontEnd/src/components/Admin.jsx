import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    const token = localStorage.getItem("token");

    const loadData = async () => {
        try {
            const [categoryResponse, menuResponse] =
                await Promise.all([
                    fetch("http://localhost:5000/api/categories"),
                    fetch("http://localhost:5000/api/menuitems")
                ]);

            const categoryData =
                await categoryResponse.json();

            const menuData =
                await menuResponse.json();

            setCategories(categoryData);
            setMenuItems(menuData);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-slate-100 px-8 py-10">
            <div className="mx-auto max-w-6xl">

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        AllFood Admin Dashboard
                    </h1>

                    <button
                        onClick={logout}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white"
                    >
                        Logout
                    </button>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold">
                        Categories
                    </h2>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="rounded-xl bg-white p-5 shadow"
                            >
                                <h3 className="font-bold">
                                    {category.name}
                                </h3>

                                <p className="text-sm text-slate-500">
                                    {category.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold">
                        Menu Items
                    </h2>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-xl bg-white p-5 shadow"
                            >
                                <h3 className="font-bold">
                                    {item.name}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {item.description}
                                </p>

                                <p className="mt-3 font-bold text-blue-900">
                                    ₦{Number(item.price).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Admin;