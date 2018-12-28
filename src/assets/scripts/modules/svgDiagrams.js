import viewObserver from '@modules/viewObserver';
import Vue from 'vue';
const svgDiagram = (skillsData) => {

    Vue.directive('animate', {
        inserted: (element, binding) => {
            //Get percent value from binding value
            let val = binding.value,
            //Calculating value for svg
            percent = 282.6 * (val/100.),
            //Find animated svg circle
            animatedCircle = element.querySelector('.svg-diagram__circle_second');
            
            function inViewAction() {
                //If diagram is visible in window - apply percent
                if (viewObserver(element)) {
                    
                    animatedCircle.style.strokeDasharray = percent + ' 282.6'
                }
            }
            inViewAction();
            window.addEventListener('scroll', () => inViewAction());
        }
    });

    new Vue({
        el: '#diagrams',
        data: {
            skills: skillsData,
            skillTypes: [
                { id: 1, title: 'Frontend' },
                { id: 2, title: 'Backend' },
                { id: 3, title: 'WorkFlow' }
            ]
        },

        mounted() {
            this.$el.style.display = 'block';
        },

        methods: {
            skillsByCategory(category) {
                return this.skills.filter(skill => skill.category === category);
            }
        }
    });
};

export default svgDiagram;