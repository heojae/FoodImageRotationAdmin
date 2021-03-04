import React, {Component} from "react";
import {DataCollectOutputLineTitle} from "./Line/LineTitle";
import {RunDemoCheckResultLineBody} from "./Line/LineBody";

class ImageInfoOutput extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.tool_mode === "DataCollect") {
            if (this.props.tool_mode === nextProps.tool_mode) {
                return this.props.choose_dataset_info_pk !== nextProps.choose_dataset_info_pk
            }
        }
        return false;
    }

    render() {
        return (
            <div className={"Tool-main-data_collect-output"}>
                <DataCollectOutputLineTitle/>
                <RunDemoCheckResultLineBody choose_dataset_info_pk={this.props.choose_dataset_info_pk}
                                            image_info_list={this.props.image_info_list}/>
            </div>
        )
    }
}

export default ImageInfoOutput;