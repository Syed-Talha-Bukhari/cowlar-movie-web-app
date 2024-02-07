import AppLayout from "../layout/appLayout";

const Home = () => {
    return (
        <>
            <AppLayout>
                <div className="isolate overflow-hidden py-24 sm:py-32">
                    <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" />
                    <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
                        <div className="aspect-[1097/600] w-[68.5625rem] bg-gradient-to-tr from-[#fc46ff] to-[#242074] opacity-20" ></div>
                    </div>
                    <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
                        <div className="aspect-[1097/600] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#242074] opacity-20" ></div>
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Filmazia</h2>
                            <p className="mt-6 text-lg leading-8 text-textColor">Discover new movies from our collection of movies, view top rated movies, add new movies on platform and provide feedback on watched movies.</p>
                        </div>
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10 text-textIndigo">
                                <a className="text-textIndigo" href="#">Explore Movies <span aria-hidden="true">&rarr;</span></a>
                                <a href="#">Uploaded Movies <span aria-hidden="true">&rarr;</span></a>
                                <a href="#">Add Movie <span aria-hidden="true">&rarr;</span></a>
                            </div>

                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

export default Home;