import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
    <Router>
        <Route path="/" component={App} />
    </Router>
)
  
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
