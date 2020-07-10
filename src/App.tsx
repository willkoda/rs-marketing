import React, {useEffect} from 'react';
import './App.scss';

import {Switch, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import SignUp from './components/SignUp/SignUp';
import Modal from './elements/Modal/Modal';

import HeaderProvider from './providers/HeaderProvider';
import ModalProvider, {ModalContext} from './providers/ModalProvider';

declare global {
    interface Window { 
        Tawk_API: any; 
        Tawk_LoadStart: any;
    }
}

function App() {
    useEffect(() => {
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
    
        const scriptSource = process.env.REACT_TAWK_URL || 'https://embed.tawk.to/5f05c9f567771f3813c0a57a/default';
        const s1 = document.querySelector(`script[src='${scriptSource}']`) || document.createElement("script") as any;
        const s0 = document.getElementsByTagName("script")[0] as any;
    
        s1.async = true;
        s1.src = scriptSource;
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1, s0);
    
        const chatWidget = document.querySelector("iframe[title='chat widget']") as HTMLIFrameElement;
        if (chatWidget) {
            chatWidget.parentElement!.classList.add('chat--widget');
            chatWidget.parentElement!.style.display = 'block';
        }
    
        return () => {
            const chatWidget = document.querySelector("iframe[title='chat widget']");
            if (chatWidget) {
                chatWidget.parentElement!.setAttribute('id', '');
                chatWidget!.parentElement!.style.display = 'none';
            }    
        }
    }, []);
        
    return (
        <div className="App">
            <HeaderProvider>
                <ModalProvider>
                    <Modal 
                        context={ModalContext}
                    />
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/sign-up"component={SignUp} />
                    </Switch>
                    <Footer />
                </ModalProvider>
            </HeaderProvider>
        </div>
    );
}

export default App;