/**
 * Created by Administrator on 2017/7/18.
 */
import React, {Component} from 'react';
import {message, Form, Radio, Input, Button, Checkbox, Tabs, Table, Header} from 'antd';
import 'antd/dist/antd.min.css';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AddForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.form.setFieldsValue({type: 1})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const hide = message.loading('提交中', .2);
                fetch('/api/add', {
                    method: 'post',
                    header: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                })
                    .then(res => res.text())
                    .then(data => {
                        if (data === 'ok') {
                            hide();
                            message.success('提交成功');
                        }
                        this.props.form.setFieldsValue({name: ''})
                    })
            }
        });
    }

    checkConfirm(rule, value, callback) {
        if (value && value.length < 2) {
            callback(`当前长度是${value.length},最少不得少于2位`)
        } else {
            callback();
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                sm: {span: 3},
            },
            wrapperCol: {
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                sm: {
                    span: 14,
                    offset: 3,
                },
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="名字" {...formItemLayout}>
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {required: true, message: '必填项'},
                                {validator: this.checkConfirm}
                            ]
                        })(
                            <Input placeholder="新增内容" type="text"/>
                        )
                    }
                </FormItem>
                <FormItem label="是否显示" {...formItemLayout}>
                    {
                        getFieldDecorator('type')(
                            <RadioGroup>
                                <Radio value={1}>显示</Radio>
                                <Radio value={0}>不显示</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        )
    }
}
const Add = Form.create()(AddForm);
class CateManager extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
        this.handleChange=this.handleChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
    }

    ////////////////////////////////////增加的时候还不能立即更新
    handleChange() {
        fetch('/api/cate')
            .then(res => res.json())
            .then(data => this.setState({data: data}))
    }
    tabChange(key) {
        console.log(key)
        if (key === 'list') {
            this.handleChange();
        }
    }
    componentDidMount() {
        this.handleChange();
    }


    /////////////////////////////////////////////删除
    handleDelete(id) {
        this.setState({
            data: this.state.data.filter(v => {
                return v.id != id;
            })
        });
        fetch('/api/delete?id=' + id)
            .then(res => res.json())
            .then(data => this.setState({
                data: data
            }));
        message.success('删除成功')

    }

    ///////////////////////////////////////////是否默认选择的事件
    handleType(v, id) {
        fetch(`/api/update?type=${v}&&id=${id}`)
            .then(res => res.json())
            .then(data => this.setState({
                    data: data
                })
            );
        message.success('更改成功')
    }

    render() {
        const columns = [
            {title: 'id', dataIndex: 'id', key: 1,sorter: (a, b) => a.id - b.id,},
            {title: '标题', dataIndex: 'name', key: 2},
            {
                title: '是否默认选中',
                key: 4,
                render: (v) => {
                    return (
                        <RadioGroup>
                            <Radio
                                value={1}
                                checked={v.type == 1 ? true : false}
                                onClick={() => this.handleType(v.type, v.id)}>显示</Radio>
                            <Radio
                                onClick={() => this.handleType(v.type, v.id)}
                                value={0}
                                checked={v.type == 0 ? true : false}>不显示</Radio>
                        </RadioGroup>
                    )
                }
            },
            {
                title: '操作',
                key: 3,
                render: (v) => {
                    return (
                        <a onClick={() => this.handleDelete(v.id)}>删除</a>
                    )
                }
            },
        ];
        return (

            <Tabs defaultActiveKey="list" onChange={this.tabChange}>
                <TabPane tab="新增" key="add">
                    <Add/>
                </TabPane>
                <TabPane tab="列表详情" key="list">
                    <Table columns={columns} dataSource={this.state.data}
                           pagination={{pageSize: 5, showQuickJumper: true}}></Table>
                </TabPane>
            </Tabs>
        )
    }
}
export default CateManager;