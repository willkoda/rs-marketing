import React from 'react';
import './App.scss';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Services from './components/Services/Services';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <div className="App">
            <Header />
            <Main />
            <Services />
            <Footer />
        </div>
    );
}

export default App;
