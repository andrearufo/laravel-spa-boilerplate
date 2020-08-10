<template>
    <div id="user-show">

        <h1>Users, show #{{ this.$route.params.id }}</h1>

        <pre v-if="user">{{ user }}</pre>
        <app-loading v-else></app-loading>

    </div>
</template>

<script>
export default {
    name: 'UserShow',

    data () {
        return {
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
        }
    },

    mounted () {
        this.getUser();
    }
}
</script>
