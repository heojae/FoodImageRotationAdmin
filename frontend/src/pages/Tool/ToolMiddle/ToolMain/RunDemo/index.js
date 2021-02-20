import React, {Component} from "react";
import ToolMainTitle from "../ToolMainTitle";
import {connect} from "react-redux";

class RunDemo extends Component {
    constructor(props) {
        super(props);
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.mode === "RunDemo";
    // }


    render() {
        const show_or_not = this.props.tool_mode === "RunDemo";

        return (
            <div className={"Tool-main-run_demo"} style={{display: show_or_not ? "block" : "none"}}>
                <ToolMainTitle title={"Food Image Rotation Detector[API]"}
                               docs={"음식 이미지들을 올리고, EXIF DATA Degree 와 model 의 Rotation Degree 를 고려한 회전된 이미지가 나옵니다. "}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tool_mode: state.tool.mode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(RunDemo);

