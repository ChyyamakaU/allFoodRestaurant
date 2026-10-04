function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
        <div>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;