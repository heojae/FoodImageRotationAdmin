import React, {Component} from "react"
import Cookies from "universal-cookie";
import {withRouter} from 'react-router-dom';
import {getUserInfoWithToken} from "./API";
import * as actions from "../../actions";
import {connect} from "react-redux";

class Tool extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");
        if (access_token) {
            const metadata = {access_token};
            const response = await getUserInfoWithToken(metadata);
            if (response) {
                const [pk, email, profile_image, access_token] = response;
                this.props.handleSetUserInfo(pk, email, profile_image, access_token);
            } else {
                this.props.history.push("/login")
            }
        } else {
            this.props.history.push("/login")
        }
    }

    render() {
        return (<div> Tool </div>)
    }
}


const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetUserInfo: (pk, email, profile_image, access_token) => {
            dispatch(actions.setUserInfo(pk, email, profile_image, access_token))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tool));


