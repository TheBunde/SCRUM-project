import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link, Redirect} from 'react-router-dom';
import './css/index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import ToTop from './components/ToTop/ToTop.js';
import {auth, authenticate} from "./service/UserService.js";
import LoginPage from './components/Pages/LoginPage/LoginPage.js';
import RegisterPage from './components/Pages/RegisterPage/RegisterPage.js';
import OverviewPage from './components/Pages/OverviewPage/OverviewPage.js';
import MainPage from './components/Pages/MainPage/MainPage';
import EventPage from './components/Pages/EventPage/EventPage.js';
import EventView from './components/Pages/EventView/EventView.js';
import EditEvent from './components/Pages/EditEvent/EditEvent.js';
import AddEvent from './components/Pages/AddEvent/AddEvent.js';
import About from './components/Pages/About/About.js';
import ShowProfile from "./components/Pages/ShowProfile/ShowProfile";
import EditProfile from "./components/Pages/EditProfile/EditProfile";
import AdminUserPage from './components/Pages/AdminUsersPage/AdminUsersPage';
import EditUserPage from "./components/Pages/EditUserPage/EditUserPage";

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const RestrictedRoute = ({component: Component, authorized, ...rest}) => (
    <Route {...rest} render={(props) => (
        authenticate(),
        console.log("Testing authorization"),
        auth.authenticated === true
        ? authorized.includes(auth.role) === true ? <Component {...props} /> : <Redirect to="overview" />
        : <Redirect to="login" />
    )}/>
);

/*const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        authenticate(),
        auth.authenticated === true // This is the check for authentication. Later use tokens instead when implemented. Then we good.
        ? <Component {...props}/>
        : <Redirect to="/login" />
    )}/>
);

const AdminRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        authenticate(),
            auth.role === '"admin"'  && auth.authenticated === true
        ? <Component {...props} />
        : <Redirect to={"/overview"}/>
    )} />
);*/

const restriction = {
    admin: "admin",
    regular: ["admin", "Sceneansvarlig", "Økonomiansvarlig", "Barsjef", "Bartender", "Handyman", "Fotograf", "Markedsfører", "SoMe-ansvarlig", "Ølbrygger", "Lydtekniker", "Lystekniker", "Scenerigger", "Artistbooker", "Artistkontakt", "Konseptutvikler", "Quizmaster", "Festplanlegger"] 
} 

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/about" component={About} />
            <RestrictedRoute exact path="/overview" component={OverviewPage} authorized={restriction.regular} />
            <RestrictedRoute exact path="/profile/:userID" component={ShowProfile} authorized={restriction.regular} />
            <RestrictedRoute exact path="/profile/:userID/edit" component={EditProfile} authorized={restriction.regular} />
            <RestrictedRoute exact path="/event" component={EventPage} authorized={restriction.regular} />
            <RestrictedRoute exact path="/event/:id" component={EventView} authorized={restriction.regular}/>
            <RestrictedRoute exact path="/event/:id/edit" component={EditEvent} authorized={restriction.regular} />
            <RestrictedRoute exact path="/overview/addEvent" component={AddEvent} authorized={restriction.regular} />
            <RestrictedRoute exact path="/admin" component={AdminUserPage} authorized={restriction.admin} />
            <RestrictedRoute exact path="/admin/users" component={AdminUserPage} authorized={restriction.admin} />
            <RestrictedRoute exact path="/admin/users/:id/edit" component={AdminUserPage} authorized={restriction.admin} />
        </div>
    </HashRouter>
    , (document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
