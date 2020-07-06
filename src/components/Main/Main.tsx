import React from 'react';
import './Main.scss';
import './Services.scss';
import {Link} from 'react-router-dom';

import {
    Airplay as AirplayIcon,
    Group as GroupIcon,
    Assessment as AssessmentIcon,
    Storage as StorageIcon
} from '@material-ui/icons';

function Main() {

    const serviceItems = [
        {
            icon: <AirplayIcon />,
            primaryText: "Operations Management",
            secondaryText: "Your directions, our execution. We keep the engine running."
        },
        {
            icon: <GroupIcon />,
            primaryText: "Player Processing",
            secondaryText: "You grab them, we handle the rest. Applications, queries, transactions."
        },
        {
            icon: <AssessmentIcon />,
            primaryText: "Data Reports and Analytics",
            secondaryText: "We track activity, so you can focus your strategies."
        },
        {
            icon: <StorageIcon />,
            primaryText: "Other Services",
            secondaryText: "For that extra boost, we have some premiums."
        }
    ];
    
    return (
        <div className="main--container">
            <section className="main">
                <div className="constrained--container">
                    <div className="main--text">
                        <h1>Administration On Us.</h1>
                        <h2 className="sub--heading margin-top-20">
                            <span>We look after your day to day operations</span>
                            <span className="margin-top-10">so you can focus on growing your business.</span>
                            <Link to="/" className="get--started--link margin-top-20">Get Started</Link>
                        </h2>
                    </div>
                </div>
            </section>

            <section className="Services">
                <div className="services--section padding-top-bottom-100 constrained--container">
                    <p className="heading">What we offer</p>
                    <div className="sub--heading">Our Services</div>
                    <ul className="services--list margin-top-50">
                        {
                            serviceItems.map((el, index) => 
                                <li key={index} className="margin-top-20">
                                    <div className="icon">
                                        {el.icon}
                                    </div>
                                    <div className="primary--text margin-top-20">{el.primaryText}</div>
                                    <div className="secondary--text margin-top-10">{el.secondaryText}</div>
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className="online--poker--section padding-top-bottom-100">
                    <div className="constrained--container">
                        <div className="sub--heading">Online Poker</div>
                        <div className="description margin-top-30">
                            Join the world’s most popular online Poker games with more tables and more Poker tournaments anywhere online!
                        </div>
                        <ul className="game--links margin-top-30">
                            <li>Play in Australia</li>
                            <li>Play in Canada</li>
                            <li>Play in New Zealand</li>
                            <li>Play in UK</li>
                            <li>Play in US</li>
                            <li>Play in India</li>
                            <li>Play in Malaysia</li>
                            <li>Play in Singapore</li>
                            <li>Play in Thailand</li>
                        </ul>
                    </div>
                </div>

                <div className="contact--section padding-top-bottom-80">
                    <p className="heading">Interested?</p>
                    <div className="sub--heading">Contact Us</div>
                    <Link to="/sign-up" className="registration--link margin-top-40 margin-bottom-80">Sign up for our service today.</Link>
                </div>
            </section>
        </div>
    )
}

export default Main;