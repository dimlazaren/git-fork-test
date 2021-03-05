export const getters = {
    searchParams(state) {
        const splittedString = state.searchString.split('/');
        return { owner: splittedString[0], repositoryName: splittedString[1] };
    },
};
