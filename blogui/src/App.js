import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import { createBrowserHistory } from 'history';
import PostList from './container/PostList'
import Layout from './container/Layout';


const history = createBrowserHistory()

const App = () => { 
    return (
        <Router history={history}>
            <Layout>
                <Routes>
                    <Route path="/" element={<PostList />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App
