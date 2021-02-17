import React, {Component} from "react";
import {Link, Route, BrowserRouter as Router} from "react-router-dom"
import './App.css';


import Login from "./pages/Login"
import Tool from "./pages/Tool"


class App extends Component {
    render() {
        return (
            <Router>
                <div className={"App"}>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Tool}/>
                </div>
            </Router>
        )
    }
}


export default App;
