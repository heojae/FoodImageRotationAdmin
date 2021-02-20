import React, {Component} from "react";
import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";
import DropZone from "./DropZone";
import * as actions from "../../../../../actions";

class RunDemo extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const show_or_not = this.props.tool_mode === "RunDemo";

        return (
            <div className={"Tool-main-run_demo"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"Food Image Rotation Detector[API]"}
                               docs={"음식 이미지들을 올리고, EXIF DATA Degree 와 model 의 Rotation Degree 를 고려한 회전된 이미지가 나옵니다. "}/>
                <DropZone handleSetRunDemoFileList={this.props.handleSetRunDemoFileList}/>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tool_mode: state.tool.mode,
        mode: state.run_demo.mode,
        file_list: state.run_demo.file_list,
        fix_file_list: state.run_demo.fix_file_list,
        is_mode_change: state.run_demo.is_mode_change,
        is_file_list_change: state.run_demo.is_file_list_change,
        is_fix_file_list_change: state.run_demo.is_fix_file_list_change
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetRunDemoFileList: (file_list) => {
            dispatch(actions.setRunDemoFileList(file_list))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RunDemo);

