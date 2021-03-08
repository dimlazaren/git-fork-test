import { module as global } from './global';
import { module as favorites } from './favorites';

const modules = {
    global,
    favorites,
};

export const vuex = Object.keys(modules).reduce((res, moduleName) => {
    const { plugin, ...moduleBody } = modules[moduleName];

    if (typeof plugin === 'function') {
        res.plugins = [...res.plugins, plugin];
    }

    res.modules[moduleName] = {...moduleBody};

    return res
}, { plugins: [], modules: {} });
