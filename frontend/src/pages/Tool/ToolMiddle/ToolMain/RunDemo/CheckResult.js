import React, {Component} from "react";
import {RunDemoCheckResultLineTitle} from "./Line/LineTitle";
import {RunDemoCheckResultLineBody} from "./Line/LineBody";

class CheckResult extends Component {
    render() {
        const show_or_not = this.props.mode === "CheckResult";

        return (
            <div className={"Tool-main-run_demo-output"} style={{display: show_or_not ? "block" : "none"}}>
                <RunDemoCheckResultLineTitle/>
                <RunDemoCheckResultLineBody file_list={this.props.file_list}
                                            is_file_list_change={this.props.is_file_list_change}
                                            handleSetRunDemoConvertFileInFileListToFixFileList={this.props.handleSetRunDemoConvertFileInFileListToFixFileList}
                />
            </div>
        )
    }
}

export default CheckResult;
