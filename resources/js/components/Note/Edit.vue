<template>
    <div id="note-edit">

        <h1>Notes, edit {{ $route.params.id }}</h1>

        <form action="#" method="post" @submit.prevent="updateNote" v-if="note">

            <div class="form-group">
                <label for="name">Body</label>
                <textarea name="body" class="form-control" rows="6" v-model="note.body"></textarea>
            </div>

            <pre>{{ note }}</pre>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">
                    Edit note
                </button>
            </div>

        </form>
        <app-loading v-else></app-loading>

    </div>
</template>

<script>
export default {
    name: 'NoteEdit',

    data () {
        return {
            ux: {
                error: false,
                success: false,
            },
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
        },

        updateNote () {
            this.$store
            .dispatch('updateNote', this.note)
            .then(response => {
                this.note = response;
                this.ux.success = response;
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
