import React, {Component} from "react";
import {Button} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";

export class RunDemoCheckResultLineBody extends Component {
    render() {
        return (
            <div className={"Tool-main-data_collect-output-line-body"}>
                <DataCollectOutputLineBodyOneLine/>
                <DataCollectOutputLineBodyOneLine/>

            </div>
        )
    }
}


class DataCollectOutputLineBodyOneLine extends Component {
    render() {
        return (
            <div className={"Tool-main-data_collect-output-line-body-one_line"}>
                <DataCollectLineBodyItemText text_list={["aa", "bb"]}/>
                <DataCollectLineBodyItemText text_list={["aa", "bb"]}/>
                <DataCollectLineBodyItemText text_list={["aa", "bb"]}/>
                <DataCollectLineBodyItemText text_list={["aa", "bb"]}/>
                <DataCollectLineBodyItemText text_list={["aa", "bb"]}/>
            </div>
        )
    }
}

// ------------------------------------ Item -----------------------------------------
class DataCollectLineBodyItemText extends Component {
    render() {
        let texts = [];
        let temp_text_list = this.props.text_list
        for (let i = 0; i < temp_text_list.length; i++) {
            texts.push(<div key={i}>{temp_text_list[i]}</div>)
        }
        return (
            <div className={"Tool-main-data_collect-output-line-body-item"}>
                <div className={"Tool-main-data_collect-output-line-body-item-text"}>
                    {texts}
                </div>
            </div>
        )
    }
}

class DataCollectLineBodyItemImage extends Component {
    render() {
        const rotate_degree = (-1 * this.props.model_degree) + (-1 * this.props.user_fix_degree);

        return (
            <div className={"Tool-main-run_demo-output-line-body-item"}>
                <img className="Tool-main-run_demo-output-line-body-item-image"
                     // style={{transform: `rotate(${rotate_degree}deg)`}}
                     src={this.props.url}
                />
            </div>
        )
    }
}


class DataCollectLineBodyItemRemoveButton extends React.Component {
    render() {
        return (
            <div className={"Tool-main-data_collect-output-line-body-item"}>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-data_collect-output-line-body-item-fix_button"
                    // onClick={this.props.setOneLineRemove}
                >
                    <ArrowRightOutlined style={{fontSize: "40px"}}/>
                </Button>
            </div>
        );
    }
}
