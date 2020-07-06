import React, {useState} from 'react';
import './SignUp.scss';
import Input, {ResultInterface} from '../../elements/Input/Input';
import Select from '../../elements/Select/Select';
import Button from '../../elements/Button/Button';

function SignUp() {

    const initialState = {value: '', valid: true, error: ''};
    const [firstName, setFirstName] = useState({...initialState});
    const [lastName, setLastName] = useState({...initialState});
    const [email, setEmail] = useState({...initialState});
    const [platform, setPlatform] = useState({...initialState});
    const [clubName, setClubName] = useState({...initialState});
    const [clubID, setClubID] = useState({...initialState});

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

        // setName({...name, error: name.valid ? '' : name.error || 'Name is invalid'});
        // setIdentifier({...identifier, error: identifier.valid ? '' : 'Club ID is invalid'});
        // setURL({...url, error: url.valid ? '' : 'URL is invalid'});
        // setOwner({...owner, error: owner.valid ? '' : 'Owner is invalid'});

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

    return (
        <div className="SignUp padding-top-80">
            <div className="background--image">
                <h1 className="main--header">Interested in our services?</h1>
            </div>
            <div className="form--section padding-top-bottom-20">
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

                        <Select
                            id="owner"
                            margin="margin-top-30"
                            error={platform.error}
                            options={
                                [
                                    {text: 'PPPoker', value: '1'}
                                ]
                            }
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

                        <Button
                            width="250px"
                            text="Submit"
                            backgroundColor="accent--three"
                            // waveColor="rgba(0, 0, 0, 0.2)"
                            waveColor="blue"
                            margin="margin-top-20"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;