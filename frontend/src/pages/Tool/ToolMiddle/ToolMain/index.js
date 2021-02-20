import React, {Component} from "react";
import {connect} from "react-redux";
import "./index.css"

import RunDemo from "./RunDemo";
import DataCollect from "./DataCollect";
import ModelVersion from "./ModelVersion";


class ToolMain extends Component {
    render() {
        return (
            <div className={"Tool-main"}>
                <RunDemo/>
                <DataCollect/>
                <ModelVersion/>

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


export default connect(mapStateToProps, mapDispatchToProps)(ToolMain);
