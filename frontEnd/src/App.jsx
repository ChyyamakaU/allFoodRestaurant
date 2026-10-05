import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Auth from "./components/Auth";
import Order from "./components/order";

import AdminLogin from "./components/AdminLogin";
import Admin from "./components/AdminLogin";
import AdminRoute from "./components/AdminRoute";

function CustomerApp() {
  const [orderItems, setOrderItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );

  const addToOrder = (item) => {
    setOrderItems((currentItems) => {
      const existingItem = currentItems.find(
        (orderItem) => orderItem.id === item.id,
      );

      if (existingItem) {
        return currentItems.map((orderItem) =>
          orderItem.id === item.id
            ? {
                ...orderItem,
                quantity: orderItem.quantity + 1,
              }
            : orderItem,
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
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
      <Menu onAddToOrder={addToOrder} />
      <Auth onLogin={handleLogin} />
      <Order orderItems={orderItems} isLoggedIn={isLoggedIn} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerApp />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
