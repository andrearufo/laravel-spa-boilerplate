<template>
    <div id="user-add">

        <h1>Users, add</h1>

        <form action="#" method="post" @submit.prevent="storeUser">

            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" class="form-control" v-model="user.name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" class="form-control" v-model="user.email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control" v-model="user.password">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">
                    Save new user
                </button>
            </div>

        </form>

    </div>
</template>

<script>
export default {
    name: 'UserAdd',

    data () {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    },

    methods: {
        storeUser () {
            this.$store
            .dispatch('storeUser', this.user)
            .then(response => {
                this.user = response;
                this.$router.push({ name: 'userShow', params: { id: this.user.id } })
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}
</script>
