import React from 'react';

import Theme from 'app/Theme';
import ScrollToTop from "app/ScrollToTop";
import Background from "app/Background";
import Header from 'sections/Header';
import Footer from 'sections/Footer';
import Content from 'sections/Content';
import Router from "app/Router";
import 'app/extensions'
import AxiosErrorHandler from "app/AxiosErrorHandler";
import MensajedeConfirmacion from "app/MensajedeConfirmacion";


export default () => {
    return (
        <Theme>
            <Router>
                <Background>
                    <AxiosErrorHandler/>
                    <ScrollToTop/>
                    <MensajedeConfirmacion>
                        <Header/>
                        <Content/>
                        <Footer/>
                    </MensajedeConfirmacion>
                </Background>
            </Router>
        </Theme>
    )
}
