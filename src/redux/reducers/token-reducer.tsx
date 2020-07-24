const initialState: TokenState = {
    accessToken: localStorage.getItem('admin--desk--marketing__accessToken'),
    clientID: localStorage.getItem('admin--desk--marketing__clientID'),
    uid: localStorage.getItem('admin--desk--marketing__uid')
}

const actions = {
    REMOVE_TOKEN: 'REMOVE_TOKEN',
    SET_TOKEN: 'SET_TOKEN'
}

interface ActionInterface {
    payload: TokenState,
    type: string
}

const storeToken = (payload: TokenState) => {
    Object.entries(payload).forEach(el => {
        if (el[1]) {
            localStorage.setItem('admin--desk--marketing__' + el[0], el[1])
        }
    })
}

function reducer(state = initialState, action: ActionInterface) {
    switch (action.type) {
        case actions.REMOVE_TOKEN:
            localStorage.removeItem('admin--desk--marketing__accessToken');
            localStorage.removeItem('admin--desk--marketing__clientID');
            localStorage.removeItem('admin--desk--marketing__uid');
            return {
                ...state,
                accessToken: null,
                clientID: null,
                uid: null
            }

        case actions.SET_TOKEN:
            storeToken(action.payload);
            return {
                ...state,
                ...action.payload
            }
        default: {
            return state;
        }
    }
}
export interface TokenState {
    accessToken: string | null,
    clientID: string | null,
    uid: string | null
}
export default reducer;