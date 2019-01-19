<template lang="pug">
    .content
        h2.title Страница «Обо мне»
        ul.skills-list
            li.skills-list__item(v-for="skillType in skillTypes")
                h3.skills-list__title {{ skillType.title }}
                skills-table(:skills="skillsInType(skillType.id)" :skillType="skillType")
        button(type="button" @click="saveChanges").button Сохранить
</template>
<script>
import SkillsTable from '@admin/components/common/about/skillsTable';
import {
    GET_SKILLS,
    SET_TO_ZERO_SKILLS,
    SET_TO_ZERO_SKILL_FORMS,
} from '@admin/store/actions/about';
import { createNamespacedHelpers} from 'vuex';
const { mapGetters: aboutMapGetters, mapMutations: aboutMapMutations, mapActions: aboutMapActions } = createNamespacedHelpers('about');

export default {
    components: { SkillsTable },
    computed: {
       ...aboutMapGetters(['skillTypes', 'skills']),
    },
    created() {
        this[GET_SKILLS]();
    },
    destroyed() {
        this[SET_TO_ZERO_SKILLS]();
        this[SET_TO_ZERO_SKILL_FORMS]();
    },
    
    methods: {
        ...aboutMapActions([GET_SKILLS]),
        ...aboutMapMutations([SET_TO_ZERO_SKILLS, SET_TO_ZERO_SKILL_FORMS]),
        skillsInType(skillTypeId) {
            return this.skills.filter(skill => skill.category === skillTypeId);
        },
        saveChanges() {
            
        }
    },
    
};
</script>

<style lang="sass" scoped>
.skills-list
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-template-rows: 1fr 1fr
    grid-auto-flow: column
    padding-top: 45px
    &__item
        position: relative
        min-width: 300px
        &_add
            padding: 0 100px 30px 20px
    &__title
        color: $textColor
        font-family: Roboto
        font-size: 16px
        font-weight: 500
        line-height: 34px
    &__remove
        position: absolute
        top: 5px
        right: 100px
@media (max-width: 767px)
    .skills-list
        grid-template-columns: 1fr
        grid-auto-flow: row
</style>