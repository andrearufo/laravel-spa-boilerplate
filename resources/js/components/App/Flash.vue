<template>
    <div id="app-flash">

        <div v-if="flash.type" class="alert" :class="'alert-'+flash.type">
            {{ flash.info.message }}
            <ul v-if="flash.info.errors">
                <li v-for="errors, field in flash.info.errors ">
                    <span v-for="e in errors">
                        {{ e }}
                    </span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: 'app-flash',
    computed: {
        flash () {
            return this.$store.state.flash;
        }
    }
}
</script>
