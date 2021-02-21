import {getChooseImageInfoList, getDatasetInfoList} from "./API";
import React, {Component} from "react";
import Cookies from "universal-cookie";
import {Button, Select} from "antd";


const {Option} = Select;


class ChoiceDataset extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.dataset_info_list.length !== nextState.dataset_info_list.length;
    }

    constructor(props) {
        super(props);
        this.state = {
            dataset_pk: 0,
            dataset_info_list: []
        }
        this.setDataset = this.setDataset.bind(this);
        this.handleSetDatasetInfoList = this.handleSetDatasetInfoList.bind(this);
        this.getImageInfoListOfChooseDataset = this.getImageInfoListOfChooseDataset.bind(this);
    }

    setDataset(value) {
        this.setState({dataset_pk: value});
    }

    handleSetDatasetInfoList(dataset_info_list) {
        this.setState({dataset_info_list: dataset_info_list});
    }

    async componentDidMount() {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");
        const metadata = {"access_token": access_token};
        await getDatasetInfoList(metadata, this.handleSetDatasetInfoList);
    }


    async getImageInfoListOfChooseDataset(event) {
        event.preventDefault();
        const dataset_pk = this.state.dataset_pk;
        if (dataset_pk !== 0) {
            const cookies = new Cookies();
            const access_token = cookies.get("access_token");
            const metadata = {"access_token": access_token};
            await getChooseImageInfoList(dataset_pk, metadata, this.props.handleSetDataCollectImageInfoList)
        }
    }


    render() {
        const dataset_info_list = this.state.dataset_info_list;
        const option_list = dataset_info_list.map((dataset_info, index) => {
            return <Option key={index} value={dataset_info[0]}
                           style={{width: "500px", height: "50px", textAlign: "center", fontSize: "20px"}}>
                {dataset_info[1]}
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
                    style={{width: "200px"}}
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
