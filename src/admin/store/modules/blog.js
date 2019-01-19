import {
    GET_POSTS,
    SET_POSTS,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,

    REMOVE_POST,
    REPLACE_POST,
    PUSH_POST,

    SET_TO_ZERO_POSTS,
    SET_TO_ZERO_POST,

    SET_POST_TITLE,
    SET_POST_DATE,
    SET_POST_CONTENT,

    SET_POST_TO_EDIT,
    VALIDATE_POST
} from '@admin/store/actions/blog';
import { OPEN_NOTIFICATION } from '@admin/store/actions/notification';
import apiRequest from '@admin/helpers/apiRequest';
import { getPosts, createPost, patchPost, deletePost } from '@admin/helpers/mockRequest';
import store from '@admin/store';

const correctMonth = (month) => {
    month += 1; // потому что начинается с 0
    if (month < 10) {
        month = '0'+month;
    }
    return month;
}
const correctDate = (date) => {
    if (date < 10) {
        date = '0'+date;
    }
    return date;
}
const correctDateString = (date) => `${correctDate(date.getDate())}/${correctMonth(date.getMonth())}/${date.getFullYear()}`;
const correctDateStringInput = (date) => `${date.getFullYear()}-${correctMonth(date.getMonth())}-${correctDate(date.getDate())}`;

export default {
    namespaced: true,

    state: {
        posts: [],

        title: null,
        date: null,
        content: null,

        isEditId: null
    },

    getters: {
        posts: ({ posts }) => posts,

        title: ({ title }) => title,
        date: ({ date }) => date,
        content: ({ content }) => content,

        isEditId: ({ isEditId }) => isEditId
    },

    mutations: {
        [SET_POSTS]: (state, posts) => {
            state.posts = posts;
        },

        [SET_TO_ZERO_POSTS]: (state) => {
            state.posts = [];
        },

        [SET_TO_ZERO_POST]: (state) => {
            state.title = null;
            state.date = null;
            state.content = null;
            state.isEditId = null;
        },

        [SET_POST_TITLE]: (state, value) => {
            state.title = value;
        },

        [SET_POST_DATE]: (state, value) => {
            state.date = value;
        },
        
        [SET_POST_CONTENT]: (state, value) => {
            state.content = value;
        },

        [PUSH_POST]: (state, post) => { 
            state.posts.push(post);
        },

        [REMOVE_POST]: (state, postId) => {
            state.posts = state.posts.filter(post => post.id !== postId)
        },

        [REPLACE_POST]: (state, updatedPost) => {
            state.posts = state.posts.map(post => post.id === updatedPost.id ? updatedPost : post);
        },
        
        [SET_POST_TO_EDIT]: (state, postId) => {
            const post = state.posts.find(post => post.id === postId);
            state.title = post.title;
            state.date = correctDateStringInput(new Date(+post.date * 1000), '-');
            state.content = post.content;
            state.isEditId = postId;
        }
    },

    actions: {
        [VALIDATE_POST]: ({ state }) => new Promise((resolve, reject) => {
            const errors = [];
            !state.title && errors.push('не заполнен заголовок');
            !state.date && errors.push('не выбрана дата');
            !state.content && errors.push('не заполнено содержимое');
            const errorText = `Ошибки: ${errors.join(',')}.`;
            if (errors.length > 0) {
                store.commit(OPEN_NOTIFICATION, { text: errorText });
                return reject(errorText)
            }

            resolve();
        }),

        [GET_POSTS]: ({ commit }) => new Promise((resolve, reject) => {
            //apiRequest({ url: `/posts/58`, method:'GET' })
            getPosts({ url: `/posts/58`, method:'GET' })
            .then(data => {
                commit(SET_POSTS, data);
                resolve(data)
            })
            .catch(reject)
        }),

        [CREATE_POST]: ({ state, commit, dispatch }) => new Promise((resolve, reject) => {
            dispatch(VALIDATE_POST)
            .then(() => {
                const data = {
                    title: state.title,
                    date: correctDateString(new Date(state.date), '/'),
                    content: state.content
                }
                
                //apiRequest({ url: `/posts`, method:'POST', data})
                createPost({ url: `/posts`, method:'POST', data})
                .then(data => {
                    commit(SET_TO_ZERO_POST);
                    commit(PUSH_POST, data);
                    
                    resolve(data)
                })
                .catch(reject)
            })
           .catch(reject);
        }),

        [UPDATE_POST]: ({ state, commit, dispatch }) => new Promise((resolve, reject) => {
            dispatch(VALIDATE_POST)
            .then(() => {
                const data = {
                    title: state.title,
                    date: state.date,
                    content: state.content
                };
                //apiRequest({ url: `/posts/${state.isEditId}`, method:'POST', data})
                patchPost({ url: `/posts/${state.isEditId}`, method:'POST', data})
                .then(data => {
                    commit(SET_TO_ZERO_POST);
                    commit(REPLACE_POST, data.post);
                    store.commit(OPEN_NOTIFICATION, { text: data.message });
                    resolve(data)
                })
                .catch(reject);
            })
            .catch(reject);
        }),

        [DELETE_POST]: ({ commit }, postId) => new Promise((resolve, reject) => {
            //apiRequest({ url: `/posts/${postId}`, method: 'DELETE' })
            deletePost({ url: `/posts/${postId}`, method: 'DELETE' })
            .then(data => {
                commit(SET_TO_ZERO_POST);
                commit(REMOVE_POST, postId);
                store.commit(OPEN_NOTIFICATION, { text: data.message });
                resolve(data)
            })
            .catch(reject)
        })
    },
};
