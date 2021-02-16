import React, {Component} from "react"
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Cookies from "universal-cookie";

import * as actions from "../../../actions";

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


        if (Boolean(response)) {
            const [pk, email, profile_image, access_token] = response;
            this.props.handleSetUserInfo(pk, email, profile_image, access_token);
            const cookies = new Cookies();
            cookies.set("access_token", access_token);
            this.props.history.push("/")
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
        return (
            <div className="Login-main-form-input">
                <div className="Login-main-form-input-title">
                    {this.props.title}
                </div>
                <input className="Login-main-form-input-text_field" placeholder={this.props.name}
                       name={this.props.name}/>
            </div>
        )
    }
}


class LoginMainFormSubmit extends React.Component {
    render() {
        return (
            <div className={"Login-main-form-submit"}>
                <button className="Login-main-form-submit-button"> Login</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetUserInfo: (pk, email, profile_image, access_token) => {
            dispatch(actions.setUserInfo(pk, email, profile_image, access_token))
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginMainForm));

