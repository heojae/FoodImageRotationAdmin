import React, {Component} from "react";


export class ModelVersionUsingLineBody extends Component {
    render() {
        return (
            <div className={"Tool-main-model_version-output-line-body"}>
                <ModelVersionUsingLineBodyOneLine/>
            </div>
        )
    }
}


class ModelVersionUsingLineBodyOneLine extends Component {
    render() {
        return (
            <div className={"Tool-main-model_version-output-line-body-one_line"}>
                <ModelVersionLineBodyItemText text_list={["aa", "bb"]}/>
                <ModelVersionLineBodyItemText text_list={["aa", "bb"]}/>
                <ModelVersionLineBodyItemText text_list={["aa", "bb"]}/>
                <ModelVersionLineBodyItemText text_list={["aa", "bb"]}/>
                <ModelVersionLineBodyItemText text_list={["aa", "bb"]}/>
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





