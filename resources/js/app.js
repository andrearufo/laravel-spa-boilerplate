/**
* First we will load all of this project's JavaScript dependencies which
* includes Vue and other libraries. It is a great starting point when
* building robust, powerful web applications using Vue and Laravel.
*/

/**
* Ref. https://dev.to/romanpaprotsky/vue-js-token-based-authentication-with-laravel-sanctum-3a84
*/

require('./bootstrap');

import Vue from 'vue'; // window.Vue = require('vue');
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(require('vue-moment'));

import {store} from './store';


// window.axios.defaults.baseURL = process.env.APP_URL+'/api';
window.axios.defaults.baseURL = '/api';

/**
* The following block of code may be used to automatically register your
* Vue components. It will recursively scan this directory for the Vue
* components and automatically register them with their "basename".
*
* Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
*/

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const AppMain = Vue.component('app-main', require('./components/App/Main.vue').default);
const AppMenu = Vue.component('app-menu', require('./components/App/Menu.vue').default);
const AppLoading = Vue.component('app-loading', require('./components/App/Loading.vue').default);
const AppFlash = Vue.component('app-flash', require('./components/App/Flash.vue').default);

const Home = Vue.component('home', require('./components/Home.vue').default);
const Login = Vue.component('login', require('./components/Login.vue').default);
const Recover = Vue.component('recover', require('./components/Recover.vue').default);

const Dashboard = Vue.component('Dashboard', require('./components/Dashboard.vue').default);

const UserIndex = Vue.component('UserIndex', require('./components/User/Index.vue').default);
const UserAdd = Vue.component('UserAdd', require('./components/User/Add.vue').default);
const UserShow = Vue.component('UserShow', require('./components/User/Show.vue').default);
const UserEdit = Vue.component('UserEdit', require('./components/User/Edit.vue').default);

const NoteIndex = Vue.component('NoteIndex', require('./components/Note/Index.vue').default);
const NoteAdd = Vue.component('NoteAdd', require('./components/Note/Add.vue').default);
const NoteShow = Vue.component('NoteShow', require('./components/Note/Show.vue').default);
const NoteEdit = Vue.component('NoteEdit', require('./components/Note/Edit.vue').default);

/**
* Routing
*/
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },{
        path: '/recover',
        name: 'recover',
        component: Recover
    },{
        path: '/login',
        name: 'login',
        component: Login
    },{
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { auth: true }
    },

    {
        path: '/user',
        name: 'userIndex',
        component: UserIndex,
        meta: { auth: true }
    },{
        path: '/user/add',
        name: 'userAdd',
        component: UserAdd,
        meta: { auth: true }
    },{
        path: '/user/show/:id',
        name: 'userShow',
        component: UserShow,
        meta: { auth: true }
    },{
        path: '/user/edit/:id',
        name: 'userEdit',
        component: UserEdit,
        meta: { auth: true }
    },

    {
        path: '/note',
        name: 'noteIndex',
        component: NoteIndex,
        meta: { auth: true }
    },{
        path: '/note/add',
        name: 'noteAdd',
        component: NoteAdd,
        meta: { auth: true }
    },{
        path: '/note/show/:id',
        name: 'noteShow',
        component: NoteShow,
        meta: { auth: true }
    },{
        path: '/note/edit/:id',
        name: 'noteEdit',
        component: NoteEdit,
        meta: { auth: true }
    }
];

const router = new VueRouter({
    // mode: 'history',
    routes,
    base: process.env.BASE_URL
});

router.beforeEach((to, from, next) => {
    store.commit('destroyFlash');

    const loggedIn = localStorage.getItem('user')

    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
        next({
            name: 'login',
            query: {
                error: 'unauthorized'
            }
        })
        return
    }
    next()
});

new Vue({
    router,
    store,
    created () {
        const userInfo = localStorage.getItem('user')
        if (userInfo) {
            const userData = JSON.parse(userInfo)
            this.$store.commit('setUserData', userData)
        }

        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.$store.dispatch('logout')
                }
                return Promise.reject(error)
            }
        )
    },
    render: h => h(AppMain)
}).$mount('#app');
