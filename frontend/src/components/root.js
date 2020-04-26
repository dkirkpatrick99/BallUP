import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';
import { Scrollbars } from 'react-custom-scrollbars';

const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <Scrollbars style={{ height: "100vh"}}>
                <App />
            </Scrollbars>
        </HashRouter>
    </Provider>
);

export default Root;