/**
 * Created by Administrator on 2017/7/17.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.min.css';
import './admin.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import CateManager from './cateManager';
import NewsManager from './newsManager';
import {Layout, Menu, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;         //结构赋值
// const {a, b, c, d} = {a: 1, b: 2, c: 3, d: 4};
class Admin extends Component {
    render() {
        const path = this.props.location.pathname;
        const a = path.split('/');
        const keys = a[a.length - 1];
        console.log(keys);
        return (
            <Layout>
                <Sider id="slide" style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                    <Link to="/admin">
                        <div style={{
                            height: 32,
                            background: '#333',
                            borderRadius: '6px',
                            margin: '16px',
                        }} className="logo"/>
                    </Link>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[keys]}>
                        <Menu.Item key="cateManager">
                            <Link to="/admin/cateManager">
                                <Icon type="appstore-o"/>
                                <span className="nav-text">分类列表</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="newsManager">
                            <Link to="/admin/newsManager">
                                <Icon type="edit"/>
                                <span className="nav-text">新闻管理</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{marginLeft: 200}}>
                    <Header style={{background: '#fff', padding: 0, textAlign: 'center'}}>

                    </Header>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <div style={{padding: 24, background: '#fff',maxWidth:'1048'}}>
                            <Route path="/admin/cateManager" component={CateManager}>
                            </Route>
                            <Route path="/admin/newsManager" component={NewsManager} >
                            </Route>
                            <Route path="/admin" render={() =>
                                <div style={{textAlign: 'center'}}>欢迎来到后台管理界面</div>}>
                            </Route>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2016 Created by wsy
                    </Footer>
                </Layout>
            </Layout>
        )

    }
}
export default  Admin;
// layput  table
// dataIndex  行里面的对象的字段
// 传递不同的props的时候。可以通过对象展开的方式进行传递。
/*class Example extends Component{
 render(){
 const o={x:'1',y:'2'}
 return(
 <div {...o}>
 this is h1
 </div>
 )

 // 100vh   整个屏幕的高度
 }*/
