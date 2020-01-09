import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import './css/index.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import ToTop from './components/ToTop/ToTop.js';
import LoginPage from './components/Pages/LoginPage/LoginPage.js'
import RegisterPage from './components/Pages/RegisterPage/RegisterPage.js'
import OverviewPage from './components/Pages/OverviewPage/OverviewPage.js'
import MainPage from './components/Pages/MainPage/MainPage.js'
import EventPage from './components/Pages/EventPage/EventPage.js'
import EventView from './components/Pages/EventView/EventView.js'
import EditEvent from './components/Pages/EditEvent/EditEvent.js'
import AddEvent from './components/Pages/AddEvent/AddEvent.js'

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/overview" component={OverviewPage} />
            <Route exact path="/event" component={EventPage} />
            <Route exact path="/event/:id" component={EventView} />
            <Route exact path="/event/:id/edit" component={EditEvent} />
            <Route exact path="/overview/addEvent" component={AddEvent} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/admin/users" component={AdminUserPage}/>
            <ToTop />
        </div>
    </HashRouter>
    , (document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
