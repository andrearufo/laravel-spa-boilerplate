<template>
    <div id="user-edit">

        <h1>Users, edit {{ $route.params.id }}</h1>

        <form action="#" method="post" @submit.prevent="updateUser" v-if="user">

            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" class="form-control" v-model="user.name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input disabled type="email" name="email" class="form-control" v-model="user.email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control" v-model="user.password">
            </div>

            <pre>{{ user }}</pre>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">
                    Edit user
                </button>
            </div>

        </form>
        <app-loading v-else></app-loading>

    </div>
</template>

<script>
export default {
    name: 'UserEdit',

    data () {
        return {
            ux: {
                error: false,
                success: false,
            },
            user: false
        }
    },

    methods: {
        getUser () {
            this.$store
            .dispatch('getUser', this.$route.params.id)
            .then(response => {
                this.user = response;
            })
            .catch(error => {
                this.ux.error = error;
            });
        },

        updateUser () {
            this.$store
            .dispatch('updateUser', this.user)
            .then(response => {
                this.user = response;
                this.ux.success = response;
            })
            .catch(error => {
                this.ux.error = error;
            });
        }
    },

    mounted () {
        this.getUser();
    }
}
</script>
