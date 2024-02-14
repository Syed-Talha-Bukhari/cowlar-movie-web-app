import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../buttons/button';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { deleteReviews } from '../../api/reviews';
import toast from 'react-hot-toast';
interface IReviewBody {
    _id: string;
    movieId: string;
    comment: string;
    rating: string;
    name: string;
}

interface IReviewProps {
    own?: boolean
    reviewBody: IReviewBody
    openModal?: any
    setRefreshReviews?: any
}

const ReviewCard: React.FC<IReviewProps> = ({ own = false, reviewBody, openModal, setRefreshReviews }) => {

    const { user } = useContext(UserContext);

    const onDeleteMovie = async () => {
        try {
            const deletionStatus = await deleteReviews(reviewBody.movieId, reviewBody._id, user?.token as string);
            if (deletionStatus) {
                toast.success("Review deleted successfully!")
                setRefreshReviews((prev: number) => prev + 1);
            }
            else {
                toast.error("Error in deleting review")
            }
        } catch (error) {
            toast.error("Review deletion failed")
        }
    };

    return (
        <>
            <article className="p-6 text-base bg-bgSecondary rounded-lg dark:bg-gray-900 my-3">
                <div className="flex justify-between items-center mb-2 flex-wrap gap-3 sm:gap-0">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-textWhite dark:text-white font-semibold">
                            <div className='flex items-center'>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-4 w-4 h-4 rounded-full bg-textIndigo p-2"
                                    height={12}
                                    color='black'
                                /> {reviewBody?.name}
                            </div>
                        </p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <FontAwesomeIcon
                            icon={faStar}
                            className="w-5 h-5 rounded-full p-2"
                            height={12}
                            color='#646cff'
                        />
                        <div className='text-xl font-bold'>
                            {reviewBody.rating}
                        </div>
                    </div>

                </div>
                <p className="text-textWhite dark:text-gray-400">{reviewBody?.comment}</p>

                <div className='flex justify-between'>
                    <div>
                    </div>
                    <div>
                        {own && (<>
                            <Button text='Edit' onClick={openModal} />
                            <Button text='Delete' onClick={onDeleteMovie} />
                        </>)}
                    </div>
                </div>
            </article>
        </>
    )
}

export default ReviewCard