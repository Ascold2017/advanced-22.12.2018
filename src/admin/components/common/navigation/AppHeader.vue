<template lang="pug">
    header.header
        h1.header__title Панель администрирования
        a(href="#" @click.prevent="logout").header__link Вернуться на сайт
</template>
<script>
import { LOG_OUT } from '@admin/store/actions/auth';
import { mapActions } from 'vuex';
export default {
    name: 'AppHeader',
    methods: {
        ...mapActions([LOG_OUT]),
        logout() {
            this[LOG_OUT]();
        }
    }
}
</script>

<style lang="sass" scoped>
.header
    padding: 30px
    display: flex
    justify-content: space-between
    align-items: center
    background-color: $blue
    flex: 0
    &__title
        color: #ffffff
        font-family: Roboto
        font-size: 28px
        font-weight: 500
        line-height: 34px
    &__link
        opacity: 0.7
        color: #ffffff
        font-family: Roboto
        font-size: 16px
        font-weight: 500
        line-height: 24px
        &:hover
            text-decoration: underline
</style>
