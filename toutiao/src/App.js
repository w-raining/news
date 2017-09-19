import React, {Component} from 'react';
import './App.css';
import Cate from './components/cate/cate';
import Index from './components/index/index';
import Search from './components/search/search';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Show extends Component {
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        fetch('/api/getNewsById?id=' + this.props.match.params.id)
            .then(res => res.json())
            .then(r => this.setState({
                data: r[0],
            }));
    }
    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
            }}>
                <div style={{
                    width: '100%',
                    height: '42',
                    background: '#D43D3D',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 20,
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: '.45rem',
                }} className="top">
                    <span style={{display: 'block', marginTop: '.1rem'}}>今日头条</span>
                    <Link style={{
                        display: 'block',
                        position: 'fixed',
                        top: '.24rem',
                        left: '.24rem',
                        color: '#fff',
                        fontSize: '.2rem'
                    }} className="back" to='/'>
                        返回
                    </Link>
                </div>
                {this.state.data.content ?
                    (<div dangerouslySetInnerHTML={{_html: this.state.data.content}}></div>) :
                    (<iframe style={{
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        border: 'none',
                    }} src={this.state.data.url}>
                    </iframe>)
                }
            </div>
        )
    }

}

class App extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            currentChannel: 1,
            o: [],
            page: 1,
            loading: true,
            circle: true,
            more: true,
        };
        this.toggle = this.toggle.bind(this);
        this.onchange = this.onchange.bind(this);
    }

    onchange(id) {
        this.setState({
            currentChannel: id
        });
        fetch('/api/getNewsByPage?id=' + id)
            .then(res => res.json())
            .then(r => {
                this.setState({
                    o: r,
                    page: 1,
                    loading: true,
                    circle: true,
                })
            });
        this.setState({
            loading: false,
            o: [],
            circle: false,
        })
    }

//更新
    componentDidMount() {
        //下拉更新
        fetch('/api/getNewsByPage?id=1')
            .then(res => res.json())
            .then(r => {
                this.setState({
                    o: r,
                })
            });
        var that = this;
        window.onscroll = function () {
            // console.log(window.innerHeight);
            // console.log(that.el.offsetHeight);
            // console.log(document.body.scrollTop);
            // console.log(that.el.offsetHeight - window.innerHeight >= document.body.scrollTop)
            if (that.el.offsetHeight - window.innerHeight <= document.body.scrollTop) {
                that.setState({
                    more: false,
                });
                var page = that.state.page + 1;
                that.setState({page: page});
                if (!that.state.more) {
                    fetch('/api/getNewsByPage?id=' + that.state.currentChannel + '&' + 'page=' + page)
                        .then(res => res.json())
                        .then(r => {
                            that.setState({
                                o: that.state.o.concat(r),
                                more: true,
                            })
                        });
                }
            }
        };
        // if (localStorage.cate) {
        //     var arr1 = JSON.parse(localStorage.cate);
        //     fetch('/index.php/index.php/home/cate')
        //         .then(res => res.json())
        //         .then(this.setState({categories: arr1}))
        //     fetch('/index.php/index.php/home/cate')
        //         .then(res => res.json())
        //         .then(r => {
        //             if (r.length !== arr1.length) {
        //                 r.forEach(v =>
        //                         v.type = Number(v.type)
        //                 );
        //                 this.setState({
        //                     categories: r,
        //                 });
        //             } else {
        //                 this.setState({
        //                     categories: arr1,
        //                 });
        //             }
        //             localStorage.cate = JSON.stringify(r);
        //
        //         });
        // }
        // else {
        fetch('/api/cate')
            .then(res => res.json())
            .then(r => {
                r.forEach(v =>
                    v.type = Number(v.type)
                );
                this.setState({
                    categories: r
                });
                // localStorage.cate = JSON.stringify(r);
            })
        // }

    }

    toggle(id) {
        var arr = this.state.categories.map(v => {
            if (v.id == id) {
                v.type = !v.type;
            }
            return v;
        });
        this.setState({
            categories: arr,
        })
    }

    render() {
        var su = this.state.categories.filter(v => v.type);
        return (
            <Router>
                <div className="App">
                    <div className="App-intro" ref={(el) => this.el = el}>
                        <Route path='/cate'
                               render={() => <Cate handleAction={this.toggle} data={this.state.categories}/>}/>
                        <Route exact path='/' render={() => <Index currentChannel={this.state.currentChannel}
                                                                   currentNews={this.state.o}
                                                                   circle={this.state.circle}
                                                                   onchange={this.onchange}
                                                                   loading={this.state.loading}
                                                                   more={this.state.more}
                                                                   handleAction={this.toggle}
                                                                   data={su}/>}/>
                        <Route path='/show/:id' component={Show}/>
                        <Route path='/search' component={Search}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;


