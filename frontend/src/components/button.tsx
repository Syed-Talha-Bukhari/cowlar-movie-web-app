import React from 'react';

type Props = {
    text: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
};


const Button: React.FC<Props> = ({
    disabled,
    text,
    type = 'submit',
    onClick,
    className
}) => {
    const buttonClasses = `my-1 rounded text-sm md:text-base lg:text-base px-5 py-1 text-center mr-2 inline-flex items-center transition-all ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-textIndigo text-bgPrimary'} ${className ?? className}`;

    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={buttonClasses}
        >
            {text}
        </button>
    );
};

export default Button;
