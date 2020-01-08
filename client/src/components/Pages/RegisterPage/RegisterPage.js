import React, {Component} from 'react';

import Navbar from '../../Navbar/Navbar'
import "./RegisterPage.css"
import UserService, {User} from "../../../services/UserService.js";




class RegisterPage extends Component{

    state = {
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        repeatedPassword: "",

    };
    
    render() {
        return (
            <div className={"registerContainer"}>
                <Navbar />
                <h1 id={"regTitle"}>Registrer ny bruker</h1>

                <form>
                    <div className="form-group">


                        <label htmlFor="exampleInputEmail1">Navn: </label>
                        <input type="name" name={"name"} className="form-control" id="firstNameInput"
                               onChange={this.handleTextChange.bind(this)} aria-describedby="emailHelp" placeholder="Navn..."/>


                        <label htmlFor="exampleInputEmail1">Email: </label>
                        <input type="email" name={"email"} className="form-control" id="emailInput"
                               onChange={this.handleTextChange.bind(this)}
                               aria-describedby="emailHelp" placeholder="Email..."/>

                        <label htmlFor="exampleInputEmail1">Telefon:</label>
                        <input type="phone" name={"phone"} className="form-control" id="exampleInputEmail1"
                               onChange={this.handleTextChange.bind(this)}
                               aria-describedby="emailHelp" placeholder="Telefon..."/>

                        <label htmlFor="exampleInputPassword1">Passord:</label>
                        <input type="password" name="password" className="form-control" id="passwordInput"
                               onChange={this.handleTextChange.bind(this)}
                               placeholder="Passord..."/>

                        <label htmlFor="exampleInputPassword1">Gjenta passord:</label>
                        <input type="password" name={"repeatedPassword"} className="form-control" id="passwordInput"
                               onChange={this.handleTextChange.bind(this)}
                               placeholder="Gjenta passord..."/>


                        <label htmlFor="exampleInputEmail1">Rolle:</label>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" onClick={event => this.handleDropdownChange(event)}
                                        value={"rolle1"} type="button">Rolle 1</button>
                                <button className="dropdown-item" onClick={event => this.handleDropdownChange(event)}
                                        value={"rolle2"} type="button">Rolle 2</button>
                                <button className="dropdown-item" onClick={event => this.handleDropdownChange(event)}
                                        value={"rolle3"} type="button">Rolle 3</button>
                            </div>
                        </div>

                        <button type="button"
                                id={"regBtn"}
                                className="btn btn-primary btn-lg"
                                onClick={(event) => this.regUser(event)}>Registrer
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    handleDropdownChange = event => {
        event.preventDefault();
        this.setState({
            role: event.target.value
        });
    };

    handleTextChange = event => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    regUser = () => {
        {if(this.state.password === this.state.repeatedPassword){
            let userService = new UserService();
            let user = new User(this.state.name, this.state.email, this.state.phone, this.state.password, null, null);
            userService.registerUser(user)
                .then(() => {
                    console.log("Registration complete");
                })
                .catch((error) => {
                    console.error(error);
                })
        }else{
            console.log("The registration did not work");

        }}
        console.log("Navn: " + this.state.name + ", email: " + this.state.email + ", telefon: " + this.state.phone +
            ", rolle: " + this.state.role + ", passord: " + this.state.password + ", r.password: " + this.state.repeatedPassword);
    };

    componentDidMount() {

    }

}

export default RegisterPage;