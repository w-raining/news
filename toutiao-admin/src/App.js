import React, {Component} from 'react';
import './App.css';
import Admin from './components/admin/admin';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-intro" ref={(el) => this.el = el}>
                        <Route path="/admin" component={Admin}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;



/*npm run build*/