import React, {Component} from "react";
import "./index.css"

import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";
import * as actions from "../../../../../actions";
import ModelVersionUsing from "./ModelVersionUsing";
import ModelVersionAll from "./ModelVersionAll";


class ModelVersion extends Component {
    constructor(props) {
        super(props);
    }


    async componentDidMount() {

    }

    render() {
        const show_or_not = this.props.tool_mode === "ModelVersion";
        return (
            <div className={"Tool-main-model_version"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"Model Version of Food Image Rotation Detector(API)"}
                               docs={"Model Version 에 대한 목록"}/>

                <ModelVersionUsing/>
                {/*<ModelVersionAll/>*/}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tool_mode: state.tool.mode,
        model_version_using: state.data_collect.model_version_using,
        model_version_all: state.data_collect.model_version_all
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetModelVersionUsing: (model_version_using) => {
            dispatch(actions.setModelVersionUsing(model_version_using))
        },

        handleSetModelVersionAll: (model_version_all) => {
            dispatch(actions.setModelVersionAll(model_version_all))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelVersion);

