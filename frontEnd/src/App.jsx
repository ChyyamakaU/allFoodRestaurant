import {useState, useEffect} from "react"
import './App.css'

function App() {
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
    <>
      

 
        <div>
            <h1>Restaurant Management System</h1>
            <p>Welcome to our restaurant.</p>
        </div>

         {menuItems.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>₦{item.price}</p>
                    <p>Category: {item.Category?.name}</p>
                </div>
            ))}      
              
    </>
  )
}

export default App
