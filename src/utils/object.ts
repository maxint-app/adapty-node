import { camelCase, isArray, transform, isObject, snakeCase } from "lodash-es";

export function objectRemoveUndefined<T>(obj: T): T {
	const newObj = {} as T;

	for (const key in obj) {
		if (obj[key] === undefined) continue;
		newObj[key] = obj[key];
	}

	return newObj;
}

export function objectRemoveUndefinedOrNull<T>(obj: T): T {
	const newObj = {} as T;

	for (const key in obj) {
		if (typeof obj[key] === "undefined" || obj[key] === null) continue;
		newObj[key] = obj[key];
	}

	return newObj;
}

export function camelizeObject(obj: Record<string, unknown>) {
	return transform(
		obj,
		(result: Record<string, unknown>, value: unknown, key: string, target) => {
			const camelKey = isArray(target) ? key : camelCase(key);
			result[camelKey] = isObject(value)
				? camelizeObject(value as Record<string, unknown>)
				: value;
		},
	);
}

export function snakifyObject(obj: Record<string, unknown>) {
	return transform(
		obj,
		(result: Record<string, unknown>, value: unknown, key: string, target) => {
			const camelKey = isArray(target) ? key : snakeCase(key);
			result[camelKey] = isObject(value)
				? snakifyObject(value as Record<string, unknown>)
				: value;
		},
	);
}
