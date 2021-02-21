import React, {Component} from "react";
import {DataCollectOutputLineTitle} from "./Line/LineTitle";
import {RunDemoCheckResultLineBody} from "./Line/LineBody";

class ImageInfoOutput extends Component {
    render() {
        return (
            <div className={"Tool-main-data_collect-output"}>
                <DataCollectOutputLineTitle/>
                <RunDemoCheckResultLineBody/>
            </div>
        )
    }
}

export default ImageInfoOutput;