import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import Cookies from "universal-cookie";

import {ArrowRightOutlined} from "@ant-design/icons"
import {Button} from "antd";
import {inference} from "../API";

export class RunDemoCheckResultLineBody extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.is_file_list_change;
    }

    render() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");

        const one_line_component_list = this.props.file_list.map((file_and_blob, index) => {
            return <RunDemoCheckResultLineBodyOneLine key={uuidv4()}
                                                      file_and_blob={file_and_blob}
                                                      access_token={access_token}
                                                      handleSetRunDemoConvertFileInFileListToRixFileList={this.props.handleSetRunDemoConvertFileInFileListToRixFileList}
            />;
        })

        return (
            <div className={"Tool-main-run_demo-output-line-body"}>
                {one_line_component_list}
            </div>
        )
    }
}

class RunDemoCheckResultLineBodyOneLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file_name: "",
            url: "",
            exif_degree: 0,
            model_degree: 0,
            confidence: 0,

            is_remove_component: false
        };
        this.setOneLineRemove = this.setOneLineRemove.bind(this);
    }

    setOneLineRemove() {
        this.props.handleSetRunDemoConvertFileInFileListToRixFileList(this.props.file_and_blob)
        this.setState({is_remove_component: true})
    }


    async componentDidMount() {
        const blob = this.props.file_and_blob.blob;


        const arrayBuffer = await blob.arrayBuffer();
        const uint8ArrayImage = new Uint8Array(arrayBuffer);
        const metadata = {"access_token": this.props.access_token}
        const response = await inference(uint8ArrayImage, metadata);
        if (response) {
            const [model_degree, exif_degree, confidence, success] = response;
            const url = URL.createObjectURL(blob);
            const file = this.props.file_and_blob.file;
            const file_name = file.name;
            this.setState({
                file_name,
                url,
                exif_degree,
                model_degree,
                confidence
            })
        } else {
            this.setState({is_remove_component: true});
        }
    }

    render() {
        const file_name = [this.state.file_name];
        const output_info = [
            "Exif Degree : " + this.state.exif_degree,
            "Model Degree : " + this.state.model_degree,
        ]
        const confidence_info = [
            "confidence : " + String(this.state.confidence).substr(0, 5)
        ]


        return (
            this.state.is_remove_component ? null :
                <div className={"Tool-main-run_demo-output-line-body-one_line"}>
                    <RunDemoLineBodyItemText text_list={file_name}/>
                    <RunDemoLineBodyItemImage url={this.state.url} model_degree={0}/>
                    <RunDemoLineBodyItemImage url={this.state.url}
                                              model_degree={this.state.model_degree}/>
                    <RunDemoLineBodyItemText text_list={output_info}/>
                    <RunDemoLineBodyItemText text_list={confidence_info}/>
                    <RunDemoLineBodyItemFixButton
                        setOneLineRemove={this.setOneLineRemove}
                    />
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
            texts.push(<div key={i}>{temp_text_list[i]}</div>)
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
        const rotate_degree = -1 * this.props.model_degree;

        return (
            <div className={"Tool-main-run_demo-output-line-body-item"}>
                <img className="Tool-main-run_demo-output-line-body-item-image"
                     style={{transform: `rotate(${rotate_degree}deg)`}}
                     src={this.props.url}/>
            </div>
        )
    }
}


class RunDemoLineBodyItemFixButton extends React.Component {
    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body-item"}>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-fix_button"
                        onClick={this.props.setOneLineRemove}
                >
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








