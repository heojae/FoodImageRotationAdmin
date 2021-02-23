import React, {Component} from "react"


class LoginMainTitle extends Component {
    render() {
        return (
            <div>
                <div className="Login-main-title">
                    {this.props.text}
                </div>
            </div>
        )
    }
}

export default LoginMainTitle;
