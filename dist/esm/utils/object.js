export function camelCaseToSnakeCase(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
export function snakeCaseToCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
}
export function objectKeysCamelCaseToSnakeCase(obj) {
    const newObj = {};
    for (const key in obj) {
        const newKey = camelCaseToSnakeCase(key);
        newObj[newKey] = obj[key];
    }
    return newObj;
}
export function objectKeysSnakeCaseToCamelCase(obj) {
    const newObj = {};
    for (const key in obj) {
        const newKey = snakeCaseToCamelCase(key);
        newObj[newKey] = obj[key];
    }
    return newObj;
}
export function objectRemoveUndefined(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj[key] === undefined)
            continue;
        newObj[key] = obj[key];
    }
    return newObj;
}
export function objectRemoveUndefinedOrNull(obj) {
    const newObj = {};
    for (const key in obj) {
        if (typeof obj[key] === "undefined" || obj[key] === null)
            continue;
        newObj[key] = obj[key];
    }
    return newObj;
}
//# sourceMappingURL=object.js.map