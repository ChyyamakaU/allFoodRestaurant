function MenuCard({ item }) {
    return (
        <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>₦{item.price}</p>
            <p>Category: {item.Category?.name}</p>
        </div>
    );
}

export default MenuCard;