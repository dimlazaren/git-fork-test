import store from '@/store';

export const getters = {
    searchParams(state) {
        const [owner, repositoryName, ...rest] = state.searchString.split('/');
        return { owner, repositoryName, ...rest };
    },
    isSearchStringValidate(state) {
        const { owner, repositoryName, ...rest } = store.getters['global/searchParams'];
        return Boolean(owner && repositoryName) && Object.keys(rest).length === 0;
    },
};
