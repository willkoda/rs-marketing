import React, {useEffect, useContext, useRef, useState} from 'react';
import './Main.scss';
import './Services.scss';
import {Link} from 'react-router-dom';
import AdminMarketingExport from './AdminMarketingExport';

import mainImage from '../../assets/images/main.jpg';

import {HeaderContext} from '../../providers/HeaderProvider';
import {ModalContext} from '../../providers/ModalProvider';

import OptionsModalContent from './OptionsModalContent/OptionsModalContent';

import withTokenValidation from '../../hoc/withTokenValidation';
import {compose} from 'redux';

import {
    Airplay as AirplayIcon,
    Group as GroupIcon,
    Assessment as AssessmentIcon,
    Storage as StorageIcon,
    ImportExport as ImportExportIcon
} from '@material-ui/icons';

interface Props {
    validateToken(): Promise<boolean>;
}

function Main({validateToken}: Props) {
    const modal = useContext(ModalContext);
    const headerContext = useContext(HeaderContext);
    const activeSectionRef = useRef(null!);
    const [tokenValid, setTokenValid] = useState(false);
    const countries = [
        'Australia',
        'Philippines',
        'Canada',
        'New Zealand',
        'UK',
        'US',
        'India',
        'Malaysia',
        'Singapore',
        'Thailand'
    ];


    useEffect(() => {
        const activeElement = activeSectionRef.current as HTMLElement;
        if (activeElement) {
            activeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }, [headerContext.activeMainPageSection, activeSectionRef, headerContext.clickTimeStamp])

    useEffect(() => {
        // console.log(validateToken);
        const tokenValidation = async () => {
            const result = await validateToken();
            setTokenValid(result);
        }
        tokenValidation();
    }, [validateToken])

    const serviceItems = [
        {
            icon: <AirplayIcon />,
            primaryText: "Lobby Management",
            secondaryText: (
                <span className="secondary--text">
                    <span className="secondary--text__content">
                        <p>Creation and monitoring of tables to ensure standard offered games are always ready.</p>
                        <p>Creation of Tournaments and facilitation of deals.</p>
                        <p>weekly cut-off execution</p>
                    </span>
                </span>
            )
        },
        {
            icon: <GroupIcon />,
            primaryText: "Player Processing",
            secondaryText: (
                <span className="secondary--text">
                    <span className="secondary--text__content">
                        <p>Loading of player deposit / Claim backs for withdrawals</p>
                        <p>New member application / upgrade to agents and adding of downlines</p>
                    </span>
                </span>
            )
        },
        {
            icon: <AssessmentIcon />,
            primaryText: "Data Reports and Analytics",
            secondaryText: (
                <span className="secondary--text">
                    <span className="secondary--text__content">
                        <p>Weekly RB Computation</p>
                        <p>General accounting services</p>
                    </span>
                </span>
            )
        },
        {
            icon: <StorageIcon />,
            primaryText: "Other Services",
            secondaryText: (
                <span className="secondary--text">
                    <span className="secondary--text__content">
                        <p>Operating a 24/7 chat support (platform to be provided by client)</p>
                    </span>
                </span>
            )
        }
    ];

    const clickHandler = (e: React.MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;
        const secondaryText = button.parentElement?.querySelector('span.secondary--text') as HTMLSpanElement;
        const secondaryTextContent = secondaryText?.querySelector('span.secondary--text__content') as HTMLSpanElement;

        if (button.classList.contains('expanded')) {
            secondaryTextContent!.style.cssText = 'opacity: 0';
            secondaryText!.style.cssText = 'height: 0px';
        } else {
            secondaryTextContent!.style.cssText = 'opacity: 1';
            secondaryText!.style.cssText = `height: ${secondaryTextContent.scrollHeight}px`;
        }

        button.classList.toggle('expanded');
    }
    
    return (
        <div className="main--container">
            <section
                className="main"
                style={
                    {
                        background: `linear-gradient(to right, rgba(0, 0, 0, 0.4), #0000004d), url('${mainImage}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }
                }
                ref={headerContext.activeMainPageSection === 'home' ? activeSectionRef : null}>
                    <div className="constrained--container">
                        <div className="main--text">
                            <h1>Administration On Us.</h1>
                            <h2 className="sub--heading margin-top-20">
                                <span>We look after your day to day operations</span>
                                <span className="margin-top-10">so you can focus on growing your business.</span>
                                <button 
                                    className="get--started--button margin-top-10"
                                    onClick={() => {
                                        modal.setModalData({
                                            header: 'Please select an option',
                                            content: <OptionsModalContent />,
                                            confirmationText: 'Ok'
                                        })
                                        modal.toggleModal();
                                    }}
                                >
                                Get Started</button>
                                {
                                    tokenValid ? <button className="export--button margin-top-15 ripple" onClick={
                                        () => {
                                                modal.setModalData({
                                                    header: 'Export data as CSV',
                                                    content: <AdminMarketingExport />
                                                })
                                                modal.toggleModal();
                                            }
                                    }>
                                        <ImportExportIcon />
                                        <span className="text">Export Records</span>
                                    </button>
                                    :
                                    null
                                }
                            </h2>
                        </div>
                    </div>
            </section>

            <section className="Services">
                <div 
                    className="services--section padding-top-bottom-50 constrained--container" >
                        <p className="heading"
                            ref={headerContext.activeMainPageSection === 'services' ? activeSectionRef : null}>What we offer</p>
                        <div className="sub--heading">Our Services</div>
                        <ul className="services--list margin-top-50">
                            {
                                serviceItems.map((el, index) => 
                                    <li key={index} className="margin-top-20">
                                        <button className="icon--and--primary--text" onClick={(e) => clickHandler(e)}>
                                            <span className="icon">{el.icon}</span>
                                            <span className="primary--text margin-top-bottom-10">{el.primaryText}</span>
                                        </button>
                                        {el.secondaryText}
                                    </li>
                                )
                            }
                        </ul>
                </div>

                <div
                    className="online--poker--section padding-top-bottom-100">
                    <div className="constrained--container">
                        <div className="sub--heading">Play Online Poker</div>
                        <div className="description margin-top-30">
                            Join the world’s most popular online Poker games with more tables and more Poker tournaments anywhere online!
                        </div>
                        <ul className="game--links margin-top-30">
                            {countries.map((el, index) => (
                                <li key={index}>
                                    <Link 
                                        to={{pathname: "/sign-up", state: {formType: 'player'}}}>
                                            Play in {el}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div
                    className="contact--section padding-top-bottom-80"
                    ref={headerContext.activeMainPageSection === 'contact-us' ? activeSectionRef : null}>
                        <p className="heading">Interested?</p>
                        <div className="sub--heading">Contact Us</div>
                        <button 
                            className="sign--up--button margin-top-10"
                            onClick={() => {
                                modal.setModalData({
                                    header: 'Please select an option',
                                    content: <OptionsModalContent />,
                                    confirmationText: 'Ok'
                                })
                                modal.toggleModal();
                            }}
                        >
                        Sign up for our service today.</button>
                </div>
            </section>
        </div>
    )
}

export default compose(withTokenValidation)(Main);