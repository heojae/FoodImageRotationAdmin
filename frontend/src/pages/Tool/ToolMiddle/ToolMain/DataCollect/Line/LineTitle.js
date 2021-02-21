import React, {Component} from "react";


export class DataCollectOutputLineTitle extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className={"Tool-main-data_collect-output-line-title"}>
                <DataCollectOutputLineTitleItem text={"Original File Name"}/>
                <DataCollectOutputLineTitleItem text={"UUID File Name"}/>
                <DataCollectOutputLineTitleItem text={"Output Info"}/>
                <DataCollectOutputLineTitleItem text={"Image"}/>
                <DataCollectOutputLineTitleItem text={"Remove"}/>
            </div>
        );
    }
}


class DataCollectOutputLineTitleItem extends Component {
    render() {
        return (
            <div className={"Tool-main-data_collect-output-line-title-item"}>
                {this.props.text}
            </div>
        );
    }
}




