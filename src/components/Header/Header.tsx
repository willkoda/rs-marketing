import React from 'react';
import './Header.scss';
import Menu from '../../elements/Menu/Menu';

function Header() {
    const headerMenuClick = (target: string) => {
        console.log(target)
    }

    const menuOptions = [
        <button onClick={() => headerMenuClick('home')}>Home</button>,
        <button onClick={() => headerMenuClick('services')}>Services</button>,
        <button onClick={() => headerMenuClick('contact-us')}>Contact Us</button>
    ];

    return (
        <header className="Header">
            <div className="constrained--container container">
                <div className="site--name">
                    <div className="name">ADMIN DESK</div>
                    <div className="description">With ease, with US.</div>
                </div>
                <ul className="navigation--links">
                    {
                        menuOptions.map(
                            (el, index) => <li key={index}>{el}</li>
                        )
                    }
                </ul>
                <div className="mobile--menu">
                    <Menu buttonBackgroundColor="rgb(0, 0, 0)" menuOptions={menuOptions} />
                </div>
            </div>
        </header>
    )
}

export default Header;