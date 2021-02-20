import React, {Component} from "react";
import RunDemo from "./RunDemo";
import DataCollect from "./DataCollect";
import ModelVersion from "./ModelVersion";


class ToolMain extends Component {
    render() {
        return (
            <div>
                <RunDemo/>
                <DataCollect/>
                <ModelVersion/>

            </div>
        )
    }
}

export default ToolMain
