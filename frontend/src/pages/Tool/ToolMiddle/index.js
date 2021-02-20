import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import "./index.css"

import ToolSidebar from "./ToolSidebar";

class ToolMiddle extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const display_none_style = {
            display: "none"
        }

        return (
            <div className={"Tool-middle"}>
                <ToolSidebar />
                <div>Tool Main</div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        sidebar_show_or_not: state.sidebar.show_or_not
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetSidebarShowOrNot: () => {
            dispatch(actions.setSidebarShowOrNot())
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ToolMiddle);

