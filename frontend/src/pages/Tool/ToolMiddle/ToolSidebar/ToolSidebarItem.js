import React, {Component} from "react"
import {Button} from "antd";


class ToolSidebarItem extends Component {
    constructor(props) {
        super(props);
        this.changeToolMode = this.changeToolMode.bind(this);
    }

    changeToolMode() {
        this.props.handleSetToolMode(this.props.mode)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <Button style={{width: "200px", height: "75px", background: "#434a5e", border: "None", fontSize: "20px"}}
                    className="Tool-sidebar-item"
                    onClick={this.changeToolMode}
            >
                {this.props.text}
            </Button>
        )
    }
}

export default ToolSidebarItem
