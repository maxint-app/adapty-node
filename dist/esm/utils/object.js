import { camelCase, isArray, transform, isObject, snakeCase } from "lodash-es";
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
export function camelizeObject(obj) {
    return transform(obj, (result, value, key, target) => {
        const camelKey = isArray(target) ? key : camelCase(key);
        result[camelKey] = isObject(value)
            ? camelizeObject(value)
            : value;
    });
}
export function snakifyObject(obj) {
    return transform(obj, (result, value, key, target) => {
        const camelKey = isArray(target) ? key : snakeCase(key);
        result[camelKey] = isObject(value)
            ? snakifyObject(value)
            : value;
    });
}
//# sourceMappingURL=object.js.map