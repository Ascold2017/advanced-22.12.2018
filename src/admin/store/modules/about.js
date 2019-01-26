import {
    GET_SKILLS,
    SET_SKILLS,
    SET_TO_ZERO_SKILLS,
    SET_TO_ZERO_SKILL_FORMS,
    SET_TO_ZERO_SKILL_FORM,
    DEFINE_SKILL_ITEM,
    SET_SKILL_TITLE,
    SET_SKILL_PERCENTS,
    CREATE_SKILL,
    PATCH_SKILL,
    DELETE_SKILL,

    PUSH_SKILL,
    REMOVE_SKILL,
    REPLACE_SKILL,

    CHOOSE_SKILL_FOR_EDIT,

    VALIDATE_SKILL
} from '@admin/store/actions/about';
import apiRequest from '@admin/helpers/apiRequest';
import { getSkills, createSkill } from '@admin/helpers/mockRequest';
import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        skills: [],

        skillItemForms: {},

        skillTypes: [
            { id: 1, title: 'Frontend' },
            { id: 2, title: 'Backend' },
            { id: 3, title: 'WorkFlow' }
        ],

        isEdit: false
    },

    getters: {
        skills: ({ skills }) => skills,

        skillItemForms: ({ skillItemForms }) => skillItemForms,

        skillTypes: ({ skillTypes }) => skillTypes,
        isEdit: ({ isEdit }) => isEdit
    },

    mutations: {
        // skills
        [SET_SKILLS]: (state, skills) => {
            state.skills = skills;
        },

        [SET_TO_ZERO_SKILLS]: state => {
            state.skills = [];
        },

        // skill item
        [DEFINE_SKILL_ITEM]: (state, category) => {
            Vue.set(state.skillItemForms, category, {
                skillId: null,
                skillTitle: null,
                skillPercents: null,
                skillCategory: category,
            })
        },

        [SET_SKILL_TITLE]: (state, { category, value }) => {
            state.skillItemForms[category].skillTitle = value;
        },

        [SET_SKILL_PERCENTS]: (state, { category, value }) => {
            state.skillItemForms[category].skillPercents = value;
        },

        [CHOOSE_SKILL_FOR_EDIT]: (state, skillId) => {
            const skill = state.skills.find(skill => skill.id === skillId);
            state.skillItemForms[skill.category] = {
                skillId: skill.id,
                skillTitle: skill.title,
                skillPercents: skill.percents,
                skillCategory: skill.category
            };
            state.isEdit = true;
        },

        // after actions
        [PUSH_SKILL]: (state, skill) => {
            state.skills.push(skill);
        },
        
        [SET_TO_ZERO_SKILL_FORMS]: (state) => {
            state.skillItemForms = {};
        },

        [SET_TO_ZERO_SKILL_FORM]: (state, category) => {
            state.skillItemForms[category] = {
                skillId: null,
                skillTitle: null,
                skillPercents: null,
                skillCategory: category,
            };
            state.isEdit = false;
        },

        /*
        [REPLACE_SKILL]: (state, updatedSkill) => {
            state.skills = state.skills.map(skill => skill.id === updatedSkill.id ? updatedSkill : skill);
        },

        [REMOVE_SKILL]: (state, skillId) => {
            state.skills = state.skills.filter(skill => skill.id !== skillId);
        },
        */
    },

    actions: {
        [GET_SKILLS]: ({ commit }) => new Promise((resolve, reject) => {
            apiRequest({ url: `/skills/58`, method: 'GET' })
            //getSkills({ url: `/skills/58`, method: 'GET' }) // 58 - is your userId (example!!!)
            .then(data => {
                commit(SET_SKILLS, data);
                resolve(data);
            })
            .catch(reject);
        }),

        [CREATE_SKILL]: ({ state, commit, dispatch }, category) => new Promise((resolve, reject) => {
            dispatch(VALIDATE_SKILL, category)
            .then(() => {

                const data = {
                    title: state.skillItemForms[category].skillTitle,
                    percents: state.skillItemForms[category].skillPercents,
                    category: state.skillItemForms[category].skillCategory
                }

                //apiRequest({ url: `/skills/`, method: 'POST', data })
                createSkill({ url: `/skills/`, method: 'POST', data })
                .then(data => {
                    commit(PUSH_SKILL, data);
                    commit(SET_TO_ZERO_SKILL_FORM, category);
                    alert('Запись добавлена') // TODO - open notification modal popup
                    resolve(data);
                })
                .catch(reject);
            })
            .catch(reject)
        }),
        
        // TODO PATCH_SKILL, DELETE_SKILL

        [VALIDATE_SKILL]: ({ state }, category) => new Promise((resolve, reject) => {
            const errors = [];
            !state.skillItemForms[category].skillTitle && errors.push('"не заполнено название технологии"');
            if (isNaN(+state.skillItemForms[category].skillPercents) || +state.skillItemForms[category].skillPercents > 100) {
                errors.push("проценты должны быть числом и быть не больше 100");
            }
            
            if (errors.length > 0) {
                const errorText = `Ошибки: ${errors.join(',')}.`;
                alert(errorText); // TODO - open notification modal popup
                return reject(errorText);
            }
            resolve();
        })
    }
};
