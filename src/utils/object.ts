type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
: Lowercase<S>

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K]
}

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
	? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
	: S;

export type KeysToSnakeCase<T> = {
	[K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};

export function camelCaseToSnakeCase(str: string): string {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeCaseToCamelCase(str: string): string {
	return str
		.toLowerCase()
		.replace(/([-_][a-z])/g, (group) =>
			group.toUpperCase().replace("-", "").replace("_", ""),
		);
}

export function objectKeysCamelCaseToSnakeCase<T>(obj: T): KeysToSnakeCase<T> {
	const newObj = {} as KeysToSnakeCase<T>;

	for (const key in obj) {
		const newKey = camelCaseToSnakeCase(key);
		(newObj as Record<string, unknown>)[newKey] = obj[key];
	}

	return newObj;
}

export function objectKeysSnakeCaseToCamelCase<T>(obj: T): KeysToCamelCase<T> {
  const newObj = {} as KeysToCamelCase<T>;

  for (const key in obj) {
    const newKey = snakeCaseToCamelCase(key);
    (newObj as Record<string, unknown>)[newKey] = obj[key];
  }

  return newObj;
}

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
