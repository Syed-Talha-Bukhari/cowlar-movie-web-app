import { FC, ReactNode } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ModalLayoutProps = {
    onClose: any;
    title: string;
    children: ReactNode;
};

const ModalLayout: FC<ModalLayoutProps> = ({ onClose, title, children }) => {
    return (
        <div className="fixed inset-0 bg-bgPrimary bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-bgSecondary rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-textWhite dark:text-white">
                            {title}
                        </h3>
                        <div className="cursor-pointer">
                            <FontAwesomeIcon
                                icon={faClose}
                                height={16}
                                color="rgba(255, 255, 255, 0.87)"
                                onClick={onClose}
                            />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalLayout;
