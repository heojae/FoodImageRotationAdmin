import React, {Component} from "react";
import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";


class DataCollect extends Component {
    constructor(props) {
        super(props);
    }
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.mode === "DataCollect";
    // }

    render() {
        const show_or_not = this.props.mode === "DataCollect";
        return (
            <div className={"Tool-main-data_collect"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"DATA Collection of Food Image Rotation"}
                               docs={"food Image Rotation AI 의 Demo 를 통해서 얻은 부족한 경우들을 모아, 학습을 위한 데이터 로 사용됩니다."}/>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        mode: state.tool.mode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(DataCollect);

