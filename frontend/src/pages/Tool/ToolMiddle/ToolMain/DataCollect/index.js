import React, {Component} from "react";
import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";
import ChoiceDataset from "./ChoiceDataset";

import "./index.css";
import * as actions from "../../../../../actions";
import ImageInfoOutput from "./ImageInfoOutput";
import SaveDataset from "./SaveDataset";
import Cookies from "universal-cookie";
import {getDatasetInfoList} from "./API";


class DataCollect extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");
        const metadata = {"access_token": access_token};
        await getDatasetInfoList(metadata, this.props.handleSetDataCollectDatasetInfoList);
    }

    render() {
        const show_or_not = this.props.tool_mode === "DataCollect";
        return (
            <div className={"Tool-main-data_collect"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"DATA Collection of Food Image Rotation"}
                               docs={"food Image Rotation AI 의 Demo 를 통해서 얻은 부족한 경우들을 모아, 학습을 위한 데이터 로 사용됩니다."}/>

                <ChoiceDataset
                    dataset_info_list={this.props.dataset_info_list}
                    handleSetDataCollectDatasetInfoList={this.props.handleSetDataCollectDatasetInfoList}
                    handleSetDataCollectImageInfoList={this.props.handleSetDataCollectImageInfoList}
                />

                <ImageInfoOutput choose_dataset_info_pk={this.props.choose_dataset_info_pk}
                                 image_info_list={this.props.image_info_list}/>

                <SaveDataset choose_dataset_info_pk={this.props.choose_dataset_info_pk}
                             dataset_info_list={this.props.dataset_info_list}
                             handleSetDataCollectDatasetInfoList={this.props.handleSetDataCollectDatasetInfoList}
                             handleSetDataCollectImageInfoList={this.props.handleSetDataCollectImageInfoList}
                />

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tool_mode: state.tool.mode,
        choose_dataset_info_pk: state.data_collect.choose_dataset_info_pk,
        dataset_info_list: state.data_collect.dataset_info_list,
        image_info_list: state.data_collect.image_info_list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetDataCollectDatasetInfoList: (dataset_info_list) => {
            dispatch(actions.setDataCollectDatasetInfoList(dataset_info_list))
        },

        handleSetDataCollectImageInfoList: (dataset_info_pk, image_info_list) => {
            dispatch(actions.setDataCollectImageInfoList(dataset_info_pk, image_info_list))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DataCollect);

