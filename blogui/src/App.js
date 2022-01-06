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

import Login from './container/Login';
import Signup from './container/Signup';
import PrivateRoute from './container/PrivateRoute';

const App = () => { 
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<PostList />} />
                    <Route
                        path="/create"
                        element={
                            <PrivateRoute>
                                <PostCreate />
                            </PrivateRoute>
                        }
                    />
                    <Route exact path="/post/:postSlug" element={<PostDetail />} />
                    <Route path="/post/:postSlug/update" element={<PostUpdate />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App
