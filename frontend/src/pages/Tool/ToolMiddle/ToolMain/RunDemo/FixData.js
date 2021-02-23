import React, {Component} from "react";
import {RunDemoFixDataLineTitle} from "./Line/LineTitle";
import {RunDemoFixDataLineBody} from "./Line/LineBody";

class FixData extends Component {
    render() {
        const show_or_not = this.props.mode === "FixData";

        return (
            <div className={"Tool-main-run_demo-output"} style={{display: show_or_not ? "block" : "none"}}>
                <RunDemoFixDataLineTitle/>
                <RunDemoFixDataLineBody
                    fix_file_list={this.props.fix_file_list}
                    is_fix_file_list_change={this.props.is_fix_file_list_change}
                    handleSetRunDemoRemoveFixFile={this.props.handleSetRunDemoRemoveFixFile}
                />
            </div>
        )
    }
}

export default FixData;
