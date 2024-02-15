import Button from "../buttons/button";
import ModalLayout from "../../layout/modalLayout";
import { useForm, SubmitHandler} from 'react-hook-form';
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { createReview, editReview } from '../../api/reviews';
import { IReview } from "../../types/review";

type ReviewModal = {
    openModal: boolean;
    onClose: any;
    setIsLoading: any;
    setRefreshReviews: any;
    movieId: string;
    editData?: IReview
}

interface IReviewResponse {
    comment: string;
    rating: string;
}

const ReviewModal: React.FC<ReviewModal> = ({ openModal, onClose, setIsLoading, setRefreshReviews, movieId, editData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IReviewResponse>();
    const { user } = useContext(UserContext);

    const onSubmission: SubmitHandler<IReviewResponse> = async (data: any) => {
        setIsLoading(true);
        let newReview;
        try {
            if (editData) newReview = await editReview(movieId, editData?._id, user?.token as string, data);
            else newReview = await createReview(movieId, user?.token as string, data);
                setRefreshReviews((prev: any) => prev + 1);
                toast.success("Review has been added!")
                onClose();
        } catch (error) {
            toast.error("Unable to add review!")
        }
        setIsLoading(false);
    };

    return (
        <>
            {openModal && (
                <ModalLayout onClose={onClose} title="Review">

                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmission)}>
                            <div>
                                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Rating</label>
                                <div className="relative mb-8">
                                    <input defaultValue={editData?.rating} type="range" id="rating" min="1" max="5" step="1" className="appearance-none bg-textIndigo border  text-textIndigo text-sm rounded-lg focus:ring-black focus:border-textIndigo block w-full" {...register('rating', {required: 'Rating between 1 to 5 is required',})} />
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-0 -bottom-6">1</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">2</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">3</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">4</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute end-0 -bottom-6">5</span>
                                </div>
                                {errors.rating && <span className="text-sm text-red-500">{errors.rating.message?.toString()}</span>}
                            </div>
                            <div>
                                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Comment</label>
                                <textarea defaultValue={editData?.comment} id="comment" placeholder="Enter your comment" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" {...register('comment', {required: 'Comment is required',})} />
                                {errors.comment && <span className="text-sm text-red-500">{errors.comment.message?.toString()}</span>}
                            </div>
                            <div className="w-full m-auto flex justify-center">
                                <Button text={editData?"Edit":"Add Review"} type="submit"/>
                            </div>

                        </form>
                    </div>
                </ModalLayout>

            )}
        </>


    )
}

export default ReviewModal;