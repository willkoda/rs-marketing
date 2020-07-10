import React, {useState, useEffect, useRef} from 'react';
import Input, {ResultInterface} from '../../../elements/Input/Input';
import Select from '../../../elements/Select/Select';
import Button from '../../../elements/Button/Button';
import MobileNumberInput from '../../../elements/MobileNumberInput/MobileNumberInput';
import CheckBox from '../../../elements/CheckBox/CheckBox';

import {Option} from '../SignUp';

function SignUpPlayer() {
    const [gamePlatforms, setGamePlatforms] = useState<Array<Option>>([]);

    const otherPlatformInput = useRef<HTMLDivElement>(null!);
    const otherStakesInput = useRef<HTMLDivElement>(null!);

    const initialState = {value: '', valid: true, error: ''};
    const [firstName, setFirstName] = useState({...initialState});
    const [lastName, setLastName] = useState({...initialState});
    const [email, setEmail] = useState({...initialState});
    const [mobileNumber, setMobileNumber] = useState({...initialState});
    const [platform, setPlatform] = useState({...initialState, value: '1'});

    const [timeStamp, setTimeStamp] = useState(0);

    const platformOptions = [
        {text: 'PPPoker', value: '1', id: '1'},
        {text: 'PokerBros', value: '2', id: '2'},
        {text: 'UPoker', value: '3', id: '3'},
        {text: 'Others', value: '4', id: '4'}
    ];

    const stakes = [
        {id: 'micro', text: 'Micro'},
        {id: 'low', text: 'Low'},
        {id: 'high', text: 'High'}
    ]

    const changeHandler = (result: ResultInterface) => {
        const newState = {...result};
        delete newState.origin

        switch(result.origin) {
            case 'firstName':
                    setFirstName(newState);
                break;
            case 'lastName':
                    setLastName(newState);
                break;
            case 'email':
                    setEmail(newState);
                break;
            case 'mobileNumber':
                    setMobileNumber(newState);
                break;
            case 'platform':
                    setPlatform(newState);
                break;
            default:
                throw new Error(`${result.origin} is not a valid origin`);
        }
    };

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTimeStamp(Date.now());

        setFirstName({...firstName, error: firstName.valid ? '' : firstName.error || 'First name is invalid'});
        setLastName({...lastName, error: lastName.valid ? '' : lastName.error || 'Last name is invalid'});
        setEmail({...email, error: email.valid ? '' : email.error || 'Email is invalid'});
        setMobileNumber({...mobileNumber, error: mobileNumber.valid ? '' : mobileNumber.error || 'Mobile Number is invalid'});
        setPlatform({...platform, error: platform.valid ? '' : platform.error || 'Platform is invalid'});

        // const requestData = {
        //     id: club.id,
        //     name: name.value,
        //     identifier: identifier.value,
        //     url: url.value,
        //     user_id: owner.value
        // }

        // const result = [
        //     name,
        //     identifier,
        //     url,
        //     owner
        // ].map(e => e.valid);

        // if (result.every(valid => valid)) {            
        //     try {
        //         await axios.patch(`/v1/organizations/${club.id}`, requestData);

        //         notice.setNoticeText('Successfully updated club information.');
        //         notice.setNoticeState('success');
        //         notice.setNoticeTimestamp(Date.now()); 

        //         successCalback();
        //         getOwners();
        //         modal.hideModal();
                
                
        //     } catch(error) {
        //         if (/index_organizations_on_identifier/.test(error.response.data.error)) {
        //             setIdentifier({...identifier, valid: false, error: 'Club ID is already taken'});
        //         }
        //     }
        // }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <div className="constrained--container form--section--container">
            <p>Are you a player? Interested in availing of our services? Please fill in the form below and we’ll get back to you!</p>
            <form className="max-width-400 margin-left-right-auto margin-top-40" onSubmit={formSubmit}>
                <Input 
                    id="firstName" 
                    inputBorderColor="var(--accent-one-shade-two)"
                    placeholder="First Name" 
                    value={firstName.value} 
                    changeCallback={changeHandler}
                    validatedProps={{minLength: 3, english: true}}
                    valid={firstName.valid} 
                    error={firstName.error}
                    timeStamp={timeStamp}
                />

                <Input 
                    id="lastName"
                    margin="margin-top-20"
                    inputBorderColor="var(--accent-one-shade-two)"
                    placeholder="Last Name" 
                    value={lastName.value} 
                    changeCallback={changeHandler}
                    validatedProps={{minLength: 3, english: true}}
                    valid={lastName.valid} 
                    error={lastName.error}
                    timeStamp={timeStamp}
                />

                <Input 
                    id="email" 
                    margin="margin-top-20"
                    inputBorderColor="var(--accent-one-shade-two)"
                    placeholder="Email" 
                    value={email.value} 
                    changeCallback={changeHandler}
                    validatedProps={{email: true}}
                    valid={email.valid} 
                    error={email.error}
                    timeStamp={timeStamp}
                />

                <MobileNumberInput 
                    change={changeHandler}
                    error={mobileNumber.error}
                    margin="margin-top-20"
                    id="mobileNumber"
                    timeStamp={timeStamp}
                    value={mobileNumber.value}
                    valid={mobileNumber.valid}
                />

                <Select
                    id="platform"
                    margin="margin-top-30"
                    error={platform.error}
                    options={platformOptions}
                    select={
                        (result) => {
                            setPlatform({value: result.value, valid: result.valid, error: ''});
                            otherPlatformInput.current.style.height = result.value === '4' ? '35px' : '0px';
                            const input = otherPlatformInput.current.querySelector('input') as HTMLInputElement;
                            if (result.value !== '4') input.value = '';
                        }
                    }
                    selectColor="var(--medium-grey)"
                    selectText="Select a Platform"
                    initialValue="PPPoker"
                />

                <div className="others--input" ref={otherPlatformInput}>
                    <input type="text" placeholder="Enter platform"/>
                </div>

                <p className="text-align-left">Stakes:</p>
                <div className="stakes">
                    {
                        stakes.map((el, index) => (
                            <div key={index} className="checkbox">
                                <CheckBox value={el.id} text={el.text} />
                            </div>
                        ))
                    }
                    <div className="checkbox">
                        <CheckBox
                            value={'others'}
                            text={'Others'}
                            checkCallback={({checked, value}) => {
                                otherStakesInput.current.style.height = checked ? '35px' : '0px';
                                const input = otherStakesInput.current.querySelector('input') as HTMLInputElement;
                                if (!checked) input.value = '';
                            }}
                        />
                    </div>
                    <div className="others--input" ref={otherStakesInput}>
                        <input type="text" placeholder="Other stakes"/>
                    </div>
                </div>

                <Button
                    width="250px"
                    text="Submit"
                    backgroundColor="accent--three"
                    waveColor="blue"
                    margin="margin-top-20"
                />
            </form>
        </div>
    )
}

export default SignUpPlayer;