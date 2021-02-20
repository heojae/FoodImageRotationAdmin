import React, {Component} from "react";

import {ArrowRightOutlined} from "@ant-design/icons"
import {Button} from "antd";

export class RunDemoCheckResultLineBody extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.is_file_list_change;
    }

    async componentDidMount() {


    }

    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body"}>
                <RunDemoCheckResultLineBodyOneLine/>
                <RunDemoCheckResultLineBodyOneLine/>
            </div>
        )
    }
}

class RunDemoCheckResultLineBodyOneLine extends Component {
    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body-one_line"}>
                <RunDemoLineBodyItemText text_list={["aa", "bb"]}/>
                <RunDemoLineBodyItemText text_list={["aa", "bb"]}/>
                <RunDemoLineBodyItemText text_list={["aa", "bb"]}/>
                <RunDemoLineBodyItemText text_list={["aa", "bb"]}/>
                <RunDemoLineBodyItemText text_list={["aa", "bb"]}/>
                <RunDemoLineBodyItemText text_list={["aa", "bb"]}/>
            </div>
        )
    }
}

// ---------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------

class RunDemoLineBodyItemText extends Component {
    render() {
        let texts = [];
        let temp_text_list = this.props.text_list
        for (let i = 0; i < temp_text_list.length; i++) {
            texts.push(<div>{temp_text_list[i]}</div>)
        }
        return (
            <div className={"Tool-main-run_demo-output-line-body-item"}>
                <div className={"Tool-main-run_demo-output-line-body-item-text"}>
                    {texts}
                </div>
            </div>
        )
    }
}

class RunDemoLineBodyItemImage extends Component {
    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body-item"}>
                <img className="Tool-main-run_demo-output-line-body-item-image" src={this.props.url}/>
            </div>
        )
    }
}


class RunDemoLineBodyItemFixButton extends React.Component {
    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body-item"}>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-fix_button">
                    <ArrowRightOutlined style={{fontSize: "40px"}}/>
                </Button>
            </div>
        );
    }
}


class RunDemoLineBodyItemRotateButton extends React.Component {
    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body-item-rotate"}>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button">
                    0
                </Button>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button">
                    90
                </Button>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button">
                    180
                </Button>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button">
                    270
                </Button>
            </div>
        );
    }
}


class RunDemoLineBodyItemSaveButton extends React.Component {
    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body-item"}>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-save_button">
                    <ArrowRightOutlined style={{fontSize: "40px"}}/>
                </Button>
            </div>
        );
    }
}








