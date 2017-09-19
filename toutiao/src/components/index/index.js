/**
 * Created by Administrator on 2017/7/17.
 */
import React, {Component} from 'react';
import './index.css';
import {
    Link
} from 'react-router-dom';
import './iconfont.css';

class Header extends Component {
    render() {
        return (
            <div className="head">
                <div className="left"></div>
                <p className="title">
                    <span className={`${this.props.circle ? 'active' : ''}`}>
                   </span>
                </p>
                <Link to='/search' className="right"></Link>
            </div>
        )
    }
}

class ContentFirst extends Component {
    render() {
        return (
            <div className="content">
                <div className="left">
                    <p className="text">赵丽颖花式夸吴亦凡 互动甜到爆炸</p>
                    <div className="text1">
                        <span>爱看蓝天的小野猫</span>
                        <span>评论 0</span>
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
        )
    }
}
class Tip extends Component {
    render() {
        return (
            <div className="tip" style={{display: `${this.props.loading ? 'none' : 'block' }`}}>
                加载中
            </div>

        )

    }
}
class More extends Component {
    render() {
        return (
            <div className="more" style={{display: `${this.props.more ? 'none' : 'block'}`}}>
                加载更多
            </div>
        )
    }
}
class ContentSecond extends Component {
    render() {
        return (
            <div className="content_info">
                <div className="top">
                    交通违法曝光台 7月13日14日违停车曝光
                </div>
                <ul className="photo">
                    <li><img src="./img/info1.jpg" alt=""/></li>
                    <li><img src="./img/info2.jpg" alt=""/></li>
                    <li><img src="./img/info3.jpg" alt=""/></li>
                </ul>
                <p>
                    <span>牡丹江晨报</span>
                    <span>评论 0</span>
                    <span>11分钟前</span>
                </p>
            </div>
        )
    }
}

class Index extends Component {
    render() {
        return (
            <div>
                <Tip loading={this.props.loading}/>
                <Header circle={this.props.circle}/>
                <div className="list">
                    <div className="info">
                        <ul className="info1">
                            {this.props.data.map(v =>
                                <li className="btn" key={v.id}>
                                    <a onClick={() => this.props.onchange(v.id)}
                                       className={`${this.props.currentChannel == v.id ? 'active' : ''}`}
                                       href={v.url}>{v.name}</a>
                                </li>)}
                        </ul>
                    </div>
                    <Link className="more" to="/cate"/>
                </div>
                <div className="tops"></div>
                <div>
                    {this.props.currentNews.map(v =>
                        <div className="content">
                            <div className="left">
                                <Link to={`/show/${v.id}`} className="text">{v.title}</Link>
                                <div className="text1">
                                    <span>爱看蓝天的小野猫</span>
                                    <span>评论 0</span>
                                </div>
                            </div>
                            <div className="right">
                                <img src={v.thumbnail} alt=""/>
                            </div>
                        </div>
                    )}
                </div>
                <More more={this.props.more}/>

            </div>
        )
    }
}
export default Index;