function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange
}) {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
                <button
                    type="button"
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`rounded-full px-5 py-2 font-medium transition ${
                        selectedCategory === category
                            ? "bg-blue-900 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;