<template>
    <div class="search">
        <input-block class="search__input" placeholder=":owner/:repositoryName" v-model="searchString"/>
        <div v-if="isGetResultButtonTouched && !isSearchStringValidate" class="search__error">
            Enter search request in format :owner/:repositoryName
        </div>
        <button-block class="search__button" @click="onButtonClick">Get results</button-block>
    </div>
</template>

<script>
    import InputBlock from '../input';
    import ButtonBlock from '../button';

    export default {
        components: {
            InputBlock,
            ButtonBlock,
        },
        emits: ['button-click'],
        data: () => ({
            isGetResultButtonTouched: false,
        }),
        computed: {
            searchString: {
                get() {
                    return this.$store.state.global.searchString;
                },
                set(value) {
                    this.$store.commit('global/setSearchString', value);
                },
            },
            isSearchStringValidate() {
                return this.$store.getters['global/isSearchStringValidate'];
            },
        },
        methods: {
            onButtonClick() {
                this.isGetResultButtonTouched = true;
                if (!this.isSearchStringValidate) {
                    return;
                }
                this.$emit('button-click');
            },
        },
    }
</script>

<style src="./search.less" lang="less"/>
