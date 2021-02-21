import React, {Component} from "react";

export default class ToolMainTitle extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className="Tool-main-title">
                {this.props.title}
                <div className="Tool-main-title-docs">
                    {this.props.docs}
                </div>
            </div>
        );
    }
}
