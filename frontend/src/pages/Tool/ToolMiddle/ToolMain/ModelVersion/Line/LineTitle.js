import React, {Component} from "react";





export class ModelVersionUsingTitle extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className={"Tool-main-model_version-output-title"}>
                <ModelVersionOutputTitleItem text={"Model Version"}/>
                <ModelVersionOutputTitleItem text={"Train Accuracy"}/>
                <ModelVersionOutputTitleItem text={"Train Accuracy"}/>
                <ModelVersionOutputTitleItem text={"File Name"}/>
                <ModelVersionOutputTitleItem text={"Using"}/>
            </div>
        );
    }
}


export class ModelVersionAllTitle extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <div className={"Tool-main-model_version-output-title"}>
                <ModelVersionOutputTitleItem text={"Model Version"}/>
                <ModelVersionOutputTitleItem text={"Train Accuracy"}/>
                <ModelVersionOutputTitleItem text={"Train Accuracy"}/>
                <ModelVersionOutputTitleItem text={"File Name"}/>
                <ModelVersionOutputTitleItem text={"Change Model"}/>
            </div>
        );
    }
}





class ModelVersionOutputTitleItem extends Component {
    render() {
        return (
            <div className={"Tool-main-model_version-output-line-title-item"}>
                {this.props.text}
            </div>
        );
    }
}