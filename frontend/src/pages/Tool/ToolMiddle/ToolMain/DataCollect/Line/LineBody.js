import env from "react-dotenv";
import React, {Component} from "react";
import {Button} from "antd";
import {v4 as uuidv4} from "uuid";
import Cookies from "universal-cookie";

import sf from "sf";
import {removeImage} from "../API";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";

export class RunDemoCheckResultLineBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");

        const one_line_component_list = this.props.image_info_list.map((image_info, index) => {
            const uuid_key = uuidv4();
            return <DataCollectOutputLineBodyOneLine key={uuid_key}
                                                     image_info={image_info}
                                                     access_token={access_token}
            />;
        })

        return (
            <div className={"Tool-main-data_collect-output-line-body"}>
                {one_line_component_list}
            </div>
        )
    }
}


class DataCollectOutputLineBodyOneLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_remove_component: false
        };
        this.setOneLineRemove = this.setOneLineRemove.bind(this);
    }

    async setOneLineRemove() {
        const access_token = this.props.access_token;
        const metadata = {"access_token": access_token}
        await removeImage(this.props.image_info.pk, metadata)
        this.setState({is_remove_component: true})
    }

    render() {
        const original_file_name = [this.props.image_info.original_file_name];
        const uuid_file_name = [this.props.image_info.uuid_file_name];
        const output_info = [
            "Exif Degree : " + this.props.image_info.exif_degree,
            "Model Degree : " + this.props.image_info.model_degree,
            "confidence : " + String(this.props.image_info.confidence).substr(0, 5),
            "User Degree : " + this.props.image_info.user_fix_degree,
        ]


        const url = sf("{media_url}/{dataset_info_pk}/{uuid_file_name}",
            {
                media_url: env.media_url,
                dataset_info_pk: this.props.image_info.dataset_info_pk,
                uuid_file_name: this.props.image_info.uuid_file_name
            })


        return (
            this.state.is_remove_component ? null :
                <div className={"Tool-main-data_collect-output-line-body-one_line"}>
                    <DataCollectLineBodyItemText text_list={original_file_name}/>
                    <DataCollectLineBodyItemText text_list={uuid_file_name}/>
                    <DataCollectLineBodyItemText text_list={output_info}/>
                    <DataCollectLineBodyItemImage url={url}
                                                  model_degree={this.props.image_info.model_degree}
                                                  user_fix_degree={this.props.image_info.user_fix_degree}
                    />
                    <DataCollectLineBodyItemRemoveButton setOneLineRemove={this.setOneLineRemove}/>
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
            <div className={"Tool-main-data_collect-output-line-body-item"}>
                <img className="Tool-main-data_collect-output-line-body-item-image"
                     style={{transform: `rotate(${rotate_degree}deg)`}}
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
                        onClick={this.props.setOneLineRemove}
                >
                    <CloseOutlined style={{fontSize: "40px"}}/>
                </Button>
            </div>
        );
    }
}
