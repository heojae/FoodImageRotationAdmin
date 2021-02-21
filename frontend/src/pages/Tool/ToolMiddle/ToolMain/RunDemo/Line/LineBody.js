import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import Cookies from "universal-cookie";

import {ArrowRightOutlined} from "@ant-design/icons"
import {Button} from "antd";
import {inference} from "../API";
import CheckOutlined from "@ant-design/icons/lib/icons/CheckOutlined";

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
            const uuid_key = uuidv4();
            return <RunDemoCheckResultLineBodyOneLine key={uuid_key}
                                                      uuid_key={uuid_key}
                                                      file_and_blob={file_and_blob}
                                                      access_token={access_token}
                                                      handleSetRunDemoConvertFileInFileListToFixFileList={this.props.handleSetRunDemoConvertFileInFileListToFixFileList}
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
        const fix_file_info = {
            file: this.props.file_and_blob.file,
            blob: this.props.file_and_blob.blob,
            file_name: this.state.file_name,
            url: this.state.url,
            exif_degree: this.state.exif_degree,
            model_degree: this.state.model_degree,
            confidence: this.state.confidence,
            uuid_key: this.props.uuid_key
        }

        this.props.handleSetRunDemoConvertFileInFileListToFixFileList(fix_file_info)
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
                    <RunDemoLineBodyItemImage url={this.state.url} model_degree={0} user_rotate_degree={0}/>
                    <RunDemoLineBodyItemImage url={this.state.url}
                                              model_degree={this.state.model_degree}
                                              user_rotate_degree={0}
                    />
                    <RunDemoLineBodyItemText text_list={output_info}/>
                    <RunDemoLineBodyItemText text_list={confidence_info}/>
                    <RunDemoLineBodyItemFixButton
                        setOneLineRemove={this.setOneLineRemove}
                    />
                </div>
        )
    }
}

// ------------------------------------ RunDemoFixDataLineBody -----------------------------------------
export class RunDemoFixDataLineBody extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.is_fix_file_list_change;
    }

    render() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");

        const one_line_component_list = this.props.fix_file_list.map((fix_file_info, index) => {
            const uuid_key = uuidv4();
            return <RunDemoFixDataLineBodyOneLine key={uuid_key}
                                                  uuid_key={uuid_key}
                                                  fix_file_info={fix_file_info}
                                                  access_token={access_token}
            />;
        })

        return (
            <div className={"Tool-main-run_demo-output-line-body"}>
                {one_line_component_list}
            </div>
        )
    }
}

class RunDemoFixDataLineBodyOneLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file_name: "",
            url: "",
            exif_degree: 0,
            model_degree: 0,
            confidence: 0,

            user_rotate_degree: 0,

            is_remove_component: false
        };

        this.setUserRotateDegree = this.setUserRotateDegree.bind(this);
        this.setOneLineRemove = this.setOneLineRemove.bind(this);
    }

    setUserRotateDegree(degree) {
        this.setState({user_rotate_degree: degree})
    }

    setOneLineRemove() {
        this.setState({is_remove_component: true});
    }

    componentDidMount() {
        const file_name = this.props.fix_file_info.file_name;
        const url = this.props.fix_file_info.url;
        const exif_degree = this.props.fix_file_info.exif_degree;
        const model_degree = this.props.fix_file_info.model_degree;
        const confidence = this.props.fix_file_info.confidence;
        this.setState({
            file_name: file_name,
            url: url,
            exif_degree: exif_degree,
            model_degree: model_degree,
            confidence: confidence
        })
    }

    render() {
        const file_name = [this.state.file_name];
        const output_info = [
            "Exif Degree : " + this.state.exif_degree,
            "Model Degree : " + this.state.model_degree,
            "confidence : " + String(this.state.confidence).substr(0, 4),
            "User Degree : " + this.state.user_rotate_degree
        ]

        return (
            this.state.is_remove_component ? null :
                <div className={"Tool-main-run_demo-output-line-body-one_line"}>
                    <RunDemoLineBodyItemText text_list={file_name}/>
                    <RunDemoLineBodyItemImage url={this.state.url}
                                              model_degree={0}
                                              user_rotate_degree={0}
                    />
                    <RunDemoLineBodyItemImage url={this.state.url}
                                              model_degree={this.state.model_degree}
                                              user_rotate_degree={this.state.user_rotate_degree}
                    />
                    <RunDemoLineBodyItemText text_list={output_info}/>
                    <RunDemoLineBodyItemRotateButton setUserRotateDegree={this.setUserRotateDegree}/>
                    <RunDemoLineBodyItemSaveButton/>
                </div>
        )
    }
}

// ------------------------------------ Item -----------------------------------------

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
        const rotate_degree = (-1 * this.props.model_degree) + (-1 * this.props.user_rotate_degree);

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
    constructor(props) {
        super(props);
        this.onChangeDegree = this.onChangeDegree.bind(this);
    }

    onChangeDegree(event) {
        event.preventDefault();
        this.props.setUserRotateDegree(Number(event.target.textContent));
    }


    render() {
        return (
            <div className={"Tool-main-run_demo-output-line-body-item-rotate"}>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button"
                        onClick={this.onChangeDegree}
                >
                    0
                </Button>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button"
                        onClick={this.onChangeDegree}
                >
                    90
                </Button>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button"
                        onClick={this.onChangeDegree}
                >
                    270
                </Button>
                <Button style={{width: "100px", height: "100px"}}
                        className="Tool-main-run_demo-output-line-body-item-rotate-button"
                        onClick={this.onChangeDegree}
                >
                    180
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
                    <CheckOutlined style={{fontSize: "40px"}} />
                </Button>
            </div>
        );
    }
}








