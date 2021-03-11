<template>
    <div class="page-search">
        <transition name="fade-animation">
            <loader-block v-if="isRowsLoading" class="page-search__loader"/>
        </transition>
        <div class="page-search__content">
            <search-block
                class="page-search__search"
                :button-disabled="isRowsLoading"
                @button-click="updateRows"
            />
            <div v-if="searchRequestError === 404">Repo not found. Try changing the params</div>
            <div v-else-if="searchRequestError === 403">Github API request limit reached</div>
            <template v-else>
                <div class="page-search__table-holder">
                    <table-block v-if="rows" :rows="rows" :columns="columns">
                        <template v-if="rows.length === 0" #body>No results</template>
                        <template #cell:owner="{ row }">{{ row.owner.login }}</template>
                        <template #cell:html_url="{ row }">
                            <a :href="row.html_url" target="_blank">{{ row.html_url }}</a>
                        </template>
                        <template #cell:favorites="{ row }">
                            <div :title="isItemInFavorites(row.id) ? 'Remove from favorites' : 'Add to favorites'">
                                <svg-icon
                                    name="star"
                                    :class="getBemClass('page-search__favorites-button',
                                        { added: isItemInFavorites(row.id) },
                                    )"
                                    @click="favoriteButtonClick(row.id)"
                                />
                            </div>
                        </template>
                    </table-block>
                </div>
                <table-pagination
                    v-if="forksCount > perPage"
                    :current-page="page"
                    :last-page="Math.ceil(forksCount / perPage)"
                    class="page-search__table-pagination"
                    @go-to-page="updateRows($event)"
                />
            </template>
            <transition name="fade-animation">
                <button-block
                    v-if="rows && rows.length > 0 && !searchRequestError"
                    class="page-search__copy-link-button"
                    @click="onCopyLinkButtonClick"
                >Copy search link</button-block>
            </transition>
        </div>
    </div>
</template>

<script>
    import SearchBlock from '@/blocks/search';
    import TableBlock from '@/blocks/table';
    import TablePagination from '@/blocks/table-pagination';
    import LoaderBlock from '@/blocks/loader';
    import SvgIcon from '@/blocks/svg-icon';
    import ButtonBlock from '@/blocks/button';
    import columns from './data/columns';
    import api from '@/api';
    import { clone, copyText } from '@/tools';
    import { mapGetters } from 'vuex';

    const perPage = 5;

    export default {
        components: {
            SearchBlock,
            TableBlock,
            TablePagination,
            LoaderBlock,
            SvgIcon,
            ButtonBlock,
        },
        data: () => ({
            rows: null,
            forksCount: null,
            columns: clone(columns),
            page: 1,
            perPage,
            isRowsLoading: false,
            searchRequestError: null,
        }),
        created() {
            const { repository, page } = this.$route.query;
            if (repository) {
                this.$store.commit('global/setSearchString', repository);
            }
            this.updateRows(page && +page);
        },
        computed: {
            ...mapGetters('global', {
                searchParams: 'searchParams',
                isSearchStringValidate: 'isSearchStringValidate',
            }),
            favoriteForks() {
                return this.$store.state.favorites.itemsIds;
            },
        },
        methods: {
            async updateRows(page = 1) {
                if (!this.isSearchStringValidate) {
                    return;
                }
                try {
                    this.searchRequestError = null;
                    this.isRowsLoading = true;
                    this.page = page;
                    const { owner, repositoryName } = this.searchParams;
                    this.rows = await api.forks.getList({
                        page: this.page,
                        perPage: this.perPage,
                        owner,
                        repositoryName,
                    });
                    this.$router.push({ query:
                        {
                            repository: `${ owner }/${ repositoryName }`,
                            page,
                        },
                    });
                    const { forks } = await api.forks.getRepo({ owner, repositoryName });
                    this.forksCount = forks;
                } catch (error) {
                    if (error.status === 404) {
                        this.searchRequestError = 404;
                    } else if (error.status === 403) {
                        this.searchRequestError = 403;
                    }
                } finally {
                    this.isRowsLoading = false;
                }
            },
            isItemInFavorites(id) {
                return this.favoriteForks.includes(id);
            },
            favoriteButtonClick(id) {
                if (this.isItemInFavorites(id)) {
                    this.$store.commit('favorites/removeItem', id);
                } else {
                    this.$store.commit('favorites/addItem', id);
                }
            },
            onCopyLinkButtonClick() {
                copyText(location.href);
            },
        },
    }
</script>

<style src="./page-search.less" lang="less"/>
