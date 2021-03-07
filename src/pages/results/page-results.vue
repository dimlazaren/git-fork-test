<template>
    <div class="page-results">
        <transition name="fade-animation">
            <loader-block v-if="isRowsLoading" class="page-results__table-loader"/>
        </transition>
        <div class="page-results__content">
            <search-block
                class="page-results__search"
                :button-disabled="isRowsLoading"
                @button-click="updateRows"
            />
            <div v-if="is404SearchRequest">Repo not found. Try changing the params</div>
            <template v-else>
                <div class="page-results__table-holder">
                    <table-block v-if="rows" :rows="rows" :columns="columns">
                        <template v-if="rows.length === 0" #body>No results</template>
                        <template #cell:owner="{ row }">{{ row.owner.login }}</template>
                        <template #cell:html_url="{ row }">
                            <a :href="row.html_url" target="_blank">{{ row.html_url }}</a>
                        </template>
                    </table-block>
                </div>
                <table-pagination
                    v-if="forksCount > perPage"
                    :current-page="page"
                    :last-page="Math.ceil(forksCount / perPage)"
                    class="page-results__table-pagination"
                    @go-to-page="updateRows($event)"
                />
            </template>
        </div>
    </div>
</template>

<script>
    import SearchBlock from '@/blocks/search';
    import TableBlock from '@/blocks/table';
    import TablePagination from '@/blocks/table-pagination';
    import LoaderBlock from '@/blocks/loader';
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
            LoaderBlock,
        },
        data: () => ({
            rows: null,
            forksCount: null,
            columns: clone(columns),
            page: 1,
            perPage,
            isRowsLoading: false,
            is404SearchRequest: false,
        }),
        created() {
            this.updateRows();
        },
        computed: {
            ...mapGetters('global', {
                searchParams: 'searchParams',
                isSearchStringValidate: 'isSearchStringValidate',
            }),
        },
        methods: {
            async updateRows(page = 1) {
                if (!this.isSearchStringValidate) {
                    return;
                }
                try {
                    this.is404SearchRequest = false;
                    this.isRowsLoading = true;
                    this.page = page;
                    const { owner, repositoryName } = this.searchParams;
                    this.rows = await api.forks.getList({ page: this.page, perPage: this.perPage, owner, repositoryName });
                    const { forks } = await api.forks.getRepo({ owner, repositoryName });
                    this.forksCount = forks;
                } catch (error) {
                    if (error.status === 404) {
                        this.is404SearchRequest = true;
                    }
                } finally {
                    this.isRowsLoading = false;
                }
            },
        },
    }
</script>

<style src="./page-results.less" lang="less"/>
