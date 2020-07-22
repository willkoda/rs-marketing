import React, {useContext} from 'react';
import './OptionsModalContent.scss';
import smartPhone from '../../../assets/images/smartphone.svg';
import clubOwner from '../../../assets/images/club-owner.svg';
import {useHistory} from 'react-router-dom';
import {ModalContext} from '../../../providers/ModalProvider';

function OptionsModalContent() {
    const history = useHistory();
    const modal = useContext(ModalContext);

    const clickHandler = (formType: string) => {
        history.push('/sign-up', {formType: formType});
        modal.hideModal();
    }
    return (
        <div className="modal--content" style={{position: 'relative'}}>
            <div className="background"></div>
            <div className="padding-top-bottom-40 padding-left-right-40 media-600-padding-left-right-15">
                <p style={{color: '#fff', fontWeight: 600, fontSize: '16px'}}>Which one are you?</p>
                <div className="options--container">
                    <div className="option padding-20">
                        <div className="hexagon">
                            <svg width="175" height="200">
                                <polyline points="87,0 174,50 174,150 87,200 0,150 0,50 87,0"></polyline>
                            </svg>
                            <img src={smartPhone} alt="Player"/>
                        </div>
                        <button className="ripple" onClick={() => clickHandler('player')}>I'm a Player</button>
                    </div>

                    <div className="option padding-20">
                        <div className="hexagon">
                            <svg width="175" height="200">
                                <polyline points="87,0 174,50 174,150 87,200 0,150 0,50 87,0"></polyline>
                            </svg>
                            <img src={clubOwner} alt="Club Owner"/>
                        </div>
                        <button className="club--owner--button ripple" onClick={() => clickHandler('club-owner')}>I'm a Club Owner</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OptionsModalContent;