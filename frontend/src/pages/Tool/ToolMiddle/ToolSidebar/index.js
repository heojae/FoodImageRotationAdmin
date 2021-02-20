import React, {Component} from "react"
import * as actions from "../../../../actions";
import {connect} from "react-redux";


class ToolSidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Tool-sidebar" style={{display: this.props.sidebar_show_or_not ? "block" : "none"}}>
                ToolSidebar
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sidebar_show_or_not: state.sidebar.show_or_not
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetToolMode: (mode) => {
            dispatch(actions.setToolMode(mode))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ToolSidebar);



