import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { verifyUser } from '../api/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const useAuthVerification = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const { setIsLogged, updateUser, user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = user?.token;
            if (token) {
                const user = await verifyUser(token);
                if (user) {
                    updateUser({ ...user, token: token });
                    setIsLogged(true);
                }
                else {
                    updateUser(null);
                    setIsLogged(false);
                    toast("Your session is expired. Please log in again!");
                    navigate("/login");
                }
            }
            setPageLoading(false);
        };
        verifyToken();
    }, []);

    return { pageLoading };
};

export default useAuthVerification;
