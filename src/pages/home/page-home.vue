<template>
    <div class="page-home">
        <div class="page-home__content">
            <div class="page-home__title">Welcome to test project</div>
            <search-block @button-click="$router.push({ name: 'results' })"/>
        </div>
    </div>
</template>

<script>
    import SearchBlock from '@/blocks/search';

    export default {
        components: {
            SearchBlock,
        },
    }
</script>

<style src="./page-home.less" lang="less"/>
