/// <reference path="./declarations.d.ts" />

"use strict";

const { PI, trunc } = Math;

//#region Number
/**
 * Imports a number from a source.
 * @param {any} source The source value to import.
 * @param {string} name The name of the source value.
 * @returns {number} The imported number value.
 * @throws {TypeError} If the source is not a number.
 */
Number.import = function (source, name = `source`) {
	if (typeof (source) !== `number`) throw new TypeError(`Unable to import ${name} due its ${typename(source)} type`);
	return source.valueOf();
};

/**
 * Exports the number value.
 * @returns {number} The exported number value.
 */
Number.prototype.export = function () {
	return this.valueOf();
};

/**
 * Clamps a value between a minimum and maximum.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} The clamped value.
 */
Number.prototype.clamp = function (min, max) {
	let value = this.valueOf();
	value = (value > min ? value : min);
	value = (value < max ? value : max);
	return value;
};

/**
 * Interpolates the number from one range to another.
 * @param {number} min1 The minimum value of the original range.
 * @param {number} max1 The maximum value of the original range.
 * @param {number} min2 The minimum value of the target range.
 * @param {number} max2 The maximum value of the target range.
 * @returns {number} The interpolated value within the target range.
 * @throws {Error} If the minimum and maximum values of either range are equal.
 */
Number.prototype.interpolate = function (min1, max1, min2 = 0, max2 = 1) {
	if (min1 === max1) throw new Error(`Minimum and maximum of the original range cant be equal`);
	if (min2 === max2) throw new Error(`Minimum and maximum of the target range cant be equal`);
	return min2 + (max2 - min2) * ((this.valueOf() - min1) / (max1 - min1));
};

/**
 * Returns the current number or a default value if the current number is NaN.
 * @param {number} value The default value to return if the current number is NaN.
 * @returns {number} The current number if it is not NaN, otherwise the default value.
 */
Number.prototype.orDefault = function (value) {
	const primitive = this.valueOf();
	return (Number.isNaN(primitive) ? value : primitive);
};
//#endregion
//#region Boolean
/**
 * Imports a boolean value from a source.
 * @param {any} source The source value to import.
 * @param {string} name The name of the source value.
 * @returns {boolean} The imported boolean value.
 * @throws {TypeError} If the source is not a boolean.
 */
Boolean.import = function (source, name = `source`) {
	if (typeof (source) !== `boolean`) throw new TypeError(`Unable to import ${name} due its ${typename(source)} type`);
	return source.valueOf();
};

/**
 * Exports the boolean value.
 * @returns {boolean} The exported boolean value.
 */
Boolean.prototype.export = function () {
	return this.valueOf();
};
//#endregion
//#region String
/**
 * Imports a string from a source.
 * @param {any} source The source value to import.
 * @param {string} name The name of the source value.
 * @returns {string} The imported string value.
 * @throws {TypeError} If the source is not a string.
 */
String.import = function (source, name = `source`) {
	if (typeof (source) !== `string`) throw new TypeError(`Unable to import ${name} due its ${typename(source)} type`);
	return source.valueOf();
};

Object.defineProperty(String, `empty`, {
	value: ``,
	writable: false,
});

/**
 * Checks if a string is empty.
 * @param {string} text The string to check.
 * @returns {boolean} True if the string is empty, otherwise false.
 */
String.isEmpty = function (text) {
	return (text.length === 0);
};

/**
 * Checks if a string contains only whitespace characters.
 * @param {string} text The string to check.
 * @returns {boolean} True if the string is empty or contains only whitespace, otherwise false.
 */
String.isWhitespace = function (text) {
	return String.isEmpty(text.trim());
};

/**
 * Exports the string value.
 * @returns {string} The exported string value.
 */
String.prototype.export = function () {
	return this.valueOf();
};

/**
 * Returns the current string value or a default value if the string is empty.
 * @param {string} value The default value to return if the string is empty.
 * @returns {string} The current string value or the provided default value.
 */
String.prototype.orDefault = function (value) {
	const primitive = this.valueOf();
	return (String.isEmpty(primitive) ? value : primitive);
};

const patternWordsFirstLetter = /\b\w/g;

/**
 * Converts the string to title case, where the first letter of each word is capitalized.
 * @returns {string} The string converted to title case.
 */
String.prototype.toTitleCase = function () {
	return this.toLowerCase().replace(patternWordsFirstLetter, char => char.toUpperCase());
};

/**
 * Converts the string to title case based on the specified locale, where the first letter of each word is capitalized.
 * @param {Intl.LocalesArgument} locale The locale to use for the conversion, defaults to the user's language.
 * @returns {string} The string converted to title case based on the specified locale.
 */
String.prototype.toLocalTitleCase = function (locale = navigator.language) {
	return this.toLocaleLowerCase(locale).replace(patternWordsFirstLetter, char => char.toLocaleUpperCase(locale));
};

/**
 * Reverses the string.
 * @returns {string} The reversed string.
 */
String.prototype.reverse = function () {
	let result = String.empty;
	for (let index = this.length - 1; index >= 0; index--) {
		result += this[index];
	}
	return result;
};
//#endregion
//#region Function
/**
 * Checks if the given function is implemented by running it and seeing if it throws a specific `ReferenceError`.
 * @param {(...args: any) => unknown} action The function to check for implementation.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the function is implemented, `false` otherwise.
 */
Function.isImplemented = async function (action) {
	try {
		await action();
		return true;
	} catch (error) {
		if (!(error instanceof ImplementationError)) return true;
		return false;
	}
};

/**
 * Ensures the given function is implemented by checking it and throwing an error if it is not.
 * @param {(...args: any) => unknown} action The function to check for implementation.
 * @param {string} name The name of the function to be used in the error message if the function is not implemented.
 * @returns {Promise<void>} A promise that resolves if the function is implemented, otherwise it rejects with an error.
 * @throws {Error} Throws an error if the function is not implemented.
 */
Function.ensureImplementation = async function (action, name) {
	if (!(await Function.isImplemented(action))) throw new Error(`Function '${name}' not implemented`);
};
//#endregion
//#region Object
/**
 * Imports an object from a source.
 * @param {any} source The source to import from.
 * @param {string} name The name of the source.
 * @returns {object} The imported object.
 * @throws {TypeError} If the source is not an object or null.
 */
Object.import = function (source, name = `source`) {
	if (typeof (source) !== `object` || source === null) throw new TypeError(`Unable to import ${name} due its ${typename(source)} type`);
	return source.valueOf();
};

/**
 * Applies a callback function to a non-nullable value, or returns the original nullable value.
 * @template T The type of the input value.
 * @template {Exclude<T, NonNullable<T>>} N The type representing nullable.
 * @template R The return type of the callback function.
 * @param {NonNullable<T> | N} value The value to map.
 * @param {(object: NonNullable<T>) => R} callback The function to apply if the value is non-nullable.
 * @returns {R | N} The mapped result.
 */
Object.map = function (value, callback) {
	if (value === null || value === undefined) return value;
	else return callback(value);
};

/**
 * Ensures that a value is neither null nor undefined, throwing an error if it is.
 * @template T
 * @param {T} value The value to check.
 * @param {string} name The name of the value, used in error messages.
 * @returns {NonNullable<T>} The value if it is not null or undefined.
 * @throws {Error} If the value is null or undefined.
 */
Object.suppress = function (value, name = `value`) {
	switch (value) {
		case null: throw new Error(`${name.toTitleCase()} mustn't be null`);
		case undefined: throw new Error(`${name.toTitleCase()} mustn't be undefined`);
		default: return (/** @type {NonNullable<T>} */ (value));
	}
};

/**
 * Exports the object.
 * @returns {object} The exported object.
 */
Object.prototype.export = function () {
	return this.valueOf();
};
//#endregion
//#region Array
/**
 * Imports an array from a source.
 * @param {any} source The source to import from.
 * @param {string} name The name of the source.
 * @returns {any[]} The imported array.
 * @throws {TypeError} Throws a TypeError if the source is not an array.
 */
Array.import = function (source, name = `source`) {
	if (!(source instanceof Array)) throw new TypeError(`Unable to import ${name} due its ${typename(source)} type`);
	return Array.from(source);
};

/**
 * Generates a sequence of numbers from min to max (exclusive).
 * @param {number} min The starting number of the sequence (inclusive).
 * @param {number} max The ending number of the sequence (exclusive).
 * @returns {number[]} An array containing the sequence of numbers.
 */
Array.sequence = function (min, max) {
	min = trunc(min);
	max = trunc(max);
	const result = new Array(max - min);
	for (let index = 0; index < max - min; index++) {
		result[index] = index + min;
	}
	return result;
};

/**
 * Exports the array.
 * @returns {this[]} The exported array.
 */
Array.prototype.export = function () {
	return Array.from(this);
};

/**
 * Swaps the elements at the given indices in the array.
 * @param {number} index1 The index of the first element.
 * @param {number} index2 The index of the second element.
 * @returns {void}
 */
Array.prototype.swap = function (index1, index2) {
	index1 = trunc(index1);
	index2 = trunc(index2);
	const temporary = this[index1];
	this[index1] = this[index2];
	this[index2] = temporary;
};
//#endregion
//#region Stack
/**
 * Represents a stack data structure.
 * @template T The type of elements in the stack.
 */
class Stack {
	/**
	 * @param {T[]} items The initial items to add to the stack.
	 */
	constructor(...items) {
		this.#array = items;
	}
	/** @type {T[]} */
	#array;
	/**
	 * Pushes an item onto the top of the stack.
	 * @param {T} item The item to push onto the stack.
	 * @returns {void}
	 */
	push(item) {
		this.#array.push(item);
	}
	/**
	 * Returns the item at the top of the stack without removing it.
	 * @readonly
	 * @returns {T} The item at the top of the stack.
	 * @throws {Error} If the stack is empty.
	 */
	get peek() {
		const value = this.#array.at(-1);
		if (value === undefined) throw new Error(`Stack is empty`);
		return value;
	}
	/**
	 * Removes and returns the item at the top of the stack.
	 * @returns {T} The item that was removed from the top of the stack.
	 * @throws {Error} If the stack is empty.
	 */
	pop() {
		const value = this.#array.pop();
		if (value === undefined) throw new Error(`Stack is empty`);
		return value;
	}
	/**
	 * Removes all items from the stack.
	 * @returns {T[]} An array containing the removed items.
	 */
	clear() {
		return this.#array.splice(0, this.#array.length);
	}
	/**
	 * Gets the number of items in the stack.
	 * @readonly
	 * @returns {number} The number of items in the stack.
	 */
	get size() {
		return this.#array.length;
	}
	/**
	 * Returns an iterator that yields the keys of the stack.
	 * @returns {IterableIterator<number>} An iterator for the keys of the stack.
	 */
	keys() {
		return this.#array.keys();
	}
	/**
	 * Returns an iterator that yields the values of the stack.
	 * @returns {IterableIterator<T>} An iterator for the values of the stack.
	 */
	values() {
		return this.#array.values();
	}
	/**
	 * Returns an iterator that yields the entries [index, value] of the stack.
	 * @returns {IterableIterator<[number, T]>} An iterator for the entries of the stack.
	 */
	entries() {
		return this.#array.entries();
	}
	/**
	 * Returns an iterator that yields the values of the stack.
	 * @returns {IterableIterator<T>} An iterator for the values of the stack.
	 */
	*[Symbol.iterator]() {
		for (const item of this.#array) {
			yield item;
		}
	}
}
//#endregion
//#region Queue
/**
 * Represents a queue data structure.
 * @template T The type of elements in the queue.
 */
class Queue {
	/**
	 * @param {T[]} items The initial items to add to the queue.
	 */
	constructor(...items) {
		this.#array = items;
	}
	/** @type {T[]} */
	#array;
	/**
	 * Adds an item to the end of the queue.
	 * @param {T} item The item to add to the queue.
	 * @returns {void}
	 */
	push(item) {
		this.#array.push(item);
	}
	/**
	 * Returns the item at the front of the queue without removing it.
	 * @readonly
	 * @returns {T} The item at the front of the queue.
	 * @throws {Error} If the queue is empty.
	 */
	get peek() {
		const value = this.#array.at(0);
		if (value === undefined) throw new Error(`Queue is empty`);
		return value;
	}
	/**
	 * Removes and returns the item at the front of the queue.
	 * @returns {T} The item that was removed from the front of the queue.
	 * @throws {Error} If the queue is empty.
	 */
	shift() {
		const value = this.#array.shift();
		if (value === undefined) throw new Error(`Queue is empty`);
		return value;
	}
	/**
	 * Removes all items from the queue.
	 * @returns {T[]} An array containing the removed items.
	 */
	clear() {
		return this.#array.splice(0, this.#array.length);
	}
	/**
	 * Gets the number of items in the queue.
	 * @readonly
	 * @returns {number} The number of items in the queue.
	 */
	get size() {
		return this.#array.length;
	}
	/**
	 * Returns an iterator that yields the keys of the queue.
	 * @returns {IterableIterator<number>} An iterator for the keys of the queue.
	 */
	keys() {
		return this.#array.keys();
	}
	/**
	 * Returns an iterator that yields the values of the queue.
	 * @returns {IterableIterator<T>} An iterator for the values of the queue.
	 */
	values() {
		return this.#array.values();
	}
	/**
	 * Returns an iterator that yields the entries [index, value] of the queue.
	 * @returns {IterableIterator<[number, T]>} An iterator for the entries of the queue.
	 */
	entries() {
		return this.#array.entries();
	}
	/**
	 * Returns an iterator that yields the values of the queue.
	 * @returns {IterableIterator<T>} An iterator for the values of the queue.
	 */
	*[Symbol.iterator]() {
		for (const item of this.#array) {
			yield item;
		}
	}
}
//#endregion
//#region Data pair
/**
 * Represents a key-value pair of data.
 * @template K The type of the key.
 * @template V The type of the value.
 */
class DataPair {
	/**
	 * Creates a DataPair instance from an array containing a key-value pair.
	 * @template K The type of the key.
	 * @template V The type of the value.
	 * @param {Readonly<[NonNullable<K>, V]>} source The source array containing the key-value pair.
	 * @returns {DataPair<K, V>} A new DataPair instance.
	 */
	static fromArray(source) {
		const [key, value] = source;
		return new DataPair(key, value);
	}
	/**
	 * Converts the DataPair instance to an array containing the key-value pair.
	 * @returns {[NonNullable<K>, V]} The key-value pair as an array.
	 */
	toArray() {
		return [this.#key, this.#value];
	}
	/**
	 * @param {NonNullable<K>} key The key of the data pair.
	 * @param {V} value The value of the data pair.
	 */
	constructor(key, value) {
		this.#key = key;
		this.#value = value;
	}
	/** @type {NonNullable<K>} */
	#key;
	/**
	 * Gets the key of the data pair.
	 * @readonly
	 * @returns {NonNullable<K>} The key of the data pair.
	 */
	get key() {
		return this.#key;
	}
	/** @type {V} */
	#value;
	/**
	 * Gets the value of the data pair.
	 * @returns {V} The value of the data pair.
	 */
	get value() {
		return this.#value;
	}
	/**
	 * Sets the value of the data pair.
	 * @param {V} value The new value of the data pair.
	 * @returns {void}
	 */
	set value(value) {
		this.#value = value;
	}
}
//#endregion
//#region Strict map
/**
 * Represents a strict map data structure.
 * @template K The type of keys in the map.
 * @template V The type of values in the map.
 */
class StrictMap {
	/**
	 * @param {Readonly<[NonNullable<K>, V]>[]} items The initial key-value pairs to add to the map.
	 */
	constructor(...items) {
		this.#map = new Map(items);
	}
	/** @type {Map<NonNullable<K>, V>} */
	#map;
	/**
	 * Gets the value associated with the specified key.
	 * @param {NonNullable<K>} key The key to look up in the map.
	 * @returns {V} The value associated with the specified key.
	 * @throws {Error} If the key is missing in the map.
	 */
	get(key) {
		const value = this.#map.get(key);
		if (value === undefined) throw new Error(`Value for key '${key}' is missing`);
		return value;
	}
	/**
	 * Gets the value associated with the specified key, or null if the key is missing.
	 * @param {NonNullable<K>} key The key to look up in the map.
	 * @returns {V | null} The value associated with the specified key, or null if the key is missing.
	 */
	ask(key) {
		const value = this.#map.get(key);
		return (value === undefined ? null : value);
	}
	/**
	 * Adds a new key-value pair to the map.
	 * @param {NonNullable<K>} key The key to add to the map.
	 * @param {V} value The value associated with the key.
	 * @returns {void}
	 * @throws {Error} If the key already exists in the map.
	 */
	add(key, value) {
		if (this.#map.has(key)) throw new Error(`Value for key '${key}' already exists`);
		this.#map.set(key, value);
	}
	/**
	 * Sets the value associated with the specified key.
	 * @param {NonNullable<K>} key The key to set the value for.
	 * @param {V} value The new value associated with the key.
	 * @returns {void}
	 */
	set(key, value) {
		this.#map.set(key, value);
	}
	/**
	 * Checks whether the map contains the specified key.
	 * @param {NonNullable<K>} key The key to check for in the map.
	 * @returns {boolean} true if the map contains the key, otherwise false.
	 */
	has(key) {
		return this.#map.has(key);
	}
	/**
	 * Deletes the key-value pair associated with the specified key from the map.
	 * @param {NonNullable<K>} key The key to delete from the map.
	 * @returns {void}
	 * @throws {Error} If the key is missing in the map.
	 */
	delete(key) {
		if (!this.#map.delete(key)) throw new Error(`Value for key '${key}' is missing`);
	}
	/**
	 * Removes all key-value pairs from the map.
	 * @returns {void}
	 */
	clear() {
		this.#map.clear();
	}
	/**
	 * Gets the number of key-value pairs in the map.
	 * @readonly
	 * @returns {number} The number of key-value pairs in the map.
	 */
	get size() {
		return this.#map.size;
	}
	/**
	 * Returns an iterator that yields the keys of the map.
	 * @returns {IterableIterator<NonNullable<K>>} An iterator for the keys of the map.
	 */
	keys() {
		return this.#map.keys();
	}
	/**
	 * Returns an iterator that yields the values of the map.
	 * @returns {IterableIterator<V>} An iterator for the values of the map.
	 */
	values() {
		return this.#map.values();
	}
	/**
	 * Returns an iterator that yields the key-value pairs of the map.
	 * @returns {IterableIterator<[NonNullable<K>, V]>} An iterator for the entries of the map.
	 */
	entries() {
		return this.#map.entries();
	}
	/**
	 * Returns an iterator that yields the key-value pairs of the map.
	 * @returns {IterableIterator<[NonNullable<K>, V]>} An iterator for the entries of the map.
	 */
	*[Symbol.iterator]() {
		for (const item of this.#map) {
			yield item;
		}
	}
}
//#endregion
//#region Math
/**
 * Splits a number into its integer and fractional parts.
 * @param {number} x The number to be split.
 * @returns {[number, number]} A tuple where the first element is the integer part and the second element is the fractional part.
 */
Math.split = function (x) {
	const integer = trunc(x);
	return [integer, (x - integer)];
};

/**
 * Calculates the square of a number.
 * @param {number} x The number to square.
 * @returns {number} The square of the input number.
 */
Math.sqpw = function (x) {
	return x * x;
};

const toDegreeFactor = 180 / PI;
/**
 * Converts radians to degrees.
 * @param {number} radians The angle in radians.
 * @returns {number} The angle in degrees.
 */
Math.toDegrees = function (radians) {
	return radians * toDegreeFactor;
};

const toRadianFactor = PI / 180;
/**
 * Converts degrees to radians.
 * @param {number} degrees The angle in degrees.
 * @returns {number} The angle in radians.
 */
Math.toRadians = function (degrees) {
	return degrees * toRadianFactor;
};
//#endregion
//#region Promise
Object.defineProperty(Promise.prototype, `fulfilled`, {
	async get() {
		try {
			await this;
			return true;
		} catch (reason) {
			return false;
		}
	}
});

Object.defineProperty(Promise.prototype, `value`, {
	async get() {
		try {
			return await this;
		} catch (reason) {
			throw new Error(`Unable to get value of rejected promise`);
		}
	}
});

Object.defineProperty(Promise.prototype, `reason`, {
	async get() {
		try {
			await this;
			throw new Error(`Unable to get reason of resolved promise`);
		} catch (reason) {
			return reason;
		}
	}
});
//#endregion
//#region Promise factory
/**
 * A factory that allows running promises with a custom executor.
 * @template T
 */
class PromiseFactory {
	/**
	 * @param {(resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void} executor The executor function that takes two arguments: resolve and reject.
	 */
	constructor(executor) {
		this.#executor = executor;
	}
	/** @type {(resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void} */
	#executor;
	/**
	 * Runs the promise using the provided executor.
	 * @returns {Promise<T>} The promise that resolves with the value produced by the executor.
	 */
	async run() {
		const { promise, resolve, reject } = Promise.withResolvers();
		this.#executor.call(promise, resolve, reject);
		return await promise;
	}
	/**
	 * Repeatedly runs the promise until the given predicate returns true.
	 * @param {(value: T) => boolean} predicate A function that tests the resolved value.
	 * @returns {Promise<T>} The promise that resolves when the predicate is true.
	 */
	async runUntil(predicate) {
		while (true) {
			try {
				const result = await this.run();
				if (!predicate(result)) continue;
				return result;
			} catch {
				continue;
			}
		}
	}
	/**
	 * @template U
	 * @param {(value: T) => U} callback 
	 * @returns {Promise<U>}
	 */
	async runMapping(callback) {
		while (true) {
			try {
				return callback(await this.run());
			} catch {
				continue;
			}
		}
	}
}
//#endregion
//#region Error
/**
 * Generates an Error object from the provided input.
 * @param {any} exception The exception input.
 * @returns {Error} An Error object representing the input.
 */
Error.from = function (exception) {
	return exception instanceof Error ? exception : new Error(exception ?? `Undefined error type`);
};

/**
 * Returns a string representation of the Error object.
 * @returns {string} A string representation of the Error object.
 */
Error.prototype.toString = function () {
	let text = this.stack ?? `${this.name}: ${this.message}`;
	if (this.cause !== undefined) text += ` cause of:\n\r${Error.from(this.cause)}`;
	return text;
};
//#endregion
//#region Implementation error
class ImplementationError extends ReferenceError {
	/**
	 * @param {ErrorOptions} options 
	 */
	constructor(options = {}) {
		super(`Not implemented function`, options);
		if (new.target !== ImplementationError) throw new TypeError(`Unable to create an instance of sealed-extended class`);
		this.name = `ImplementationError`;
	}
}
//#endregion

//#region Global
/**
 * Returns the prototype of the given non-nullable value.
 * @template T
 * @param {NonNullable<T>} value The value whose prototype is to be retrieved. It cannot be null or undefined.
 * @returns {Function}
 */
globalThis.prototype = function (value) {
	return value.constructor;
};

/**
 * Gets the type name of a value.
 * @param {any} value The value to get the type name of.
 * @returns {string} The type name of the value.
 */
globalThis.typename = function (value) {
	switch (value) {
		case undefined:
		case null: return String(value).toTitleCase();
		default: return prototype(value).name;
	}
};
//#endregion

export { Stack, Queue, DataPair, StrictMap, PromiseFactory, ImplementationError };
