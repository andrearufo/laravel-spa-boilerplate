<template>
    <div id="note-show">

        <h1>Note, show #{{ this.$route.params.id }}</h1>

        <pre v-if="note">{{ note }}</pre>
        <app-loading v-else></app-loading>

    </div>
</template>

<script>
export default {
    name: 'NoteShow',

    data () {
        return {
            note: false
        }
    },

    methods: {
        getNote () {
            this.$store
            .dispatch('getNote', this.$route.params.id)
            .then(response => {
                this.note = response;
            })
            .catch(error => {
                this.ux.error = error;
            });
        }
    },

    mounted () {
        this.getNote();
    }
}
</script>
