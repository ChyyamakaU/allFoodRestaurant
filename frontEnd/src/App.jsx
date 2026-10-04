import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Menu from "./components/MenuCard";
import Order from "./components/order";
import Orders from "./components/Category";
import AllMenu from "./components/Menu"

function App() {
    return (
        <>
            <Nav />
            <Hero />
            <Menu />
            <Order />
            <Orders />
            <AllMenu/>
        </>
    );
}

export default App;