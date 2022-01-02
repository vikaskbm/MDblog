import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import { createBrowserHistory } from 'history';
import PostList from './container/PostList'
import 'fomantic-ui-css/semantic.css';

const history = createBrowserHistory()

const App = () => { 
    return (
        <Router history={history}>
          <Routes>
            <Route path="/" element={<PostList />} />
          </Routes>
        </Router>
    )
}

export default App
