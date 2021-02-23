import React, {Component} from "react";
import {ModelVersionUsingTitle} from "./Line/LineTitle";
import {ModelVersionUsingLineBody} from "./Line/LineBody";

class ModelVersionUsing extends Component {
    render() {
        return (
            <div className={"Tool-main-model_version-using"}>

                <div className={"Tool-main-model_version-output-header"}>
                    현재 사용중인 모델
                </div>
                <ModelVersionUsingTitle/>
                <ModelVersionUsingLineBody/>
            </div>
        )
    }
}

export default ModelVersionUsing;