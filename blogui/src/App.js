import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

import Layout from './container/Layout';

import PostList from './container/PostList'
import PostCreate from './container/PostCreate'
import PostDetail from './container/PostDetail'
import PostUpdate from './container/PostUpdate'
import PostDelete from './container/PostDelete'

import { history } from './helpers';

const App = () => { 
    return (
        <Router history={history}>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<PostList />} />
                    <Route path="/create" element={<PostCreate />} />
                    <Route path="/post/:postSlug" element={<PostDetail />} />
                    <Route path="/post/:postSlug/update" element={<PostUpdate />} />
                    <Route path="/post/:postSlug/delete" element={<PostDelete />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App
