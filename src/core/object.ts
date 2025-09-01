"use strict";

//#region Object
declare global {
	interface ObjectConstructor {
		/**
		 * Imports an object from a source.
		 * @param source The source to import from.
		 * @param name The name of the source.
		 * @returns The imported object.
		 * @throws {TypeError} If the source is not an object or null.
		 */
		import(source: any, name?: string): object;
		/**
		 * Applies a callback function to a non-nullable value, or returns the original nullable value.
		 * @param value The value to map.
		 * @param callback The function to apply if the value is non-nullable.
		 * @returns The mapped result.
		 */
		map<T, N extends Exclude<T, NonNullable<T>>, R>(value: NonNullable<T> | N, callback: (object: NonNullable<T>) => R): R | N;
	}
}

Object.import = function (source: any, name: string = "[source]"): object {
	if (typeof (source) !== "object" || source === null) throw new TypeError(`Unable to import object from ${name} due its ${typename(source)} type`);
	return source;
};

Object.map = function <T, N, R>(value: NonNullable<T> | N, callback: (object: NonNullable<T>) => R): R | N {
	if (value === null || value === undefined) return value;
	else return callback(value as NonNullable<T>);
};
//#endregion

export { };
