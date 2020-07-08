import React, {useState, useEffect, useRef} from 'react';
import Input, {ResultInterface} from '../../../elements/Input/Input';
import Select from '../../../elements/Select/Select';
import Button from '../../../elements/Button/Button';
import MobileNumberInput from '../../../elements/MobileNumberInput/MobileNumberInput';
import CheckBox from '../../../elements/CheckBox/CheckBox';

function SignUpOwner() {
    const othersInput = useRef<HTMLDivElement>(null!);

    const initialState = {value: '', valid: true, error: ''};
    const [firstName, setFirstName] = useState({...initialState});
    const [lastName, setLastName] = useState({...initialState});
    const [email, setEmail] = useState({...initialState});
    const [mobileNumber, setMobileNumber] = useState({...initialState});
    const [platform, setPlatform] = useState({...initialState, value: '1'});
    const [clubName, setClubName] = useState({...initialState});
    const [clubID, setClubID] = useState({...initialState});

    const [timeStamp, setTimeStamp] = useState(0);

    const platformOptions = [
        {text: 'PPPoker', value: '1', id: '1'},
        {text: 'PokerBros', value: '2', id: '2'},
        {text: 'UPoker', value: '3', id: '3'}
    ];

    const modesOfPayment = [
        {id: 'banks', text: 'Banks'},
        {id: 'g-cash', text: 'GCash'},
        {id: 'pay-maya', text: 'PayMaya'},
        {id: 'coins-ph', text: 'Coins.Ph'},
        {id: 'bitcoin', text: 'Bitcoin'}
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
                    options={platformOptions}
                    select={
                        (result) => setPlatform({value: result.value, valid: result.valid, error: ''})
                    }
                    selectColor="var(--medium-grey)"
                    selectText="Select a Platform"
                    initialValue="PPPoker"
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
                    validatedProps={{minLength: 3, english: true}}
                    valid={clubID.valid} 
                    error={clubID.error}
                    timeStamp={timeStamp}
                />

                <p className="text-align-left">Available Mode of Payment:</p>
                <div className="modes--of--payment">
                    {
                        modesOfPayment.map((el, index) => (
                            <div key={index} className="checkbox">
                                <CheckBox id={el.id} text={el.text} />
                            </div>
                        ))
                    }
                    <div className="checkbox">
                        <CheckBox
                            id={'others'}
                            text={'Others'}
                            checkCallback={(checked: Boolean) => {
                                othersInput.current.style.height = checked ? '35px' : '0px';
                                const input = othersInput.current.querySelector('input') as HTMLInputElement;
                                if (!checked) input.value = '';
                            }}
                        />
                    </div>
                    <div className="others--input" ref={othersInput}>
                        <input type="text" />
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

export default SignUpOwner;