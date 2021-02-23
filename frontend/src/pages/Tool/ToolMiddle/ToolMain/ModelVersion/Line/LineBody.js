import React, {Component} from "react";


export class ModelVersionUsingLineBody extends Component {
    constructor(props) {
        super(props);
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
        let model_file_name2 = model_file_name.slice(parseInt(model_file_name.length / 2), )



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





