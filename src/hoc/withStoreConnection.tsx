import React from 'react';
import {connect} from 'react-redux';
import {
    storeSetToken,
    storeRemoveToken
} from 'auxiliary/dispatch';
import {token} from 'auxiliary/state';

import {TokenState} from 'redux/reducers/token-reducer';

type indexSignature = {
    [key: string]: any
};
export default function withStoreConnection(params: {stateProps?: Array<String>, dispatchProps?: Array<String>}) {
    const mapStateToProps = (state: any) => {
        const storeState: indexSignature = {
            [token]: state[token]
        }
        if (!params.stateProps) return {};
        return params.stateProps.reduce((acc: Object, curr: any) => {
            if (Object.prototype.hasOwnProperty.call(storeState, curr)) {
                return {
                    ...acc,
                    ...{[curr]: storeState[curr]}
                }
            } else {
                throw new Error(`${curr} property is not in storeState`);
            }
        }, {});
    };
    
    const mapDispatchToProps = (dispatch: Function) => {
        const storeDispatch: indexSignature = {
            [storeSetToken]: (responseObject: TokenState) => dispatch({type: 'SET_TOKEN', payload: responseObject}),
            [storeRemoveToken]: () => dispatch({type: 'REMOVE_TOKEN'})
        };
        if (!params.dispatchProps) return {};
        return params.dispatchProps.reduce((acc: Object, curr: any) => {
            if (Object.prototype.hasOwnProperty.call(storeDispatch, curr)) {
                return {
                    ...acc,
                    ...{[curr]: storeDispatch[curr]}
                }
            } else {
                throw new Error(`${curr} property is not in storeDispatch`);
            }
        }, {});
    };

    return function (Component: any) {
        function EnhancedComponent(props: any) {
            return <Component {...props} />
        }
        return connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent);
    }
}