/**
 * Created by Administrator on 2017/7/22.
 */
import React, {Component} from 'react';
import './search.css';
import {Link} from 'react-router-dom';
const top = (
    <div className="header">
        <Link to='/' className="back"></Link>
        搜索
    </div>
)
class Search extends Component{
    render() {
        return (
            <div className="top">
                {top}
                <div className="search">
                    <form action="">
                        <input type="text"/>
                    </form>
                </div>
            </div>
        )
    }
}
export default Search;