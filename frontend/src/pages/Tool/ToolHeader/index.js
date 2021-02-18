import env from "react-dotenv";
import React, {Component} from "react";
import {Button} from "antd";
import 'antd/dist/antd.css';
import './index.css';
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import {connect} from "react-redux";
import * as actions from "../../../actions";

class ToolHeader extends Component {
    render() {
        return (
            <div className={"Tool-header"}>
                <ToolHeaderSidebarButton handleSetSidebarShowOrNot={this.props.handleSetSidebarShowOrNot}/>
                <ToolHeaderProfile email={this.props.email} profile_image={this.props.profile_image}/>
            </div>
        )
    }
}


class ToolHeaderSidebarButton extends React.Component {
    constructor(props) {
        super(props);
        this.sidebarShowOrNot = this.sidebarShowOrNot.bind(this)
    }

    sidebarShowOrNot(event) {
        event.preventDefault()
        this.props.handleSetSidebarShowOrNot()
    }

    render() {
        return (
            <Button className="Tool-header-sidebar_button"
                    style={{width: "75px", height: "75px", background: "#1c1c1c", border: "None"}}
                    onClick={this.sidebarShowOrNot}>

                <MenuOutlined style={{fontSize: "40px", color: "#FFFFFF"}}/>
            </Button>
        )
    }
}

class ToolHeaderProfile extends React.Component {
    render() {
        return (
            <div className="Tool-header-profile">
                <img className="Tool-header-profile-image" src={env.media_url + "/" + this.props.profile_image}/>
                <div className="Tool-header-profile-text_flex">
                    <div className="Tool-header-profile-text_flex-text">
                        {this.props.email}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        email: state.user.email,
        profile_image: state.user.profile_image,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetSidebarShowOrNot: () => {
            dispatch(actions.setSidebarShowOrNot())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolHeader);







