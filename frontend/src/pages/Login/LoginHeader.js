import React, {Component} from "react"


class LoginHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"Login-header"}>
                {this.props.title}
            </div>
        )
    }
}

export default LoginHeader;
