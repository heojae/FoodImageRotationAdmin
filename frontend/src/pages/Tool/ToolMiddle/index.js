import React, {Component} from "react";
import {connect} from "react-redux";
import "./index.css"

import ToolSidebar from "./ToolSidebar";
import ToolMain from "./ToolMain";

class ToolMiddle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"Tool-middle"}>
                <ToolSidebar />
                <ToolMain/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(ToolMiddle);

