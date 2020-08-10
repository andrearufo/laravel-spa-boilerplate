<template>
    <div id="app-menu">

        <ul v-if="isLogged">
            <li>
                <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'userIndex' }">Users</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'noteIndex' }">Notes</router-link>
            </li>
            <li>
                <button type="button" @click="logout()">Logout</button>
            </li>
        </ul>
        <ul v-else>
            <li>
                <router-link :to="{ name: 'home' }">Home</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'login' }">Login</router-link>
            </li>
        </ul>

    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'AppMenu',

    computed: {
        // ref https://vuex.vuejs.org/guide/getters.html#the-mapgetters-helper
        ...mapGetters([
            'isLogged'
        ])
    },

    methods: {
        logout () {
            this.$store.dispatch('logout')
        }
    }
}

</script>
