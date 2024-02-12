import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../buttons/button';

interface IReviewBody {
    _id: string;
    movieId: string;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}

interface IReviewProps {
    own?: boolean
    reviewBody: IReviewBody
}

const ReviewCard: React.FC<IReviewProps> = ({ own = false, reviewBody }) => {

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
                    <div className="text-sm text-gray-400 dark:text-gray-400 mt-3"><time dateTime="2022-02-08"
                        title={reviewBody?.createdAt}>{new Date(reviewBody?.createdAt).toLocaleString()}</time>
                    </div>
                    <div>
                        {own && (<>
                            <Button text='Edit' />
                            <Button text='Delete' />
                        </>)}
                    </div>
                </div>
            </article>
        </>
    )
}

export default ReviewCard