<template>
    <div class="page-results">
        <div class="page-results__content">
            <search-block class="page-results__search" @button-click="updateRows"/>
            <table-block v-if="rows.length > 0" :rows="rows" :columns="columns">
                <template #cell:owner="{ row }">{{ row.owner.login }}</template>
                <template #cell:html_url="{ row }">
                    <a :href="row.html_url" target="_blank">{{ row.html_url }}</a>
                </template>
            </table-block>
            <table-pagination
                v-if="forksCount > perPage"
                :current-page="page"
                :last-page="Math.ceil(forksCount / perPage)"
                class="page-results__table-pagination"
                @go-to-page="updateRows($event)"
            />
        </div>
    </div>
</template>

<script>
    import SearchBlock from '@/blocks/search';
    import TableBlock from '@/blocks/table';
    import TablePagination from '@/blocks/table-pagination';
    import columns from './data/columns';
    import api from '@/api';
    import { clone } from '@/tools';
    import { mapGetters } from 'vuex';

    const perPage = 5;

    export default {
        components: {
            SearchBlock,
            TableBlock,
            TablePagination,
        },
        data: () => ({
            rows: [],
            forksCount: null,
            columns: clone(columns),
            page: 1,
            perPage,
        }),
        created() {
            if (this.isSearchStringValidate) {
                this.updateRows();
            }
        },
        computed: {
            ...mapGetters('global', {
                searchParams: 'searchParams',
                isSearchStringValidate: 'isSearchStringValidate',
            }),
        },
        methods: {
            async updateRows(page) {
                this.page = page;
                const { owner, repositoryName } = this.searchParams;
                this.rows = await api.forks.getList({ page: this.page, perPage: this.perPage, owner, repositoryName });
                const { forks } = await api.forks.getRepo({ owner, repositoryName });
                this.forksCount = forks;
            },
        },
        watch: {
            searchParams: {
                deep: true,
                handler() {
                    this.page = 1;
                    this.forksCount = null;
                    this.rows = [];
                },
            },
        },
    }
</script>

<style src="./page-results.less" lang="less"/>
