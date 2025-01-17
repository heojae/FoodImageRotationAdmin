// reducer => 변화를 일으킬 수 있는 함수
import {combineReducers} from "redux";
import user from "./user";
import sidebar from "./sidebar";
import tool from "./tool";
import run_demo from "./run_demo";
import data_collect from "./data_collect"
import model_version from "./model_version"

const reducers = combineReducers({
    user, sidebar, tool, run_demo, data_collect, model_version
});

export default reducers;