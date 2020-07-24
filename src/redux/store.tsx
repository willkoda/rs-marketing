import {createStore, combineReducers} from 'redux';
import tokenReducer from './reducers/token-reducer';

const mainReducer = combineReducers({
    token: tokenReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any
    }
}

const store = createStore(mainReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;