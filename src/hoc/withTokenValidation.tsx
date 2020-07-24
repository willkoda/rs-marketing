import React, {useCallback} from 'react';
import axios from '../auxiliary/axios';

interface Props {
    accessToken: string | null;
    clientID: string | null;
    uid: string | null;
}

function tokenValidation(Component: any) {
    return function EnhancedComponent(props: Props) {
        const validateToken = useCallback(async () => {
            try {
                await axios.get('/auth/validate_token');
                return true;
            }
            catch (error) {
                console.log(error.response)
                return false;
            }
        }, []);
        
        return (
            <Component validateToken={validateToken} {...props} />
        )
    }
}

export default tokenValidation;