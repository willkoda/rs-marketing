import React from 'react';
import './CheckBox.scss';

interface Props {
    value: string;
    text: string;
    checkCallback?(result: {checked: boolean, value: string}): void;
}

function CheckBox({value, text, checkCallback}: Props) {

    const changeHandler = (e: React.ChangeEvent) => {
        const checkbox = e.currentTarget as HTMLInputElement;
        if (checkCallback) checkCallback({checked: checkbox.checked, value: value});
    }

    return (
        <label htmlFor={`${text}--${value}`} className="CheckBox">
            <input type="checkbox" id={`${text}--${value}`} onChange={changeHandler} />
            <span className="svg--container margin-right-10">
                <svg viewBox="0, 0, 50, 50">
                    <path d="M5 30 L 20 45 L 45 5"></path>
                </svg>
            </span>
            <span className="svg--checkbox__text">{text}</span>
        </label>
    )
}

export default CheckBox;