<template>
    <div id="note-add">

        <h1>Notes, add</h1>

        <form action="#" method="post" @submit.prevent="storeNote">

            <div class="form-group">
                <label for="name">Body</label>
                <textarea name="body" class="form-control" rows="6" v-model="note.body"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">
                    Save new note
                </button>
            </div>

            <pre>{{ note }}</pre>

        </form>

    </div>
</template>

<script>
export default {
    name: 'NoteAdd',

    data () {
        return {
            note: {
                body: '',
                user_id: 2 //this.$store.getters.currentUserId
            }
        }
    },

    methods: {
        storeNote () {
            this.$store
            .dispatch('storeNote', this.note)
            .then(response => {
                this.note = response;
                this.$router.push({ name: 'noteShow', params: { id: this.note.id } })
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}
</script>
