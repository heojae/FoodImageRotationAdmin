import React, {Component} from "react";

class CheckResult extends Component {
    render() {
        const show_or_not = this.props.mode === "CheckResult";

        return (
            <div className={"Tool-main-run_demo-check_result"} style={{display: show_or_not ? "block" : "none"}}>
                <div>Check Result</div>
            </div>
        )
    }
}

export default CheckResult;
