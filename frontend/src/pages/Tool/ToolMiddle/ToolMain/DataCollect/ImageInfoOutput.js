import React, {Component} from "react";
import {DataCollectOutputLineTitle} from "./Line/LineTitle";
import {RunDemoCheckResultLineBody} from "./Line/LineBody";

class ImageInfoOutput extends Component {
    render() {
        return (
            <div className={"Tool-main-data_collect-output"}>
                <DataCollectOutputLineTitle/>
                <RunDemoCheckResultLineBody dataset_info_pk={this.props.dataset_info_pk}
                                            image_info_list={this.props.image_info_list}/>
            </div>
        )
    }
}

export default ImageInfoOutput;