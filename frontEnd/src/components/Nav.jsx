function Nav() {
    return (
        <nav className="flex items-center justify-between bg-slate-900 px-8 py-5 text-white">
            <h2 className="text-2xl font-bold">
                AllFood
            </h2>

            <div className="flex gap-8">
                <a
                    href="#home"
                    className="cursor-pointer hover:text-cyan-300"
                >
                    Home
                </a>

                <a
                    href="#menu"
                    className="cursor-pointer hover:text-cyan-300"
                >
                    Menu
                </a>

                <a
                    href="#order"
                    className="cursor-pointer hover:text-cyan-300"
                >
                    Order
                </a>
            </div>
        </nav>
    );
}

export default Nav;