// TODO : 자 이제 구현을 시작하지, 시발
import React, {Component} from "react";
import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";
import ChoiceDataset from "./ChoiceDataset";

import "./index.css";
import * as actions from "../../../../../actions";


class DataCollect extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const show_or_not = this.props.tool_mode === "DataCollect";
        return (
            <div className={"Tool-main-data_collect"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"DATA Collection of Food Image Rotation"}
                               docs={"food Image Rotation AI 의 Demo 를 통해서 얻은 부족한 경우들을 모아, 학습을 위한 데이터 로 사용됩니다."}/>

                <ChoiceDataset handleSetDataCollectImageInfoList={this.props.handleSetDataCollectImageInfoList}/>


            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tool_mode: state.tool.mode,
        image_info_list: state.data_collect.image_info_list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetDataCollectImageInfoList: (image_info_list) => {
            dispatch(actions.setDataCollectImageInfoList(image_info_list))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DataCollect);

