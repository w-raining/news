/**
 * Created by Administrator on 2017/7/17.
 */
import React, {Component} from 'react';
import './cate.css';
import {
    Link
} from 'react-router-dom'
const head = (
    <div className="head">
        <Link className="back" to="/"/>
        <p className="title1">频道管理</p>
    </div>
);
class Cate extends Component {
    render() {
        var els =  this.props.data.filter(v=>v.type).map(v=>
            <li onClick={()=>this.props.handleAction(v.id)}
                key={v.id}>{v.name}</li>);
        var els1 =  this.props.data.filter(v=>!v.type).map(v=>
            <li onClick={()=>this.props.handleAction(v.id)}
                key={v.id}>{v.name}</li>);
        return (
            <div className="body">
                {head}
                <div className="cate">
                    <div className="top">
                        <p>点击删除以下选项</p>
                        <ul>
                            {els}
                        </ul>
                    </div>
                    <div className="top">
                        <p>点击添加以下频道</p>
                        <ul>
                            {els1}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default Cate;