import React, {Component} from "react";
import "./index.css"

import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";
import * as actions from "../../../../../actions";
import ModelVersionUsing from "./ModelVersionUsing";
import ModelVersionAll from "./ModelVersionAll";
import Cookies from "universal-cookie";
import {getUsingModelVersion} from "./API";


class ModelVersion extends Component {
    constructor(props) {
        super(props);
    }


    async componentDidMount() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");
        const metadata = {"access_token": access_token};
        const response = await getUsingModelVersion(metadata);
        if (response) {
            const [pk, version_name, train_acc, test_acc, model_file_name, is_using] = response;
            this.props.handleSetModelVersionUsing(
                {
                    "pk": pk,
                    "version_name": version_name,
                    "train_acc": train_acc,
                    "test_acc": test_acc,
                    "model_file_name": model_file_name,
                    "is_using": is_using
                }
            )
        }
    }

    render() {
        const show_or_not = this.props.tool_mode === "ModelVersion";
        return (
            <div className={"Tool-main-model_version"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"Model Version of Food Image Rotation Detector(API)"}
                               docs={"Model Version 에 대한 목록"}/>

                <ModelVersionUsing model_version_using={this.props.model_version_using}/>
                {/*<ModelVersionAll/>*/}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tool_mode: state.tool.mode,
        model_version_using: state.model_version.model_version_using,
        model_version_all: state.model_version.model_version_all
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

