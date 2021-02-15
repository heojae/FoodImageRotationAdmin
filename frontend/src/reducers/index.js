// reducer => 변화를 일으킬 수 있는 함수
import {combineReducers} from "redux";
import user from "./user";
import tool from "./tool";
import run_demo from "./run_demo";


const reducers = combineReducers({
    user, tool, run_demo
});

export default reducers;