import React, {useState, useEffect, useRef, useContext} from 'react';
import Input, {ResultInterface} from '../../../elements/Input/Input';
import Select from '../../../elements/Select/Select';
import Button from '../../../elements/Button/Button';
import MobileNumberInput from '../../../elements/MobileNumberInput/MobileNumberInput';
import CheckBox from '../../../elements/CheckBox/CheckBox';

import {useHistory} from 'react-router-dom';
import {Option} from '../SignUp';

import {ModalContext} from '../../../providers/ModalProvider';
import axios from '../../../auxiliary/axios';

interface SelectedPaymentMode {
    valid: boolean;
    error: string;
    value: Array<{id: string, other_data: string}>
}

interface Props {
    gamePlatforms: Array<Option>
}

function SignUpOwner({gamePlatforms}: Props) {
    const history = useHistory();
    const modal = useContext(ModalContext);
    const [modesOfPayment, setModesOfPayment] = useState<Array<Option>>([]);

    const othersInput = useRef<HTMLDivElement>(null!);

    const initialState = {value: '', valid: false, error: ''};
    const [firstName, setFirstName] = useState({...initialState});
    const [lastName, setLastName] = useState({...initialState});
    const [email, setEmail] = useState({...initialState});
    const [mobileNumber, setMobileNumber] = useState({...initialState});
    const [platform, setPlatform] = useState({...initialState, value: '1', valid: true});
    const [clubName, setClubName] = useState({...initialState});
    const [clubID, setClubID] = useState({...initialState});
    const [selectedModesOfPayment, setSelectedModesOfPayment] = useState<SelectedPaymentMode>({value: [], valid: false, error:  ''});

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
            case 'clubName':
                    setClubName(newState);
                break;
            case 'clubID':
                    setClubID(newState);
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
        setClubName({...clubName, error: clubName.valid ? '' : clubName.error || 'Club Name is invalid'});
        setClubID({...clubID, error: clubID.valid ? '' : clubID.error || 'Club ID is invalid'});
        setSelectedModesOfPayment({
            ...selectedModesOfPayment,
            error: selectedModesOfPayment.value.length < 1 ? 'Please select at least 1 mode of payment' : '',
        });

        const requestData = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            mobile_number: mobileNumber.value,
            platform: platform.value,
            club_name: clubName.value,
            club_id: clubID.value,
            selected_modes_of_payment: JSON.stringify(selectedModesOfPayment.value)
        }

        const result = [
            firstName,
            lastName,
            email,
            mobileNumber,
            platform,
            clubName,
            clubID,
            selectedModesOfPayment
        ].map(e => e.valid);
    
        if (result.every(valid => valid)) {            
            try {
                await axios.post('/v1/marketing/create-club-owner-registration', requestData);
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
                console.log(error.response)
            }
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        const initModesOfPayment = async () => {
            const result = await axios.get('/v1/marketing/get-modes-of-payment');
            const {modes_of_payment} = result.data;
            setModesOfPayment(modes_of_payment);
        }
        initModesOfPayment();
    }, [])

    useEffect(() => {
        setPlatform((oldPlatform) => ({
            ...oldPlatform,
            value: gamePlatforms[0] ? gamePlatforms[0].value : '',
            valid: gamePlatforms[0] ? true : false 
        }))
    }, [gamePlatforms])

    return (
        <div className="constrained--container form--section--container">
            <p>Are you the owner of a club? Interested in availing of our services? Please fill in the form below and we’ll get back to you!</p>
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
                        (result) => setPlatform({value: result.value, valid: result.valid, error: ''})
                    }
                    selectColor="var(--medium-grey)"
                    selectText="Select a Platform"
                    initialValue={gamePlatforms[0] ? gamePlatforms[0].text : ''}
                />

                <Input 
                    id="clubName" 
                    margin="margin-top-20"
                    inputBorderColor="var(--accent-one-shade-two)"
                    placeholder="Club Name" 
                    value={clubName.value} 
                    changeCallback={changeHandler}
                    validatedProps={{minLength: 3, english: true}}
                    valid={clubName.valid} 
                    error={clubName.error}
                    timeStamp={timeStamp}
                />

                <Input 
                    id="clubID"
                    margin="margin-top-20"
                    inputBorderColor="var(--accent-one-shade-two)"
                    placeholder="Club ID" 
                    value={clubID.value} 
                    changeCallback={changeHandler}
                    validatedProps={{minLength: 3}}
                    valid={clubID.valid} 
                    error={clubID.error}
                    timeStamp={timeStamp}
                />

                <p className="text-align-left">Available Mode of Payment:</p>
                <div className="modes--of--payment">
                    {
                        modesOfPayment.map((el, index) => (
                            <div key={index} className="checkbox">
                                <CheckBox 
                                    value={el.value} text={el.text}
                                    checkCallback={
                                        ({checked, value}) => {
                                            const othersOption = el.text === 'Others';
                                            const input = othersInput.current.querySelector('input') as HTMLInputElement;
                                            const selectedModes: Array<{id: string, other_data: string}> = [...selectedModesOfPayment.value];

                                            if (othersOption) {
                                                othersInput.current.style.height = checked ? '35px' : '0px';
                                                if (!checked) input.value = '';
                                            }

                                            if (checked) {
                                                selectedModes.push({id: value, other_data: ''});
                                            } else {
                                                const index = selectedModes.findIndex((el) => el.id === value);
                                                selectedModes.splice(index, 1);
                                            }
                                            setSelectedModesOfPayment({...selectedModesOfPayment, value: selectedModes, valid: selectedModes.length > 0});
                                        }
                                    }
                                />
                            </div>
                        ))
                    }
                    {/* <div
                        className="others--input"
                        ref={othersInput}
                        onChange={
                            (event) => {
                                const target = event.target as HTMLInputElement;
                                const selectedModes = [...selectedModesOfPayment.value];
                                const mode = modesOfPayment.find(el => el.text === 'Others');

                                const otherOptionID = mode ? mode.value : -1

                                const index = selectedModes.findIndex(el => el.id === otherOptionID);

                                if (index !== -1) {
                                    selectedModes.splice(index, 1, {
                                        ...selectedModes[index],
                                        other_data: target.value
                                    })
                                    setSelectedModesOfPayment((oldValue) => ({...oldValue, value: selectedModes}))
                                }
                            }
                        }
                    >
                            <input type="text" />
                    </div>
                    <div className="input--error">{selectedModesOfPayment.error}</div> */}
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

export default SignUpOwner;