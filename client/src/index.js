import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link, Redirect} from 'react-router-dom';
import './css/index.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import ToTop from './components/ToTop/ToTop.js';
import {auth} from "./components/LoginForm/LoginForm.js";
import Footer from './components/Footer/Footer.js';
import LoginPage from './components/Pages/LoginPage/LoginPage.js';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage.js';
import OverviewPage from './components/Pages/OverviewPage/OverviewPage.js';
import MainPage from './components/Pages/MainPage/MainPage.js';
import EventPage from './components/Pages/EventPage/EventPage.js';
import EventView from './components/Pages/EventView/EventView.js';
import EditEvent from './components/Pages/EditEvent/EditEvent.js';
import AddEvent from './components/Pages/AddEvent/AddEvent.js';
import About from './components/About/About.js';

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        auth.authenticated === true // This is the check for authentication. Later use tokens instead when implemented. Then we good.
        ? <Component {...props}/>
        : <Redirect to="/login" />
    )}/>
)

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/about" component={About} />
            <PrivateRoute exact path="/overview" component={OverviewPage} />
            <PrivateRoute exact path="/event" component={EventPage} />
            <PrivateRoute exact path="/event/:id" component={EventView} />
            <PrivateRoute exact path="/event/:id/edit" component={EditEvent} />
            <PrivateRoute exact path="/overview/addEvent" component={AddEvent} />
            <ToTop />
            <Footer />
        </div>
    </HashRouter>
    , (document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
