<template lang="pug">
.blog-posts
    ul.blog-posts__list
        li(v-for="item in posts" :key="item.id" @click="choosePost(item.id)").blog-posts__item
            .blog-posts__item-top
                h2.blog-posts__title.subtitle {{ item.title }}
                button(type="button" @click.stop="deletePost(item.id)").remove-btn X
            time.blog-posts__date {{ (new Date(+item.date * 1000)) | moment('LL') }}
            p.text.blog-posts__text {{ item.content }}
</template>

<script>

export default {
    name: 'BlogPosts',
    props: {
        posts: {
            type: Array,
            default: () => ([])
        },
        choosePost: {
            type: Function,
            default: () => {}
        },
        deletePost: {
            type: Function,
            default: () => {}
        }
    },
};
</script>

<style lang="sass" scoped>
@import "~@admin/styles/common/variables"
.blog-posts
    height: 450px
    &__list
        overflow-y: scroll
        height: 100%
        &::-webkit-scrollbar
            width: 8px
            background-color: $textColor
        &::-webkit-scrollbar-thumb
            width: 6px
            background-color: #ffffff
    &__item
        margin-bottom: 10px
        padding: 15px
        cursor: pointer
        transition: background-color 0.5s ease
        &:hover
            background-color: #ffffff
    &__item-top
        display: flex
        justify-content: space-between
        position: relative
    &__title
    &__date
    &__text
        overflow: hidden
        display: -webkit-box
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical
</style>
