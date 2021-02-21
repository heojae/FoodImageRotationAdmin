import React, {Component} from "react";


export class RunDemoCheckResultLineTitle extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-title"}>
                <RunDemoLineTitleItem text={"File Name"}/>
                <RunDemoLineTitleItem text={"Input Image"}/>
                <RunDemoLineTitleItem text={"Output Image"}/>
                <RunDemoLineTitleItem text={"Output Info"}/>
                <RunDemoLineTitleItem text={"Confidence"}/>
                <RunDemoLineTitleItem text={"Fix Data"}/>
            </div>
        );
    }
}

export class RunDemoFixDataLineTitle extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-title"}>
                <RunDemoLineTitleItem text={"File Name"}/>
                <RunDemoLineTitleItem text={"Input Image"}/>
                <RunDemoLineTitleItem text={"Output Image"}/>
                <RunDemoLineTitleItem text={"Output Info"}/>
                <RunDemoLineTitleItem text={"Rotate Degree"}/>
                <RunDemoLineTitleItem text={"Save"}/>
            </div>
        );
    }
}


class RunDemoLineTitleItem extends Component {
    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-title-item"}>
                {this.props.text}
            </div>
        );
    }
}




