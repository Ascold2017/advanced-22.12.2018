import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const route = ({ name, path, folderName, pageName }) => ({
    name,
    path,
    component: () => import(`../components/pages/${folderName}/${pageName}`)
});

export default new VueRouter({
    mode: 'history',
    routes: [
        route({ name: 'home', path: '/', folderName: 'about', pageName: 'about' }),
        route({ name: 'about', path: '/about', folderName: 'about', pageName: 'about' }),
        route({ name: '404', path: '*', folderName: '404', pageName: 'index' })
    ]
});
