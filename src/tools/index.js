export function camelToKebab(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function clone(value) {
    return JSON.parse(JSON.stringify(value));
}
