<template>
    <div id="recover">

        <h1>Password Recover</h1>

        <form action="#" method="post" @submit.prevent="recover">

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
                <button class="btn btn-primary btn-block" type="submit">Send recover link</button>
            </div>

            <div class="alert alert-danger" v-show="ux.error">{{ ux.error }}</div>

        </form>

    </div>
</template>

<script>
export default {
    name: 'Recover',

    data () {
        return {
            ux: {
                error: this.$route.query.error
            },
            email: 'test@test.it',
        }
    },

    methods: {
        recover () {
            this.$store
            .dispatch('recover', {
                email: this.email
            })
            .then(response => {
                this.ux.error = response;
            })
            .catch(error => {
                this.ux.error = error;
            });
        }
    }
}
</script>
