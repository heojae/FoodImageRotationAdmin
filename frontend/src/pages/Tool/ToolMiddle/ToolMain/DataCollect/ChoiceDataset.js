import {getChooseImageInfoList, getDatasetInfoList} from "./API";
import React, {Component} from "react";
import Cookies from "universal-cookie";
import {Button, Select} from "antd";


const {Option} = Select;


class ChoiceDataset extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.dataset_info_list.length !== nextProps.dataset_info_list.length;
    }

    constructor(props) {
        super(props);
        this.state = {
            choose_dataset_info_pk: 0,
        }
        this.setDataset = this.setDataset.bind(this);
        this.getImageInfoListOfChooseDataset = this.getImageInfoListOfChooseDataset.bind(this);
    }

    setDataset(value) {
        this.setState({choose_dataset_info_pk: value});
    }

    async getImageInfoListOfChooseDataset(event) {
        event.preventDefault();
        const choose_dataset_info_pk = this.state.choose_dataset_info_pk;
        if (choose_dataset_info_pk !== 0) {
            const cookies = new Cookies();
            const access_token = cookies.get("access_token");
            const metadata = {"access_token": access_token};
            await getChooseImageInfoList(choose_dataset_info_pk, metadata, this.props.handleSetDataCollectImageInfoList)
        }
    }



    render() {
        const dataset_info_list = this.props.dataset_info_list;
        const option_list = dataset_info_list.map((dataset_info, index) => {
            return <Option key={index} value={dataset_info.pk}
                           style={{width: "500px", height: "50px", textAlign: "center", fontSize: "20px"}}>
                {dataset_info.title}
            </Option>
        })

        return (
            <form className={"Tool-main-data_collect-choice_dataset"} onSubmit={this.getImageInfoListOfChooseDataset}>

                <Select style={{width: "500px", textAlign: "center", fontSize: "20px"}}
                        onChange={this.setDataset}
                >
                    {option_list}
                </Select>
                <ChoiceDatasetLoadButton text={"Load Dataset"}
                                         getImageInfoListOfChooseDataset={this.getImageInfoListOfChooseDataset}/>

            </form>
        )
    }
}


class ChoiceDatasetLoadButton extends Component {
    render() {
        return (
            <div className={"Tool-main-data_collect-choice_dataset-load_button"}>
                <Button
                    type={"submit"}
                    style={{width: "300px"}}
                    className="Tool-main-run_demo-choice_mode-item"
                    onClick={this.props.getImageInfoListOfChooseDataset}
                >
                    {this.props.text}
                </Button>
            </div>
        )
    }

}


export default ChoiceDataset;
