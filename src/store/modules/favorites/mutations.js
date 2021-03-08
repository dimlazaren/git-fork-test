import store2 from 'store2';
const localStorageName = 'fit-fork-favorites';
const updateLocalStorageFavorites = (items) => {
    store2.set(localStorageName, items);
};

export const mutations = {
    updateItemsFromLocalStorage(state) {
        state.itemsIds = store2.get(localStorageName) || [];
    },
    addItem(state, id) {
        state.itemsIds.push(id);
        updateLocalStorageFavorites(state.itemsIds);
    },
    removeItem(state, id) {
        const index = state.itemsIds.findIndex(iteratedId => iteratedId === id);
        state.itemsIds.splice(index, 1);
        updateLocalStorageFavorites(state.itemsIds);
    },
};
