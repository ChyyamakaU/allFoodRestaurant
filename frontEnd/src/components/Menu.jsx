import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import CategoryFilter from "./Category";

function Menu({ onAddToOrder }) {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Our Main Meals",
        "Drinks",
        "Desserts"
    ];

    useEffect(() => {
        fetch("http://localhost:5000/api/menuitems")
            .then((response) => response.json())
            .then((data) => {
                setMenuItems(data);
            })
            .catch((error) => {
                console.error("Error fetching menu:", error);
            });
    }, []);

    const filteredMenuItems =
        selectedCategory === "All"
            ? menuItems
            : menuItems.filter(
                (item) => item.Category?.name === selectedCategory
            );

    return (
        <section
            id="menu"
            className="min-h-screen bg-white px-8 py-16"
        >
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-8 text-center text-4xl font-bold text-slate-900">
                    Our Menu
                </h2>

                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredMenuItems.map((item) => (
                        <MenuCard
                            key={item.id}
                            item={item}
                            onAddToOrder={onAddToOrder}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Menu;