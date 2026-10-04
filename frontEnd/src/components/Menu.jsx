import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import CategoryFilter from "./CategoryFilter";

function Menu() {
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
        <section>
            <h2>Our Menu</h2>

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            <div>
                {filteredMenuItems.map((item) => (
                    <MenuCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </section>
    );
}

export default Menu;