<template>
    <div class="page-home">
        <div class="page-home__content">
            <div class="page-home__title">Welcome to test project</div>
            <search-input @button-click="$router.push({ name: 'results' })"/>
        </div>
    </div>
</template>

<script>
    import SearchInput from '@/blocks/search-input';

    export default {
        components: {
            SearchInput,
        },
    }
</script>

<style src="./page-home.less" lang="less"/>
