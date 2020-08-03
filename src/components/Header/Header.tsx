import React, {useContext} from 'react';
import './Header.scss';
import Menu from '../../elements/Menu/Menu';
import {HeaderContext, ActiveLink} from '../../providers/HeaderProvider';
import {useLocation, useHistory} from 'react-router-dom';

import headset from '../../assets/images/headset.svg';

function Header() {
    const location = useLocation();
    const history = useHistory();
    const headerContext = useContext(HeaderContext);

    const headerMenuClick = (target: ActiveLink) => {
        if (location.pathname !== '/') {
            history.push('/');
        }
        headerContext.updateActiveMainPageSection(target);
    }

    const menuOptions = [
        <button onClick={() => headerMenuClick('home')}>Home</button>,
        <button onClick={() => headerMenuClick('services')}>Services</button>,
        <button onClick={() => headerMenuClick('contact-us')}>Contact Us</button>,
        <button className="staf--log-in" onClick={() => history.push('/login')}>
            <img src={headset} alt="headset" width="25px" height="25px" />
            <span className="text" style={{
                
            }}>Staff Portal</span>
        </button>
    ];

    return (
        <header className="Header">
            <div className="constrained--container container">
                <div className="application--name">
                    <span>ADMIN</span>
                    <span className="colored--text">DESK</span>
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