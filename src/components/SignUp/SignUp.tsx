import React, {useEffect, useState} from 'react';
import './SignUp.scss';
import SignUpOwner from './SignUpOwner/SignUpOwner';
import SignUpPlayer from './SignUpPlayer/SignUpPlayer';

import axios from 'auxiliary/axios';
import registrationImage from 'assets/images/registration.jpg';

interface Props {
    location: {
        state: {
            formType: string;
        }
    }
}
function SignUp({location}: Props) {
    const [gamePlatforms, setGamePlatforms] = useState<Array<Option>>([]);

    const renderForm = () => {
        if (location.state) {
            if (location.state && location.state.formType === 'player') {
                return  <SignUpPlayer gamePlatforms={gamePlatforms} />;
            }
            return <SignUpOwner gamePlatforms={gamePlatforms} />;
        }
        
        return <SignUpOwner gamePlatforms={gamePlatforms} />;
    }

    useEffect(() => {
        const initGamePlatforms = async () => {
            const result = await axios.get('/v1/marketing/game-platforms');
            const {game_platforms} = result.data;
            setGamePlatforms(game_platforms);
        }
        initGamePlatforms();
    }, [])

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

export interface Option {
    value: string;
    text: string;
}

export interface MultipleChoices {
    valid: boolean;
    error: string;
    value: Array<{id: string, other_data: string}>
}

export default SignUp;