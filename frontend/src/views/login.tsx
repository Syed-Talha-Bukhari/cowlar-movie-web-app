import AppLayout from "../layout/appLayout";
import Button from "../components/buttons/button";
import { UserContext } from "../context/userContext";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Loader from "../components/loader/loader";
import { loginUser } from "../api/user";
import useAuthVerification from "../auth/useAuthVerification";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setIsLogged, updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { pageLoading } = useAuthVerification();

    const logIn = async (data: any) => {
        setIsLoading(true);
        try {
            const user = await loginUser(data.email, data.password);
            if (user) {
                updateUser({ ...user.user, token: user.token });
                setIsLogged(true);
                setTimeout(() => { 
                    navigate('/');
                }, 500);
            }
        } catch (error) {
            setIsLoading(false);
            console.log('error', error);
            toast.error("Error in logging in!")
        }
        setIsLoading(false);
    };

    if (isLoading || pageLoading) {
        return (
            <>
                <AppLayout>
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Loader />
                    </div>
                </AppLayout>
            </>
        );
    }

    return (
        <AppLayout>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-full max-w-sm p-4 bg-bgSecondary border border-gray-900 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit(logIn)}>
                        <h5 className="text-xl font-medium text-textWhite dark:text-white">Log In</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Email</label>
                            <input type="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" {...register('email', { required: 'Please enter your email' })} />
                            {errors.email && <span className="text-sm text-red-500">{errors.email.message?.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Password</label>
                            <input type="password" id="password" placeholder="••••••••" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {...register('password', {required: 'Password is required',})} />
                            {errors.password && <span className="text-sm text-red-500">{errors.password.message?.toString()}</span>}
                        </div>

                        <div className="w-full m-auto flex justify-center">
                            <Button text="LogIn" type="submit" />
                        </div>
                        <div className="text-sm font-medium text-white dark:text-gray-300">
                            Not registered? <Link to="/signup"><a href="#" className="text-textIndigo hover:underline dark:text-blue-500">Create account</a></Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

export default Login;