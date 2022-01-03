const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'www.domain.com'

export const api = {
    posts: {
        list: `${BASE_URL}/api/posts`,
        retrieve: postSlug => `${BASE_URL}/api/posts/${postSlug}`,
        create: `${BASE_URL}/api/posts/create/`,
        update: postSlug => `${BASE_URL}/api/posts/${postSlug}/update`,
    }
}