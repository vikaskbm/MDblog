import React from 'react'
import {Router, Route, Routes } from 'react-router-dom'
import 'fomantic-ui-css/semantic.css';
import { createBrowserHistory } from 'history';
import PostList from './container/PostList'

const history = createBrowserHistory()
const App = () => { 
    return (
        <Router history={history}>
            <Routes>
                <Route path="/"  component={PostList} />
            </Routes>
        </Router>
    )
}

export default App
