<template>
    <div id="note-index">

        <h1>Notes, index</h1>

        <p>
            <router-link :to="{ name: 'noteAdd' }">Add new note</router-link>
        </p>

        <table class="table" v-if="notes">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Body</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="note in notes">
                    <td>
                        #{{ note.id }}
                    </td>
                    <td>
                        {{ note.body }}
                    </td>
                    <td>
                        {{ note.user_id }}
                    </td>
                    <td>
                        {{ note.created_at | moment('DD/MM/YYYY HH:mm:ss') }}
                    </td>
                    <td>
                        {{ note.updated_at | moment('DD/MM/YYYY HH:mm:ss') }}
                    </td>
                    <td>
                        <router-link :to="{ name: 'noteEdit', params: { id: note.id } }">Edit</router-link>
                    </td>
                    <td>
                        <button class="btn btn-link text-danger p-0" type="button" @click="deleteNote(note.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <app-loading v-else></app-loading>

    </div>
</template>

<script>
export default {
    name: 'NoteIndex',

    data () {
        return {
            notes: false
        }
    },

    methods: {
        getNotes () {
            this.$store
            .dispatch('getNotes')
            .then(response => {
                this.notes = response;
            })
            .catch(error => {
                console.log(error);
            });
        },

        deleteNote(id){
            this.$store
            .dispatch('deleteNote', id)
            .then(response => {
                console.log(response);
                this.getNotes();
            })
            .catch(error => {
                console.log(error);
            });
        }
    },

    mounted () {
        this.getNotes();
    }
}
</script>
