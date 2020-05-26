import React, { Component } from 'react';
import {Form, Button, Input, Row, Col, Table} from 'antd';
import "./index.less";
import firestore from '../../Firestore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

@Form.create()
class BucketAdd extends Component {

    constructor(props) {
        super(props);

        this.ref = firestore.firestore().collection('bucket-list');
        this.purchase = null;

        this.state= {
            purchase: []
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const purchase = [];
        querySnapshot.forEach((doc) => {
          const { name, product, price, quantity, sum } = doc.data();
          purchase.push({
            key: doc.id,
            name,
            price,
            product,
            quantity,
            sum
          });
        });
        this.setState({
          purchase
       });
      }
    
      componentDidMount() {
        this.purchase = this.ref.onSnapshot(this.onCollectionUpdate);
      }

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log("get here")

        const db = firestore.firestore();
        db.settings({});

        this.props.form.validateFields((err, values) => {
            db.collection("bucket-list").add({
                name: values.username,
                product: values.product,
                price: values.price,
                quantity: values.quantity,
                sum: values.price * values.quantity
              });
              this.setState({
                purchase: []
              });
        });
    };

    onDeletePurchase(id){
        console.log(id)
        firestore.firestore().collection('bucket-list').doc(id).delete().then(() => {
          console.log("Товар успешно удален!");
          this.props.history.push("/")
        }).catch((error) => {
          console.error("Ошибка при удалении товара из корзины: ", error);
        });
      }
    

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = { labelCol: {} };

        console.log(this.state.purchase)

        return (<>
            <div className={'search-field'}>
                <Form autoComplete={"off"} onSubmit={this.onSubmitForm} labelAlign="left" layout="inline">
                        <Row>
                            <Col span={6}>
                                <Form.Item {...formItemLayout} label="Имя">
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Username is required!'}],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...formItemLayout} label="Товар">
                                    {getFieldDecorator('product', {
                                        rules: [{required: true, message: 'Product is required!'}],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                        </Row> <br/>
                        <Row>
                            <Col span={6}>
                                <Form.Item {...formItemLayout} label="Цена">
                                    {getFieldDecorator('price', {
                                        rules: [{required: true, message: 'Price is required!'}],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...formItemLayout} label="Количество">
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
                margin: "0 12px"
                }}
                style={{
                background: "#FFFFFF"
                }}
                showHeader={true}
                border={false}
                size={"small"}
                pagination={false}
                rowKey={"id"}
                columns={[
                    {
                        title: "Имя",
                        dataIndex: "name",
                        key: "name"
                    },
                    {
                        title: "Товар",
                        dataIndex: "product",
                        key: "product"
                    },
                    {
                        title: "Цена",
                        dataIndex: "price",
                        key: "price"
                    },
                    {
                        title: "Количество",
                        dataIndex: "quantity",
                        key: "quantity"
                    },
                    {
                        title: "Сумма",
                        dataIndex: "sum",
                        key: "sum"
                    },
                    {
                        title: "Удалить",
                        dataIndex: "key",
                        key: "key",
                        render: (record)=>(<span
                        onClick={() => {
                            this.onDeletePurchase(record)
                        }}>
                            <DeleteForeverIcon/>
                        </span>)
                    }
                ]}
                dataSource={this.state.purchase}/>
            </div>
        </>);
    }
}

export default BucketAdd;