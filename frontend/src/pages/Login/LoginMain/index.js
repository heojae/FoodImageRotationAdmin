import React, {Component} from "react"
import {connect} from "react-redux";
import * as actions from "../../../actions";

import LoginMainTitle from "./LoginMainTitle";
import LoginMainForm from "./LoginMainForm";
import "./index.css"


class LoginMain extends Component {
    render() {
        return (
            <div className={"Login-main"}>
                <LoginMainTitle text={"ACCOUNT LOGIN"}/>
                <LoginMainForm handleSetUserInfo={this.props.handleSetUserInfo}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginMain);

