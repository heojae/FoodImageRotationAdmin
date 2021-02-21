import React, {Component} from "react";
import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";


class ModelVersion extends Component {
    constructor(props) {
        super(props);
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.mode === "ModelVersion";
    // }

    render() {
        const show_or_not = this.props.tool_mode === "ModelVersion";

        return (
            <div className={"Tool-main-model_version"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"Model Version of Food Image Rotation Detector(API)"}
                               docs={"Model Version 에 대한 목록"}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tool_mode: state.tool.mode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(ModelVersion);

