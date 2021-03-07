<template>
    <div class="search">
        <input-block
            class="search__input"
            placeholder=":owner/:repositoryName"
            icon="magnifier"
            v-model="searchString"
            @enter-key-press="onSearch"
        />
        <div v-if="isGetResultButtonTouched && !isSearchStringValidate" class="search__error">
            Enter search request in format :owner/:repositoryName
        </div>
        <button-block
            class="search__button"
            :disabled="buttonDisabled"
            @click="onSearch"
        >Get results</button-block>
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
        props: {
            buttonDisabled: Boolean,
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
            onSearch() {
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
