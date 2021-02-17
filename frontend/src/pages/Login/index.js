import React, {Component} from "react"
import "./index.css"

import LoginHeader from "./LoginHeader";
import LoginMain from "./LoginMain";

class Login extends Component {
    render() {
        return (
            <div className={"Login"}>
                <LoginHeader title={"Food Image Rotation Admin"}/>
                <LoginMain/>
            </div>
        )
    }
}

export default Login;
