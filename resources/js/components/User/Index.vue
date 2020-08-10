<template>
    <div id="user-index">

        <h1>Users, index</h1>

        <p>
            <router-link :to="{ name: 'userAdd' }">Add new user</router-link>
        </p>

        <table class="table" v-if="users">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created at</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>
                        #{{ user.id }}
                    </td>
                    <td>
                        {{ user.name }}
                    </td>
                    <td>
                        {{ user.email }}
                    </td>
                    <td>
                        {{ user.created_at | moment('DD/MM/YYYY HH:mm:ss') }}
                    </td>
                    <td>
                        <router-link :to="{ name: 'userEdit', params: { id: user.id } }">Edit</router-link>
                    </td>
                    <td>
                        <button v-if="$store.state.user.user.id != user.id" class="btn btn-link text-danger p-0" type="button" @click="deleteUser(user.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <app-loading v-else></app-loading>

    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'UserIndex',

    data () {
        return { }
    },

    computed: {
        ...mapState([
            'users'
        ])
    },

    methods: {

        getUsers () {
            this.$store.dispatch('getUsers');
        },

        deleteUser(id){
            this.$store
            .dispatch('deleteUser', id)
            .then(response => {
                console.log(response);
                this.getUsers();
            })
            .catch(error => {
                console.log(error);
            });
        }
    },

    mounted () {
        this.getUsers();
    }
}
</script>
