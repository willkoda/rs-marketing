import React from 'react';
import './SignUp.scss';
import SignUpOwner from './SignUpOwner/SignUpOwner';
import SignUpPlayer from './SignUpPlayer/SignUpPlayer';

import registrationImage from '../../assets/images/registration.jpg';

interface Props {
    location: {
        state: {
            formType: string;
        }
    }
}
function SignUp({location}: Props) {
    const renderForm = () => {
        if (location.state) {
            if (location.state && location.state.formType === 'player') {
                return  <SignUpPlayer />;
            }
            return <SignUpOwner />;
        }
        
        return <SignUpOwner />;
    }

    return (
        <div className="SignUp padding-top-80">
            <div className="background--image"
                style={{
                    background: `linear-gradient(to right, rgba(0, 0, 0, 0.4), #0000004d), url('${registrationImage}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                    <h1 className="main--header">Interested in our services?</h1>
            </div>
            <div className="form--section padding-top-bottom-20">
                {renderForm()}
            </div>
        </div>
    )
}

export default SignUp;