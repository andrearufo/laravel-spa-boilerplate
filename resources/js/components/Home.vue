<template>
    <div id="home">

        <h1>Home</h1>
        <p>{{ message }}</p>

    </div>
</template>

<script>
export default {
    name: 'Home',

    data () {
        return {
            message: 'Welcome in my SPA'
        }
    }
}
</script>
