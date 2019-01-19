<template lang="pug">
    label.skills-item
        span.skills-item__cell.subtitle {{ skill.title }}
        span.skills-item__cell
            input(type="text" :value="skill.percents" disabled).skills-item__input
            | %
        span.skills-item__cell
            button(type="button").skills-item__edit 
                | E
        span.skills-item__cell
            button(type="button").skills-item__remove X
</template>

<script>
export default {
    props: {
        skill: {
            type: Object,
            default: () => ({})
        },
    },

   
};
</script>
<style lang="sass" scoped>
.skills-item
    display: flex
    width: 100%
    &__cell
        display: flex
        align-items: center
        padding-right: 10px
        flex: 0 0 auto
        &:first-child
            flex: 1 1 auto
        &:last-child
            padding-right: 0
    &__input
        display: block
        width: 46px
        height: 32px
        background-color: #ffffff
        border-radius: 8px
        text-align: center
        border: 0
        margin-right: 10px
    &__edit, &__remove
        background: none
        border: 0
        color: $textColor
        cursor: pointer
        transition: color 0.5s ease
        &:hover
            color: firebrick
    &__edit
        &:hover
            color: green
</style>
