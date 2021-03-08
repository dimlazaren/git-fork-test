import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';


export const module = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
