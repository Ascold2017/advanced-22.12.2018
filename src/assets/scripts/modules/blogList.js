import Vue from 'vue';
import blogNavMenu from '@modules/blogNavMenu';
import blogNavToggle from '@modules/blogNavToggle';

export default function(postsData) {
    new Vue({
        el: '#blog',
        filters: {
            correctDate(val) {
                let date = new Date(val);
                return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
            }
        },
        
        data: {
            posts: postsData
        },
       
        mounted() {
            this.$nextTick()
            .then(() => {
                blogNavToggle();
                blogNavMenu();
            })
        }
    })
}
