import { module as global } from './global';

const modules = {
    global,
};

export const vuex = Object.keys(modules).reduce((res, moduleName) => {
    const { plugin, ...moduleBody } = modules[moduleName];

    if (typeof plugin === 'function') {
        res.plugins = [...res.plugins, plugin];
    }

    res.modules[moduleName] = {...moduleBody};

    return res
}, { plugins: [], modules: {} });
