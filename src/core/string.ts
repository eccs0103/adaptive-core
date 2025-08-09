"use strict";

import "./global.js";

declare global {
	interface StringConstructor {
		/**
		 * Imports a string from a source.
		 * @param source The source value to import.
		 * @param name The name of the source value.
		 * @returns The imported string value.
		 * @throws {TypeError} If the source is not a string.
		 */
		import(source: any, name?: string): string;
		/**
		 * A constant empty string.
		 * @readonly
		 */
		empty: string;
		/**
		 * Checks if a string is empty.
		 * @param text The string to check.
		 * @returns True if the string is empty, otherwise false.
		 */
		isEmpty(text: string): boolean;
		/**
		 * Checks if a string contains only whitespace characters.
		 * @param text The string to check.
		 * @returns True if the string is empty or contains only whitespace, otherwise false.
		 */
		isWhitespace(text: string): boolean;
	}

	interface String {
		/**
		 * Returns the current string unless it is empty, replacing it with the provided value.
		 * @param value The fallback value.
		 * @returns The original string or the fallback.
		 */
		insteadEmpty<T>(value: T): string | T;
		/**
		 * Returns the current string unless it consists only of whitespace, replacing it with the provided value.
		 * @param value The fallback value.
		 * @returns The original string or the fallback.
		 */
		insteadWhitespace<T>(value: T): string | T;
		/**
		 * Converts the string to title case, where the first letter of each word is capitalized.
		 * @returns The string converted to title case.
		 */
		toTitleCase(): string;
		/**
		 * Converts the string to title case based on the specified locale(s), capitalizing the first letter of each word.
		 * @param locales A single locale or an array of locales for locale-aware case conversion.
		 * @returns The string converted to title case with locale-awareness.
		 */
		toLocalTitleCase(locales?: string | string[]): string;
		/**
		 * Converts the string to title case based on the specified locale(s), capitalizing the first letter of each word.
		 * @param locales An argument supported by `Intl` for locale-aware case conversion.
		 * @returns The string converted to title case with locale-awareness.
		 */
		toLocalTitleCase(locales?: Intl.LocalesArgument): string;
		/**
		 * Reverses the string.
		 * @returns The reversed string.
		 */
		reverse(): string;
	}
}

String.import = function (source: any, name: string = "[source]"): string {
	if (typeof (source) !== "string") throw new TypeError(`Unable to import string from ${name} due its ${typename(source)} type`);
	return source.valueOf();
};

Object.defineProperty(String, "empty", {
	value: "",
	writable: false,
});

String.isEmpty = function (text: string): boolean {
	return (text.length === 0);
};

String.isWhitespace = function (text: string): boolean {
	return String.isEmpty(text.trimStart());
};

String.prototype.insteadEmpty = function <T>(value: T): string | T {
	const current = this.valueOf();
	if (String.isEmpty(current)) return value;
	return current;
};

String.prototype.insteadWhitespace = function <T>(value: T): string | T {
	const current = this.valueOf();
	if (String.isWhitespace(current)) return value;
	return current;
};

const patternWordsFirstLetter = /\b\w/g;

String.prototype.toTitleCase = function (): string {
	return this.toLowerCase().replace(patternWordsFirstLetter, char => char.toUpperCase());
};

String.prototype.toLocalTitleCase = function (locales: Intl.LocalesArgument | string | string[]): string {
	return this.toLocaleLowerCase(locales).replace(patternWordsFirstLetter, char => char.toLocaleUpperCase(locales));
};

String.prototype.reverse = function (): string {
	let string = String.empty;
	for (let index = this.length - 1; index >= 0; index--) {
		string += this[index];
	}
	return string;
};

export { };
