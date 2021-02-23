import React, {Component} from "react";
import {Button} from "antd";

class ChoiceMode extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className={"Tool-main-run_demo-choice_mode-container"}>
                <div className={"Tool-main-run_demo-choice_mode"}>
                    <ChoiceModeItem text={"Check Result"} mode={"CheckResult"}
                                    handleSetRunDemoMode={this.props.handleSetRunDemoMode}/>
                    <ChoiceModeItem text={"Fix Data"} mode={"FixData"}
                                    handleSetRunDemoMode={this.props.handleSetRunDemoMode}/>
                </div>
            </div>
        )
    }
}

class ChoiceModeItem extends Component {
    constructor(props) {
        super(props);
        this.changeRunDemoMode = this.changeRunDemoMode.bind(this);
    }

    changeRunDemoMode(event) {
        event.preventDefault();
        this.props.handleSetRunDemoMode(this.props.mode);
    }

    render() {
        return (
            <div>
                <Button
                    style={{width: "600px", height: "75px", fontSize: "25px"}}
                    className="Tool-main-run_demo-choice_mode-item"
                    onClick={this.changeRunDemoMode}
                >
                    {this.props.text}
                </Button>

            </div>
        )
    }
}


export default ChoiceMode;


