import AppLayout from "../layout/appLayout";
import Button from "../components/buttons/button";
import { UserContext } from "../context/userContext";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Loader from "../components/loader/loader";
import { signUpUser } from "../api/user";
import useAuthVerification from "../auth/useAuthVerification";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setIsLogged, updateUser } = useContext(UserContext);
    const { pageLoading } = useAuthVerification();
    const navigate = useNavigate();

    const signUp = async (data: any) => {
        setIsLoading(true);
        try {
            const user = await signUpUser({ email: data.email, password: data.password, name: data.name, phoneNumber: data.phoneNumber });
            updateUser({ ...user?.user, token: user?.token });
            setIsLogged(true);
            setTimeout(() => {
                navigate('/');
            }, 500);

        } catch (error) {
            setIsLoading(false);
            console.log('error', error);
            toast.error("Error in signing up!")
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
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-sm p-4 bg-bgSecondary border border-gray-900 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 my-20">
                    <h5 className="text-xl font-medium text-textWhite dark:text-white mb-3">Sign Up</h5>
                    <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Email</label>
                            <input type="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"  {...register('email', {
                                required: 'Please enter your email',
                                pattern: { value: /^\S+@\S+$/i, message: 'Email format is not valid!' }
                            })} />
                            {errors.email && <span className="text-sm text-red-500">{errors.email.message?.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Name</label>
                            <input type="name" id="name" className="bg-gray-100 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="X" {...register('name', { required: 'Please enter your name' })} />
                            {errors.name && <span className="text-sm text-red-500">{errors.name.message?.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Phone Number</label>
                            <input type="tel" id="phoneNumber" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="92**********"  {...register('phoneNumber', { required: 'Please enter your phone number', pattern: { value: /^\92\d{10}$/, message: 'Please enter numeric values in the format 92xxxxxxxxxx' } })} />
                            {errors.phoneNumber && <span className="text-sm text-red-500">{errors.phoneNumber.message?.toString()}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Password</label>
                            <input type="password" id="password" placeholder="••••••••" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  {...register('password', { required: 'Please enter your password', minLength: { value: 8, message: 'Password must be 8 characters long' } })} />
                            {errors.password && <span className="text-sm text-red-500">{errors.password.message?.toString()}</span>}
                        </div>

                        <div className="w-full m-auto flex justify-center">
                            <Button text="SignUp" type="submit" />
                        </div>

                        <div className="text-sm font-medium text-white dark:text-gray-300">
                            Already registered? <Link to="/login"><a href="#" className="text-textIndigo hover:underline dark:text-blue-500">Login</a></Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

export default Signup;