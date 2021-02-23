import React, {Component} from "react"
import {withRouter} from 'react-router-dom';
import Cookies from "universal-cookie";

import {Button} from 'antd';

import {login} from "./API"


class LoginMainForm extends Component {
    constructor(props) {
        super(props);
        this.sendToServer = this.sendToServer.bind(this)
    }


    async sendToServer(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const metadata = {};

        const response = await login(email, password, metadata);

        if (response) {
            const [pk, email, profile_image, access_token] = response;
            this.props.handleSetUserInfo(pk, email, profile_image, access_token);
            const cookies = new Cookies();
            cookies.set("access_token", access_token);
            this.props.history.push("/")
        } else {
            alert("invalid email or password come")
        }
    }

    render() {
        return (
            <form className={"Login-main-form"} onSubmit={this.sendToServer}>
                <LoginMainFormInput title={"Email"} name={"email"}/>
                <LoginMainFormInput title={"Password"} name={"password"}/>
                <LoginMainFormSubmit/>
            </form>
        )
    }
}


class LoginMainFormInput extends Component {
    render() {
        let input_component = "";
        if (this.props.name === "password") {
            input_component = <input className="Login-main-form-input-text_field"
                                     type={"password"}
                                     placeholder={this.props.name}
                                     name={this.props.name}/>
        } else {
            input_component = <input className="Login-main-form-input-text_field"
                                     type={"text"}
                                     placeholder={this.props.name}
                                     name={this.props.name}/>
        }

        return (
            <div className="Login-main-form-input">
                <div className="Login-main-form-input-title">
                    {this.props.title}
                </div>
                {input_component}
            </div>
        )
    }
}


class LoginMainFormSubmit extends React.Component {
    render() {
        return (
            <div className={"Login-main-form-submit"}>
                <Button htmlType={"submit"} style={{width: "200px", height: "50px", fontSize: "24px"}}> Login</Button>
            </div>
        )
    }
}


export default withRouter(LoginMainForm);


