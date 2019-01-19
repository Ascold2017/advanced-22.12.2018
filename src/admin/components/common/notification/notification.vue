<template lang="pug">
    .alert(@click.prevent.stop="" v-if="isOpen")
        .alert__container
            p.alert__title {{ title }}
            button(type="button" @click="closeNotification").button.alert__button Взорвать стул
</template>
<script>
import { CLOSE_NOTIFICATION } from '@admin/store/actions/notification';
import { mapGetters, mapMutations } from 'vuex';
export default {
    computed: {
        ...mapGetters(['title', 'isOpen'])
    },
    methods: {
        ...mapMutations([CLOSE_NOTIFICATION]),
        closeNotification() {
            this[CLOSE_NOTIFICATION]();
        }
    }
};
</script>
<style lang="sass" scoped>
.alert
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-image: url('~@admin/img/motherfucker.png')
    &__container
        position: absolute
        top: 50%
        left: 50%
        transform: translateX(-50%) translateY(-50%)
        max-width: 280px
        width: 100%
        padding: 20px
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
        background-color: #ffffff
        text-align: center
        border-radius: 8px
    &__title
        color: $textColor
        font-family: Roboto
        font-size: 16px
        font-weight: 400
        margin-bottom: 15px
    &__button
        margin: 0 auto
</style>


