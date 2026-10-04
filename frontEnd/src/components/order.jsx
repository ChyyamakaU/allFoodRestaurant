import { useEffect, useState } from "react";

function Order() {
    const [menuItems, setMenuItems] = useState([]);

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

    return (
        <section id="order">
            <h2>Create Your Order</h2>

            {menuItems.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>₦{item.price}</p>

                    <input
                        type="number"
                        min="0"
                        defaultValue="0"
                    />
                </div>
            ))}
        </section>
    );
}

export default Order;