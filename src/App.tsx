import React from 'react';
import './App.scss';

import {Switch, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import SignUp from './components/SignUp/SignUp';

function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/sign-up"component={SignUp} />
            </Switch>
            <Footer /> 
        </div>
    );
}

export default App;
