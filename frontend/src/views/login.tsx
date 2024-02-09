import AppLayout from "../layout/appLayout";
import Button from "../components/button";

const Login = () => {
    return (
        <AppLayout>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-full max-w-sm p-4 bg-bgSecondary border border-gray-900 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-textWhite dark:text-white">Log In</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-textWhite text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                       
                       <div className="w-full m-auto flex justify-center">
                       <Button text="LogIn"/>
                       </div>
                        
                        {/* <button type="submit" className="w-full text-white bg-textIndigo hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button> */}
                        <div className="text-sm font-medium text-white dark:text-gray-300">
                            Not registered? <a href="#" className="text-textIndigo hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

export default Login;