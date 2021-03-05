import { createStore } from 'vuex';

import { vuex } from './modules';

export default createStore({
    modules: vuex.modules,
    plugins: vuex.plugins,
    strict: process.env.NODE_ENV === 'development',
});
