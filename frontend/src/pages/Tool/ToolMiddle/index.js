import React, {Component} from "react"
import "./index.css"

import ToolSidebar from "./ToolSidebar";

class ToolMiddle extends Component {
    render() {
        return (
            <div className={"Tool-middle"}>
                <ToolSidebar/>
                <div>Tool Main</div>
            </div>
        )
    }

}

export default ToolMiddle;



