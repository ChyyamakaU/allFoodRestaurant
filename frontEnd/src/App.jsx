import { useState } from "react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Auth from "./components/Auth";
import Order from "./components/order";


function App() {

    const [orderItems, setOrderItems] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );


    const addToOrder = (item) => {

        setOrderItems((currentItems) => {

            const existingItem = currentItems.find(
                (orderItem) =>
                    orderItem.id === item.id
            );


            if (existingItem) {

                return currentItems.map(
                    (orderItem) =>
                        orderItem.id === item.id
                            ? {
                                ...orderItem,
                                quantity:
                                    orderItem.quantity + 1
                            }
                            : orderItem
                );

            }


            return [
                ...currentItems,
                {
                    ...item,
                    quantity: 1
                }
            ];

        });

    };


    const handleLogin = () => {
        setIsLoggedIn(true);
    };


    return (
        <>
            <Nav />

            <Hero />

            <Menu
                onAddToOrder={addToOrder}
            />

            <Auth
                onLogin={handleLogin}
            />

            <Order
                orderItems={orderItems}
                isLoggedIn={isLoggedIn}
            />
        </>
    );
}


export default App;