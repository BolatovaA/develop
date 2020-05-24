import React, { Component, useEffect, useState } from 'react';
import {Form, Button, Input, Row, Col, Table} from 'antd';
import "./index.less";
import firebase from "./firebase";

@Form.create()
class BucketAdd extends Component {

    constructor(props) {
        super(props);

        this.state= {
            name: "",
            product: "",
            price: null,
            quantity: null
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });

        this.props.form.validateFields((err, values) => {
            const userRef = db.collection("bucket-list").add({
                name: values.name,
                product: values.product,
                price: values.price,
                quantity: values.quantity
              });  
              this.setState({
                name: "",
                product: "",
                price: null,
                quantity: null
              });
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;

        return (<>
            <div className={'search-field'}>
                <Form onSubmit={this.onSubmitForm} layout="inline">
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Имя">
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Username is required!'}],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                        </Row> <br/>
                        <Row>
                            <Col span={8}>
                                <Form.Item label="Товар">
                                    {getFieldDecorator('product', {
                                        rules: [{required: true, message: 'Product is required!'}],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Цена">
                                    {getFieldDecorator('price', {
                                        rules: [{required: true, message: 'Price is required!'}],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Количество">
                                    {getFieldDecorator('quantity', {
                                        rules: [{required: true, message: 'Quantity is required!'}],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                        </Row><br/>
                        <Row>
                            <Col span={24}>
                                <Button type="primary" htmlType="submit">
                                    Добавить
                                </Button>
                            </Col>
                        </Row>
                </Form>
            </div><br/>
            <div className={'bucket-list'}>
                <Table 
                bodyStyle={{
                background: "#FFFFFF",
                margin: "0 24px"
                }}
                style={{
                background: "#FFFFFF"
                }}
                showHeader={false}
                border={false}
                size={"small"}
                pagination={false}
                rowKey={"id"}
                columns={[
                    {
                        title: "Имя",
                        dataIndex: "",
                        key: ""
                    },
                    {
                        title: "Товар",
                        dataIndex: "",
                        key: ""
                    },
                    {
                        title: "Цена",
                        dataIndex: "",
                        key: ""
                    },
                    {
                        title: "Количество",
                        dataIndex: "",
                        key: ""
                    },
                    {
                        title: "Сумма",
                        dataIndex: "",
                        key: ""
                    },
                    {
                        title: "Удалить",
                        dataIndex: "",
                        key: ""
                    }
                ]}/>
            </div>
        </>);
    }
}

export default BucketAdd;