import * as React from 'react';
import '../css/ButtonDiy.css';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const ButtonDiy: React.FC<ButtonProps> = ({
    onClick,
    children,
    disabled = false,
    type = 'button',
    className = ''
}) => {
    return React.createElement(
        'button',
        {
            className: `custom-button ${className}`.trim(),
            onClick: onClick,
            disabled: disabled,
            type: type
        },
        children
    );
};

export default ButtonDiy;