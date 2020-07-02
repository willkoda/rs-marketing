import React, {useState, useEffect, useRef, useCallback} from 'react';
import './Menu.scss';

interface Props {
    menuOptions: Array<JSX.Element>;
    buttonBackgroundColor: string;
}

function Menu({menuOptions, buttonBackgroundColor}: Props) {
    const menuRef = useRef<HTMLUListElement>(null!);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        if (menuActive) {
            menuRef.current.style.visibility = 'visible';
            menuRef.current.style.transform = 'scale(1)';
            menuRef.current.style.opacity = '1';
        } else {
            menuRef.current.style.opacity = '0';
            menuRef.current.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (menuRef.current) menuRef.current.style.visibility = 'hidden'; 
            }, 230);
        }
    }, [menuActive]);

    const closeMobileMenu = useCallback(() => {
        if (menuActive) {
            setMenuActive(false);
        }
    }, [menuActive]);

    useEffect(() => {
        window.addEventListener('click', closeMobileMenu);

        return () => {
            window.removeEventListener('click', closeMobileMenu);
        }
    }, [closeMobileMenu]);

    return (
        <div className="Menu">
            <button className="menu--button ripple" onClick={() => setMenuActive(!menuActive)}>
                <span className="bar top--bar" style={{backgroundColor: buttonBackgroundColor}}></span>
                <span className="bar middle--bar" style={{backgroundColor: buttonBackgroundColor}}></span>
                <span className="bar bottom--bar" style={{backgroundColor: buttonBackgroundColor}}></span>
            </button>
            <ul className="menu--list margin-top-5" ref={menuRef}>
                {menuOptions.map((el, index) => (
                    <li key={index}>
                        {el}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Menu;