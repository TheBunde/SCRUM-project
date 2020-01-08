import React from "react";
import ReactDOM from "react-dom";
import RegisterPage from "./components/Pages/RegisterPage/RegisterPage";

test("RegisterPage rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegisterPage/>, div);
    ReactDOM.unmountComponentAtNode(div)
});
