<template lang="pug">
    nav.nav
        ul.nav__list
            li.nav__item(v-for="item in pages")
                router-link( :to="{ name: item.name }" class="nav__link" active-class="nav__link_active") {{ item.title }}
</template>
<script>
export default {
    name: 'AppTabs',
    data() {
        return {
            pages: [
                { name: 'about', title: 'Скиллы' },
                { name: 'blog', title: 'Блог' }
                // TODO works tab
            ],
        };
    },
};
</script>
<style lang="sass" scoped>
.nav
    background-color: $tabsColor
    flex: 0
    &__list
        display: flex
    &__item
        border-right: 3px solid #ffffff
        max-width: 180px
        width: 100%
        &::last-child
            border-right: 0
    &__link
        padding: 24px 10px
        color: $textColor
        opacity: 0.8
        font-family: Roboto
        font-size: 16px
        font-weight: 500
        text-transform: uppercase
        display: block
        text-align: center
        &_active
            background-color: #ffffff
            color: $blue
</style>


