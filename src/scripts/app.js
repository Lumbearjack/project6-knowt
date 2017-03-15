import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

class App extends React.Component {
    constructor() {
        super();
    }
    render(){
        return (
            <div>
                <h1>Hello!</h1>
            </div>
        )
    }
    componentDidMount(){
        console.log('Mounted');
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
