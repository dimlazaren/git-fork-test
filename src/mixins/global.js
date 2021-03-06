import { camelToKebab } from '@/tools';

export default {
    methods: {
        getBemClass(name, mods = {}) {
            const result = [name];

            for (let [mod, value] of Object.entries(mods)) {
                if (value === true) {
                    result.push(`${name}_${camelToKebab(mod)}`);
                } else if (value) {
                    result.push(`${name}_${camelToKebab(mod)}_${camelToKebab(value)}`);
                }
            }

            return result.join(' ');
        },
    },
};
