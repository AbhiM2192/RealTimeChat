import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Join from './components/Join';
import Chat from './components/Chat';
const App = () =>(
    <Router>
        <Switch>
            <Route exact path='/' component={Join} />
            <Route path='/chat' component={Chat} />
            <Route path='*' render={() =><h1>Invalid Route</h1>} />
        </Switch>
    </Router>
)

export default App;