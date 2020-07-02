import React from 'react';
import './Header.scss';
import {NavLink, Link} from 'react-router-dom';

import Menu from '../../elements/Menu/Menu';

function Header() {
    const menuOptions = [
        <Link key="0" to="/">
            <div className="link--content">
                <span>Home</span>
            </div>
        </Link>,
        <Link key="1" to="/">
            <div className="link--content">
                <span>Services</span>
            </div>
        </Link>,
        <Link key="1" to="/">
            <div className="link--content">
                <span>Contact Us</span>
            </div>
        </Link>
    ];

    return (
        <header className="Header">
            <div className="constrained--container container">
                <div className="site--name">
                    <div className="name">ADMIN DESK</div>
                    <div className="description">With ease, with US.</div>
                </div>
                <ul className="navigation--links">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Services</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Contact US</NavLink>
                    </li>
                </ul>
                <div className="mobile--menu">
                    <Menu buttonBackgroundColor="rgb(0, 0, 0)" menuOptions={menuOptions} />
                </div>
            </div>
        </header>
    )
}

export default Header;