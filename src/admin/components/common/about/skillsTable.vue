<template lang="pug">
    table.skills-table
        tr.skills-table__row(v-for="skill in skills")
            skill-item(:skill="skill")
        tr.skills-table__row
            input(type="text" v-model="vTitle" placeholder="Технология").skills-table__input.skills-table__input_long
            .skills-table__cell
                input(type="text" v-model="vPercents").skills-table__input
                | %
        button(type="button" @click="submitItem").button.skills-table__button Добавить новый скилл в {{skillType.title}}
            
</template>
<script>
import SkillItem from '@admin/components/common/about/skillItem';
import {
    DEFINE_SKILL_ITEM,
    SET_SKILL_TITLE,
    SET_SKILL_PERCENTS,
    CREATE_SKILL,
    PATCH_SKILL
} from '@admin/store/actions/about';
import { createNamespacedHelpers} from 'vuex';
const { mapGetters: aboutMapGetters, mapMutations: aboutMapMutations, mapActions: aboutMapActions } = createNamespacedHelpers('about');
export default {
    components: { SkillItem },
    props: {
        skills: {
            type: Array,
            default: () => ([])
        },
        skillType: {
            type: Object,
            default: () => ({})
        },
    },

    computed: {
        ...aboutMapGetters(['skillItemForms', 'skillTypes', 'isEdit']),
        vTitle: {
            get() {
                return this.skillItemForms[this.skillType.id].skillTitle;
            },
            set(value) {
                this[SET_SKILL_TITLE]({ category: this.skillType.id, value });
            }
        },
        vPercents: {
            get() {
                return this.skillItemForms[this.skillType.id].skillPercents;
            },
            set(value) {
                this[SET_SKILL_PERCENTS]({ category: this.skillType.id, value });
            }
        },
    },

    created() {
        this[DEFINE_SKILL_ITEM](this.skillType.id);
    },

    methods: {
        ...aboutMapActions([CREATE_SKILL, PATCH_SKILL]),
        ...aboutMapMutations([SET_SKILL_TITLE, SET_SKILL_PERCENTS, DEFINE_SKILL_ITEM]),
        submitItem() {
            this[this.isEdit ? PATCH_SKILL : CREATE_SKILL](this.skillType.id)
            .catch(console.error);
        },
        // TODO chooseForEditSkill, removeSkill
    }
};
</script>
<style lang="sass" scoped>
.skills-table
    display: block
    width: 100%
    padding: 0 100px 30px 20px
    &__row
        width: 100%
        display: flex
        margin-bottom: 10px
        &:last-child
            margin-bottom: 0
    &__cell
        display: flex
        align-items: center
    &__input
        display: block
        width: 46px
        height: 32px
        padding: 0 10px
        background-color: #ffffff
        border-radius: 8px
        text-align: center
        border: 0
        margin-right: 10px
        &_long
            width: 100%
    &__button
        height: auto
        font-size: 14px
        padding: 10px
</style>


