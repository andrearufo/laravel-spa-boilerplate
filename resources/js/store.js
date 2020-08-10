import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        flash: {
            type: false,
            info: false
        },
        users: [],
    },

    mutations: {
        setUserData (state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
        },

        clearUserData () {
            localStorage.removeItem('user');
            location.reload();
        },

        retriveFlash(state, data){
            state.flash.type = data.type;
            state.flash.info = data.info;
        },

        destroyFlash(state){
            state.flash.type = false;
            state.flash.info = false;
        },

        setUsers(state, users){
            console.log(users);
            state.users = users;
        }
    },

    actions: {
        login ({ commit }, credentials) {
            return axios
            .post('/login', credentials)
            .then(({ data }) => {
                commit('setUserData', data)
            }).catch((error) => {
                commit('retriveFlash', { type: 'warning', info: error.response.data });
                throw error;
            });
        },

        logout ({ commit }) {
            commit('clearUserData');
        },

        recover ({ commit }, credentials) {
            return axios
            .post('/recover', credentials)
            .then(({ data }) => { return data; });
        },

        // User

        getUsers ({ commit }) {
            return axios
            .get('/user/index')
            .then(({ data }) => {
                commit('setUsers', data);
            })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        getUser ({ commit }, id) {
            return axios
            .get('/user/show/'+id)
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        updateUser ({ commit }, data) {
            return axios
            .post('/user/update/'+data.id, {
                name: data.name,
                password: data.password
            })
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        storeUser ({ commit }, data) {
            return axios
            .post('/user/store/', {
                name: data.name,
                email: data.email,
                password: data.password
            })
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        deleteUser ({ commit }, id) {
            return axios
            .post('/user/destroy/'+id)
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        // Note

        getNotes ({ commit }) {
            return axios
            .get('/note/index')
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        getNote ({ commit }, id) {
            return axios
            .get('/note/show/'+id)
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        updateNote ({ commit }, data) {
            return axios
            .post('/note/update/'+data.id, {
                body: data.body
            })
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        storeNote ({ commit }, data) {
            return axios
            .post('/note/store/', {
                body: data.body,
                user_id: data.user_id
            })
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },

        deleteNote ({ commit }, id) {
            return axios
            .post('/note/destroy/'+id)
            .then(({ data }) => { return data; })
            .catch(error => {
                commit('retriveFlash', { type: 'danger', info: error.response.data });
                throw error;
            });
        },
    },

    getters : {
        isLogged: state => !!state.user,
        currentUser: state => state.user,
        currentUserId: state => state.user.user.id,
    }
});
