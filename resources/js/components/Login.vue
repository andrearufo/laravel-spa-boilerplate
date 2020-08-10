<template>
    <div id="login">

        <h1>Login</h1>

        <form action="#" method="post" @submit.prevent="login">

            <div class="form-group">
                <label for="email">Email</label>
                <input
                class="form-control"
                type="text"
                name="email"
                required
                autocomplete="email"
                v-model="email"
                >
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                class="form-control"
                type="password"
                name="password"
                required
                autocomplete="current-password"
                v-model="password"
                >
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">Login</button>
            </div>
            <div class="form-group">
                <router-link :to="{ name: 'recover' }">Password recover</router-link>
            </div>

        </form>

    </div>
</template>

<script>
export default {
    name: 'Login',

    data () {
        return {
            email: 'test@test.it',
            password: 'test'
        }
    },

    methods: {
        login () {
            this.$store
            .dispatch('login', {
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.$router.push({ name: 'dashboard' })
            })
        }
    }
}
</script>
