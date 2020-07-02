import React from 'react';
import './Header.scss';
import {NavLink} from 'react-router-dom';

function Header() {
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
            </div>
        </header>
    )
}

export default Header;