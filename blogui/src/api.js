const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://mdblog-api.herokuapp.com'

export const api = {
    auth: {
        login: `${BASE_URL}/dj-rest-auth/login/`,
        signup: `${BASE_URL}/dj-rest-auth/registration/`,
    },
    posts: {
        list: `${BASE_URL}/api/posts/`,
        retrieve: postSlug => `${BASE_URL}/api/posts/${postSlug}/`,
        create: `${BASE_URL}/api/posts/create/`,
        update: postSlug => `${BASE_URL}/api/posts/${postSlug}/update/`,
        delete: postSlug => `${BASE_URL}/api/posts/${postSlug}/delete/`,
    }
}