import React, {Component} from "react"
import LoginMainTitle from "./LoginMainTitle";
import LoginMainForm from "./LoginMainForm";

import "./index.css"

class LoginMain extends Component {
    render() {
        return (
            <div className={"Login-main"}>
                <LoginMainTitle text={"ACCOUNT LOGIN"}/>
                <LoginMainForm/>
            </div>
        )
    }
}

export default LoginMain;
