function MenuCard({ item, onAddToOrder }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-48 items-center justify-center bg-slate-100">
                <span className="text-5xl">🍽️</span>
            </div>

            <div className="p-5">
                <p className="mb-2 text-sm font-medium text-blue-800">
                    {item.Category?.name}
                </p>

                <h3 className="text-xl font-bold text-slate-900">
                    {item.name}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm text-slate-600">
                    {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-900">
                        ₦{Number(item.price).toLocaleString()}
                    </p>

                    <button
                        type="button"
                        onClick={() => onAddToOrder(item)}
                        className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MenuCard;