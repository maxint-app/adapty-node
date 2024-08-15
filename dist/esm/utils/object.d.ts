type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}` ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}` : Lowercase<S>;
export type KeysToCamelCase<T> = {
    [K in keyof T as CamelCase<string & K>]: T[K];
};
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}` : S;
export type KeysToSnakeCase<T> = {
    [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};
export declare function camelCaseToSnakeCase(str: string): string;
export declare function snakeCaseToCamelCase(str: string): string;
export declare function objectKeysCamelCaseToSnakeCase<T>(obj: T): KeysToSnakeCase<T>;
export declare function objectKeysSnakeCaseToCamelCase<T>(obj: T): KeysToCamelCase<T>;
export declare function objectRemoveUndefined<T>(obj: T): T;
export declare function objectRemoveUndefinedOrNull<T>(obj: T): T;
export {};
