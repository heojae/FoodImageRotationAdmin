import React, {Component} from "react";
import {Form, Input, Button, Checkbox} from 'antd';
import {createDatasetInfo} from "./API";
import Cookies from "universal-cookie";


class SaveDataset extends Component {
    constructor(props) {
        super(props);

        this.getLastDatasetPk = this.getLastDatasetPk.bind(this);
        this.submitToSaveDataset = this.submitToSaveDataset.bind(this);
    }

    getLastDatasetPk(dataset_info_list) {
        let lastPk = -1
        dataset_info_list.forEach(function (item, index) {
            if (item.pk > lastPk) {
                lastPk = item.pk
            }
        });
        return lastPk
    }

    async submitToSaveDataset(values) {
        const cookies = new Cookies();
        const access_token = cookies.get("access_token");
        const metadata = {"access_token": access_token};
        await createDatasetInfo(values.title, metadata);
    }

    render() {
        const is_remove_component = this.props.dataset_info_pk !== this.getLastDatasetPk(this.props.dataset_info_list)

        return (
            is_remove_component ? null :
                <Form
                    name="basic"
                    onFinish={this.submitToSaveDataset}
                    initialValues={{username: "John Doe"}}
                    style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px"}}
                >
                    <Form.Item
                        name="title" style={{width: "500px"}}
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: "10px"}}>
                            Save Dataset
                        </Button>
                    </Form.Item>
                </Form>
        );

    }
}

export default SaveDataset;
