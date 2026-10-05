function Hero() {
    return (
        <section
            id="home"
            className="flex min-h-[500px] flex-col items-center justify-center bg-slate-100 px-6 text-center"
        >
            <h1 className="text-5xl font-bold text-blue-900">
                Welcome to AllFood Restaurant
            </h1>

            <p className="mt-4 text-lg text-slate-600">
                Delicious meals made fresh for you.
            </p>

            <a
                href="#menu"
                className="mt-6 rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
                View Our Menu
            </a>
        </section>
    );
}

export default Hero;