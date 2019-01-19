<template lang="pug">
    .content
        h2.title Страница «Блог»
        .blog
            form(@submit.prevent="saveChanges").blog-add
                h2.subtitle.section-title Добавить запись
                input(type="text" placeholder="Название" v-model="vTitle" required).input
                input(type="date" placeholder="Дата" v-model="vDate" required).input
                textarea(placeholder="Текст" v-model="vContent" required).input.input_textarea
                button(type="submit").button Сохранить
            
            blog-posts(
                :posts="posts"
                :choosePost="choosePost"
                :deletePost="deletePost")
</template>
<script>
import {
    GET_POSTS,
    SET_TO_ZERO_POSTS,
    SET_TO_ZERO_POST,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    SET_POST_TITLE,
    SET_POST_DATE,
    SET_POST_CONTENT,
    SET_POST_TO_EDIT,
    VALIDATE_POST
} from '@admin/store/actions/blog';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters: blogMapGetters, mapMutations: blogMapMutations, mapActions: blogMapActions } = createNamespacedHelpers('blog');

import BlogPosts from '@admin/components/common/blog/postsList';
export default {
    components: {BlogPosts},
    computed: {
        ...blogMapGetters(['title', 'date', 'content', 'posts', 'isEditId']),
        vTitle: {
            get() {
                return this.title;
            },
            set(v) {
                this[SET_POST_TITLE](v);
            }
        },
        vDate: {
            get() {
                return this.date;
            },
            set(v) {
                this[SET_POST_DATE](v);
            }
        },
        vContent: {
            get() {
                return this.content;
            },
            set(v) {
                this[SET_POST_CONTENT](v);
            }
        }
    },
    created() {
        this[GET_POSTS]();
    },

    destroyed() {
        this[SET_TO_ZERO_POST]();
        this[SET_TO_ZERO_POSTS]();
    },
    
    methods: {
        ...blogMapMutations([SET_TO_ZERO_POSTS, SET_TO_ZERO_POST, SET_POST_TITLE, SET_POST_DATE, SET_POST_CONTENT, SET_POST_TO_EDIT]),
        ...blogMapActions([GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, VALIDATE_POST]),
        choosePost(id) {
            this[SET_POST_TO_EDIT](id);
        },
        deletePost(id) {
            this[DELETE_POST](id);
        },
        saveChanges() {
            this[this.isEditId ? UPDATE_POST : CREATE_POST]()
            .catch(console.error);
        }
    },
};
</script>
<style lang="sass" scoped>
.blog
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr
    padding-top: 45px
.blog-add
    height: 450px
</style>