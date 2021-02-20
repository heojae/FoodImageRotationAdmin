import React, {Component} from "react";
import {RunDemoFixDataLineTitle} from "./Line/LineTitle";

class FixData extends Component {
    render() {
        const show_or_not = this.props.mode === "FixData";

        return (
            <div className={"Tool-main-run_demo-output"} style={{display: show_or_not ? "block" : "none"}}>
                <RunDemoFixDataLineTitle/>
            </div>
        )
    }
}

export default FixData;
