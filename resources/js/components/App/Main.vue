<template>
    <div id="app-main">

        <div id="layout">
            <div id="layout-sidebar">

                <div id="logo">
                    <router-link :to="{ name: 'home' }">Laravel</router-link>
                </div>

                <app-menu></app-menu>
                
            </div>
            <div id="layout-header">


            </div>
            <div id="layout-main">

                <app-flash></app-flash>
                <router-view></router-view>

            </div>
            <div id="layout-footer">

                Larave SPA

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'AppMain'
}
</script>
