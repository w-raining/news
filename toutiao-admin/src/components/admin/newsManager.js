/**
 * Created by Administrator on 2017/7/19.
 */
import React, {Component} from 'react';
import WangEditor from './wangEditor';
import {Tabs, Table, Input, Form, Upload, Icon, Button, Radio, message} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//新增
class AddForm extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            editorphoto: [],
            smallphoto: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.form.setFieldsValue({type:'1'})
    }

    ////////////////////////////////////////////////////////////wangeditor的获取编辑器的内容
    handleText(html) {
        this.setState({
            editorphoto: html,
        })
    }

    handleChange(info) {
        if (info.file.status === 'done') {
            this.setState({
                smallphoto: info.file.response,
            })
        }
        console.log(info);
    }

    //////////////////////////////////提交的事件
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            values.smallphoto = this.state.smallphoto;
            values.editorphoto = this.state.editorphoto;
            if (!err) {
                fetch('/api/formSubmit', {
                    method: 'post',
                    header: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values)
                })
                    .then(res => res.text())
                    .then(data => {
                        if (data === 'ok') {
                            message.success('提交成功');
                            this.setState({
                                values:'',
                            })
                        }
                    })
            }
        })

    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const style = {
            labelCol: {
                sm: {span: 3},
            },
            wrapperCol: {
                sm: {span: 14},
            }
        };
        const editorstyle = {
            labelCol: {
                sm: {span: 3}
            },
            wrapperCol: {
                sm: {span: 18}
            }
        };
        const button = {
            wrapperCol: {
                sm: {
                    offset: 3
                }
            }

        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="新闻标题" {...style}>
                    {
                        getFieldDecorator('title')
                        (<Input type="text"/>)

                    }
                </FormItem>
                <FormItem label="缩略图" {...style}>
                    {
                        <div className="clearfix">
                            <Upload
                                onChange={this.handleChange}
                                action="/api/upload"
                                listType="picture-card">
                                <Icon type="plus"/>
                                <div className="ant-upload-text">上传</div>
                            </Upload>
                        </div>
                    }
                </FormItem>
                <FormItem label="编辑器" {...editorstyle}>
                    {
                        <WangEditor action="/api/editorPhoto" handleText={this.handleText}>
                        </WangEditor>

                    }
                </FormItem>

                <FormItem label="分类" {...style}>
                    {
                        getFieldDecorator('type')(
                            <RadioGroup>
                                {this.props.cate.map(v => (
                                    <Radio checked={true}
                                           key={v.id}
                                           value={v.id}>{v.name}</Radio>
                                ))}
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem {...button}>
                    <Button htmlType="submit" type="primary">提交</Button>
                </FormItem>

            </Form>
        )
    }
}
const Add = Form.create()(AddForm);
//列表
class News extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            cate: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('/api/cate')
            .then(res => res.json())
            .then(r => this.setState({cate: r}))
    }
    handleChange(key) {
        if (key == 'add') {
            return;
        }
        fetch('/api/getChange?id=' + key)
            .then(res => res.json())
            .then(r => this.setState({
                data: r
            }))

    }

    /*  handleSearch(e) {
     var key = e.target.value;
     var data = this.state.data;
     console.log(data)
     // this.setState({data: data});

     }*/



    render() {
        const columns = [
            {
                title: '标题',
                key: '1',
                render: (v) => (
                    <a href={v.url} target="_blank">{v.title}</a>
                ),
            },
            {
                title: '图片',
                key: '2',
                render: (v) => (
                    <img width={100} src={v.thumbnail} alt=""/>
                )
            },
            {title: '类别', dataIndex: 'cate', key: '3',},
            {title: '内容', dataIndex: 'content', key: '4'},
        ]
        var cate = this.state.cate.map(v => {
            v.key = v.id;
            return v;
        })
        const els = cate.map(v => (
            <TabPane tab={v.name} key={v.id}>
                <Table pagination={{pageSize: 5, showQuickJumper: true}}
                       columns={columns} dataSource={this.state.data.filter(x => x.cate == v.id)}>
                </Table>
            </TabPane>
        ));
        return (
            <Tabs defaultActiveKey="add" onChange={this.handleChange}>
                <TabPane tab="新增" key="add">
                    <Add cate={this.state.cate}/>
                </TabPane>
                {els}
            </Tabs>
        )
    }
}
export default News;