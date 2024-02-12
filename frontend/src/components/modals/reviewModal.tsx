import Button from "../buttons/button";
import ModalLayout from "../../layout/modalLayout";


type ReviewModal = {
    openModal: boolean;
    onClose: any
}

const ReviewModal: React.FC<ReviewModal> = ({ openModal, onClose }) => {
    return (
        <>
            {openModal && (
                <ModalLayout onClose={onClose} title="Review">

                    <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#">
                            <div>
                                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Rating</label>
                                <div className="relative mb-8">
                                    <input type="range" name="rating" id="rating" min="1" max="5" step="1" className="appearance-none bg-textIndigo border  text-textIndigo text-sm rounded-lg focus:ring-black focus:border-textIndigo block w-full"  required />
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-0 -bottom-6">1</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">2</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">3</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">4</span>
                                    <span className="text-sm text-textWhite dark:text-gray-400 absolute end-0 -bottom-6">5</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Comment</label>
                                <textarea name="comment" id="comment" placeholder="Enter your comment" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required />
                            </div>
                            <div className="w-full m-auto flex justify-center">
                                <Button text="Add Review" />
                            </div>

                        </form>
                    </div>
                </ModalLayout>

            )}
        </>


    )
}

export default ReviewModal;