import { faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Dispatch, FC, SetStateAction, useContext } from 'react'
// import StarRating from '../star-rating'
// import { UserContext } from '../../context'
// import { deleteReviews } from '../../api/reviews'
// import toast from 'react-hot-toast'
interface IReviewBody {
    _id: string;
    movieId: string;
    comment: string;
    ratingStars: number;
    createdAt: string;
    updatedAt: string;
    userName: string;
}
interface IReviewProps {
    own?: boolean
    reviewBody: IReviewBody
}

const ReviewCard: React.FC<IReviewProps> = ({ own = false, reviewBody}) => {

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
                                /> {reviewBody?.userName}
                            </div>
                        </p>
                        <p className="text-sm text-textWhite dark:text-gray-400"><time dateTime="2022-02-08"
                            title={reviewBody?.createdAt}>{new Date(reviewBody?.createdAt).toLocaleString()}</time>
                        </p>

                    </div>
                    <div>
                        {/* <StarRating initialRating={reviewBody?.ratingStars} changeAble={false} /> */}
                    </div>
                    {
                        own && (
                            <div className='flex justify-between gap-4'>
                                <FontAwesomeIcon icon={faPenToSquare} className='h-[20px] cursor-pointer' color='#646cff' />
                                <FontAwesomeIcon icon={faTrash} className='h-[20px] cursor-pointer' color='#646cff' />

                            </div>
                        )
                    }
                </div>
                <p className="text-textWhite dark:text-gray-400">{reviewBody?.comment}</p>
            </article>
        </>
    )
}

export default ReviewCard