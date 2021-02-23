import React, {Component} from "react";
import Cookies from "universal-cookie";
import {v4 as uuidv4} from "uuid";
import {Button} from "antd";

import CheckOutlined from "@ant-design/icons/lib/icons/CheckOutlined";
import {changeModelVersion, getAllModelVersion, getUsingModelVersion} from "../API";


export class ModelVersionUsingLineBody extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.model_version_using.pk !== nextProps.model_version_using.pk
    }

    render() {
        return (
            <div className={"Tool-main-model_version-output-line-body"}>
                <ModelVersionUsingLineBodyOneLine model_version_using={this.props.model_version_using}/>
            </div>
        )
    }
}


class ModelVersionUsingLineBodyOneLine extends Component {
    render() {
        let version_name = this.props.model_version_using.version_name
        let train_acc = this.props.model_version_using.train_acc
        let test_acc = this.props.model_version_using.test_acc
        let model_file_name = this.props.model_version_using.model_file_name

        train_acc = String(train_acc).substr(0, 5)
        test_acc = String(test_acc).substr(0, 5)

        let model_file_name1 = model_file_name.slice(0, parseInt(model_file_name.length / 2))
        let model_file_name2 = model_file_name.slice(parseInt(model_file_name.length / 2),)


        return (
            <div className={"Tool-main-model_version-output-line-body-one_line"}>
                <ModelVersionLineBodyItemText text_list={[version_name]}/>
                <ModelVersionLineBodyItemText text_list={[train_acc]}/>
                <ModelVersionLineBodyItemText text_list={[test_acc]}/>
                <ModelVersionLineBodyItemText text_list={[model_file_name1, model_file_name2]}/>
                <ModelVersionLineBodyItemText text_list={["사용중인 모델입니다."]}/>
            </div>
        )
    }
}

// ------------------------------------ AllLineBody -----------------------------------------

export class ModelVersionAllLineBody extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if (this.props.model_version_all.length === 0 && nextProps.model_version_all.length !== 0) {
            return true;
        }

        let fix_or_not = false;
        this.props.model_version_all.forEach(function (model_version, index) {
            if (model_version.is_using) {
                fix_or_not = !nextProps.model_version_all[index].is_using
            }
        });
        return fix_or_not;
    }

    render() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");

        const one_line_component_list = this.props.model_version_all.map((model_version, index) => {
            const uuid_key = uuidv4();
            return <ModelVersionAllLineBodyOneLine key={uuid_key}
                                                   model_version={model_version}
                                                   access_token={access_token}
                                                   handleSetModelVersionUsing={this.props.handleSetModelVersionUsing}
                                                   handleSetModelVersionAll={this.props.handleSetModelVersionAll}
            />;
        })

        return (
            <div className={"Tool-main-model_version-output-line-body"}>
                {one_line_component_list}
            </div>
        )
    }
}

class ModelVersionAllLineBodyOneLine extends Component {
    constructor(props) {
        super(props);
        this.changeModelVersionOnClick = this.changeModelVersionOnClick.bind(this);
    }

    async changeModelVersionOnClick() {
        let model_version_pk = this.props.model_version.pk;
        let access_token = this.props.access_token;
        const metadata = {"access_token": access_token}

        await changeModelVersion(model_version_pk, metadata);
        const response = await getUsingModelVersion(metadata);
        if (response) {
            const [pk, version_name, train_acc, test_acc, model_file_name, is_using] = response;
            this.props.handleSetModelVersionUsing(
                {
                    "pk": pk,
                    "version_name": version_name,
                    "train_acc": train_acc,
                    "test_acc": test_acc,
                    "model_file_name": model_file_name,
                    "is_using": is_using
                }
            )
        }
        await getAllModelVersion(metadata, this.props.handleSetModelVersionAll);
    }


    render() {
        let version_name = this.props.model_version.version_name;
        let train_acc = this.props.model_version.train_acc;
        let test_acc = this.props.model_version.test_acc;
        let model_file_name = this.props.model_version.model_file_name;
        let is_using = this.props.model_version.is_using;

        train_acc = String(train_acc).substr(0, 5);
        test_acc = String(test_acc).substr(0, 5);

        let model_file_name1 = model_file_name.slice(0, parseInt(model_file_name.length / 2));
        let model_file_name2 = model_file_name.slice(parseInt(model_file_name.length / 2),);

        let using_or_not_component = null;
        if (is_using) {
            using_or_not_component = <ModelVersionLineBodyItemText text_list={["사용중인 모델입니다."]}/>
        } else {
            using_or_not_component =
                <ModelVersionLineBodyItemChangeButton changeModelVersionOnClick={this.changeModelVersionOnClick}/>
        }

        return (
            <div className={"Tool-main-model_version-output-line-body-one_line"}>
                <ModelVersionLineBodyItemText text_list={[version_name]}/>
                <ModelVersionLineBodyItemText text_list={[train_acc]}/>
                <ModelVersionLineBodyItemText text_list={[test_acc]}/>
                <ModelVersionLineBodyItemText text_list={[model_file_name1, model_file_name2]}/>
                {using_or_not_component}

            </div>
        )
    }
}


// ------------------------------------ Item -----------------------------------------


class ModelVersionLineBodyItemText extends Component {
    render() {
        let texts = [];
        let temp_text_list = this.props.text_list
        for (let i = 0; i < temp_text_list.length; i++) {
            texts.push(<div key={i}>{temp_text_list[i]}</div>)
        }
        return (
            <div className={"Tool-main-model_version-output-line-body-item"}>
                <div className={"Tool-main-model_version-output-line-body-item-text"}>
                    {texts}
                </div>
            </div>
        )
    }
}


class ModelVersionLineBodyItemChangeButton extends React.Component {
    render() {
        return (
            <div className={"Tool-main-model_version-output-line-body-item"}>
                <Button style={{width: "100px", height: "40px"}}
                        className="Tool-main-model_version-output-line-body-item-change_button"
                        onClick={this.props.changeModelVersionOnClick}
                >
                    <CheckOutlined style={{fontSize: "20px"}}/>

                </Button>
            </div>
        );
    }
}
