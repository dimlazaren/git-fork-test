<template>
    <div class="app">
        <router-view v-slot="{ Component }">
            <transition name="fade-animation" mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
</template>

<script>
    export default {
        created() {
            this.$store.commit('favorites/updateItemsFromLocalStorage');
        },
    }
</script>

<style lang="less">
    .app {

    }
</style>
