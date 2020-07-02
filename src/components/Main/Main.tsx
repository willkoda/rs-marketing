import React from 'react';
import './Main.scss';
import {Link} from 'react-router-dom';

function Main() {
    return (
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
    )
}

export default Main;