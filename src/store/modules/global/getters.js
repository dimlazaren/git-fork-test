import store from '@/store';

export const getters = {
    searchParams(state) {
        const splittedString = state.searchString.split('/');
        return { owner: splittedString[0], repositoryName: splittedString[1] };
    },
    isSearchStringValidate(state) {
        const { owner, repositoryName } = store.getters['global/searchParams'];
        return Boolean(owner && repositoryName);
    },
};
