export const getters = {
    searchParams(state) {
        const [owner, repositoryName, ...rest] = state.searchString.split('/');
        return { owner, repositoryName, ...rest };
    },
    isSearchStringValidate(state, getters) {
        const { owner, repositoryName, ...rest } = getters.searchParams;
        return Boolean(owner && repositoryName) && Object.keys(rest).length === 0;
    },
};
