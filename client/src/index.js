import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

import ToTop from './components/ToTop/ToTop';

ReactDOM.render(
    <HashRouter>
        <div>
            <ToTop />
        </div>
    </HashRouter>
    , (document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
