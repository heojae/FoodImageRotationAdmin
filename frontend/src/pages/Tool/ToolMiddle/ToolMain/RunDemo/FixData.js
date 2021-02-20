import React, {Component} from "react";

class FixData extends Component {
    render() {
        const show_or_not = this.props.mode === "FixData";

        return (
            <div className={"Tool-main-run_demo-fix_data"} style={{display: show_or_not ? "block" : "none"}}>
                Fix Data
            </div>
        )
    }
}

export default FixData;
