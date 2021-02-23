import React, {Component} from "react";
import {ModelVersionAllTitle} from "./Line/LineTitle";
import {ModelVersionAllLineBody} from "./Line/LineBody";

class ModelVersionAll extends Component {
    render() {
        return (
            <div className={"Tool-main-model_version-all"}>
                <div className={"Tool-main-model_version-output-header"}>
                    전체 모델
                </div>
                <ModelVersionAllTitle/>
                <ModelVersionAllLineBody model_version_all={this.props.model_version_all}
                                         handleSetModelVersionUsing={this.props.handleSetModelVersionUsing}
                                         handleSetModelVersionAll={this.props.handleSetModelVersionAll}
                />
            </div>
        )
    }
}

export default ModelVersionAll;