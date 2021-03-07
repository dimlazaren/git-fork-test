<template>
    <div class="table-pagination">
        <button
            class="table-pagination__page"
            :disabled="currentPage === 1"
            @click="onPaginationClick('back')"
        >
            &lt;
        </button>
        <div class="table-pagination__pages-holder">
            <component
                v-for="(page, pageIndex) in visiblePagination"
                :is="page !== 'more' ? 'button' : 'div'"
                :key="`${ page }-${ pageIndex }`"
                :class="getBemClass('table-pagination__page',
                    { active: currentPage === page, more: page === 'more' }
                )"
                @click="onPaginationClick(page)"
            >
                {{ page !== 'more' ? page : '...' }}
            </component>
        </div>
        <button
            class="table-pagination__page"
            :disabled="currentPage === lastPage"
            @click="onPaginationClick('forward')"
        >
            >
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            pagination: {
                type: Object,
                default: () => ({}),
            },
            currentPage: Number,
            lastPage: Number,
        },
        emits: ['go-to-page'],
        computed: {
            visiblePagination() {
                const displayedPages = 5;
                let firstPageNumber = Math.max(this.currentPage - Math.floor(displayedPages / 2), 1);
                const lastNumber = Math.min(firstPageNumber + displayedPages, this.lastPage + 1);
                let length = lastNumber - firstPageNumber;
                if (length < displayedPages) {
                    firstPageNumber = Math.max(firstPageNumber - (displayedPages - length), 1);
                    length = lastNumber - firstPageNumber;
                }
                let paginationArray = Array.from({ length }, (v, k) => k + firstPageNumber);
                if (paginationArray[0] !== 1) {
                    if (paginationArray[0] - 1 > 2) {
                        paginationArray.unshift(1, 'more');
                    } else if (paginationArray[0] - 1 === 2) {
                        paginationArray.unshift(1, 2);
                    } else {
                        paginationArray.unshift(1);
                    }
                }
                if (paginationArray[paginationArray.length - 1] !== this.lastPage) {
                    if (this.lastPage - paginationArray[paginationArray.length - 1] > 2) {
                        paginationArray.push('more', this.lastPage);
                    } else if (this.lastPage - paginationArray[paginationArray.length - 1] === 2) {
                        paginationArray.push(this.lastPage - 1, this.lastPage);
                    } else {
                        paginationArray.push(this.lastPage);
                    }
                }
                return paginationArray;
            }
        },
        methods: {
            onPaginationClick(page) {
                let targetPage;
                switch (page) {
                    case 'back':
                        if (this.currentPage !== 1) {
                            targetPage = this.currentPage - 1;
                        }
                        break;
                    case 'forward':
                        if (this.currentPage !== this.lastPage) {
                            targetPage = this.currentPage + 1;
                        }
                        break;
                    case 'more':
                        break;
                    default:
                        if (page !== this.currentPage) {
                            targetPage = page;
                        }
                        break;
                }
                if (targetPage) {
                    this.$emit('go-to-page', targetPage);
                }
            }
        }
    }
</script>

<style src="./table-pagination.less" lang="less"/>
