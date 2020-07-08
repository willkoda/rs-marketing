import React from 'react';
import './CheckBox.scss';

interface Props {
    id: string;
    text: string;
    checkCallback?(checked: boolean): void;
}

function CheckBox({id, text, checkCallback}: Props) {

    const changeHandler = (e: React.ChangeEvent) => {
        const checkbox = e.currentTarget as HTMLInputElement;
        if (checkCallback) checkCallback(checkbox.checked);
    }

    return (
        <label htmlFor={id} className="CheckBox">
            <input type="checkbox" id={id} onChange={changeHandler} />
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