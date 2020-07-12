import React, {useState, useEffect, useRef, useContext} from 'react';
import Input, {ResultInterface} from '../../../elements/Input/Input';
import Select from '../../../elements/Select/Select';
import Button from '../../../elements/Button/Button';
import MobileNumberInput from '../../../elements/MobileNumberInput/MobileNumberInput';
import CheckBox from '../../../elements/CheckBox/CheckBox';
import axios from '../../../auxiliary/axios';
import {SelectedCheckboxes} from '../SignUp';

import {useHistory} from 'react-router-dom';

import {ModalContext} from '../../../providers/ModalProvider';
import {Option} from '../SignUp';

interface Props {
    gamePlatforms: Array<Option>
}

function SignUpPlayer({gamePlatforms}: Props) {
    const history = useHistory();
    const modal = useContext(ModalContext);

    const otherPlatformInput = useRef<HTMLDivElement>(null!);
    const otherStakesInput = useRef<HTMLDivElement>(null!);
    const [stakeOptions, setStakeOptions] = useState<Array<Option>>([]);

    const initialState = {value: '', valid: false, error: ''};
    const [firstName, setFirstName] = useState({...initialState});
    const [lastName, setLastName] = useState({...initialState});
    const [email, setEmail] = useState({...initialState});
    const [mobileNumber, setMobileNumber] = useState({...initialState});
    const [platform, setPlatform] = useState({...initialState, value: '1'});
    const [selectedStakes, setSelectedStakes] = useState<SelectedCheckboxes>({value: [], valid: false, error:  ''});

    const [timeStamp, setTimeStamp] = useState(0);

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

        setSelectedStakes({
            ...selectedStakes,
            error: selectedStakes.value.length < 1 ? 'Please select at least 1 Stake' : '',
        });

        const requestData = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            mobile_number: mobileNumber.value,
            game_platform_id: platform.value,
            selected_stakes: JSON.stringify(selectedStakes.value)
        }

        console.log(requestData)

        const result = [
            firstName,
            lastName,
            email,
            mobileNumber,
            platform,
            selectedStakes
        ].map(e => e.valid);

        if (result.every(valid => valid)) {            
            try {
                await axios.post('/v1/marketing/create-player-registration', requestData);
                modal.setModalData({
                    header: 'Success.',
                    content: <div className="padding-top-bottom-20 padding-left-right-20" style={{height: "100%"}}>
                        <div>
                            Thank you for reaching out to us.
                            An account specialist will be contacting you shortly. Thanks! Have a great day.
                        </div>
                        <button
                            onClick={() => {
                                modal.hideModal();
                                history.push('/');
                            }}
                            className="ripple margin-top-30"
                            style={{
                                backgroundColor: 'var(--accent-three-shade-one)',
                                padding: '8px 10px',
                                color: '#fff',
                                width: '100px',
                                boxShadow: '0 2px 4px 1px rgba(0, 0, 0, 0.2)',
                                borderRadius: '4px',
                                border: 'none',
                                fontSize: '14px'
                            }}
                        >Ok</button>
                    </div>,
                    confirmationText: 'Ok'
                })
                modal.toggleModal();
                
                
            } catch(error) {
                console.log(error.response);
            }
        }
    }

    useEffect(() => {
        setPlatform((oldPlatform) => ({
            ...oldPlatform,
            value: gamePlatforms.length > 0 ? gamePlatforms[0].value : '',
            valid: gamePlatforms.length > 0
        }))
    }, [gamePlatforms])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        const initModesOfPayment = async () => {
            const result = await axios.get('/v1/marketing/get-stakes');
            const {stakes} = result.data;
            setStakeOptions(stakes);
        }
        initModesOfPayment();
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
                    options={gamePlatforms}
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
                        stakeOptions.map((el, index) => (
                            <div key={index} className="checkbox">
                                <CheckBox
                                    value={el.value}
                                    text={el.text}
                                    checkCallback={
                                        ({checked, value}) => {
                                            const othersOption = el.text === 'Others';
                                            const input = otherStakesInput.current.querySelector('input') as HTMLInputElement;
                                            const chosenStakes: Array<{id: string, other_data: string}> = [...selectedStakes.value];

                                            if (othersOption) {
                                                otherStakesInput.current.style.height = checked ? '35px' : '0px';
                                                if (!checked) input.value = '';
                                            }

                                            if (checked) {
                                                chosenStakes.push({id: value, other_data: ''});
                                            } else {
                                                const index = chosenStakes.findIndex((el) => el.id === value);
                                                chosenStakes.splice(index, 1);
                                            }
                                            setSelectedStakes({...selectedStakes, value: chosenStakes, valid: chosenStakes.length > 0});
                                        }
                                    }
                                />
                            </div>
                        ))
                    }
                    <div
                        className="others--input"
                        ref={otherStakesInput}
                        onChange={
                            (event) => {
                                const target = event.target as HTMLInputElement;
                                const selected = [...selectedStakes.value];
                                const mode = stakeOptions.find(el => el.text === 'Others');

                                const otherOptionID = mode ? mode.value : -1

                                const index = selected.findIndex(el => el.id === otherOptionID);

                                if (index !== -1) {
                                    selected.splice(index, 1, {
                                        ...selected[index],
                                        other_data: target.value
                                    })
                                    setSelectedStakes((oldValue) => ({...oldValue, value: selected}))
                                }
                            }
                        }>
                        <input type="text" placeholder="Other stakes"/>
                    </div>
                    <div className="input--error">{selectedStakes.error}</div>
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