import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// class Index extends React.Component{
//     state={
//         data:[]
//     }
// }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
