/// <reference path="./declarations.d.ts" />

"use strict";

const { PI, trunc } = Math;

//#region Number
/**
 * Imports a number from a source.
 * @param {unknown} source The source value to import.
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
 * @param {unknown} source The source value to import.
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
 * @param {unknown} source The source value to import.
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
 * Returns the prototype of the given non-nullable value.
 * @template T
 * @param {NonNullable<T>} value The value whose prototype is to be retrieved. It cannot be null or undefined.
 * @returns {Function}
 */
Function.getPrototypeOf = function (value) {
	return value.constructor;
};

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

/**
 * Imports from a source.
 * @abstract
 * @param {unknown} source The source to import.
 * @param {string} name The name of the source.
 * @returns {any} The imported value.
 */
Function.prototype.import = function (source, name = `source`) {
	throw new ImplementationError();
};

/**
 * Exports the result.
 * @abstract
 * @returns {any} The exported value.
 */
Function.prototype.export = function () {
	throw new ImplementationError();
};
//#endregion
//#region Object
/**
 * Imports an object from a source.
 * @param {unknown} source The source to import from.
 * @param {string} name The name of the source.
 * @returns {Object} The imported object.
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
 * @returns {Object} The exported object.
 */
Object.prototype.export = function () {
	return this.valueOf();
};
//#endregion
//#region Array
/**
 * Imports an array from a source.
 * @param {unknown} source The source to import from.
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
	const integer = Math.trunc(x);
	const fractional = x - integer;
	return [integer, fractional];
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
/**
 * Creates a promise that fulfills with the result of calling the provided action.
 * @template T
 * @param {() => T | PromiseLike<T>} action The action to execute.
 * @returns {Promise<T>} A promise that fulfills with the result of the action.
 */
Promise.fulfill = function (action) {
	const { promise, resolve, reject } = Promise.withResolvers();
	try {
		resolve(action());
	} catch (error) {
		reject(error);
	}
	return promise;
};

/**
 * Creates a promise that resolves after the specified timeout.
 * @param {number} timeout The timeout in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the timeout.
 */
Promise.withTimeout = function (timeout) {
	const { promise, resolve } = Promise.withResolvers();
	promise.then(_ => clearTimeout(index));
	const index = setTimeout(resolve, timeout);
	return promise;
};

/**
 * Creates a promise that can be controlled with an abort signal.
 * @template T
 * @param {(signal: AbortSignal, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void} callback The callback to execute with an abort signal, resolve, and reject functions.
 * @returns {Promise<T>} A promise that can be controlled with an abort signal.
 */
Promise.withSignal = function (callback) {
	const controller = new AbortController();
	const { promise, resolve, reject } = Promise.withResolvers();
	promise.then(_ => controller.abort(), _ => controller.abort());
	callback(controller.signal, resolve, reject);
	return promise;
};
//#endregion
//#region Error
/**
 * Generates an Error object from the provided input.
 * @param {any} exception The exception input.
 * @returns {Error} An Error object representing the input.
 */
Error.from = function (exception) {
	return exception instanceof Error ? exception : new Error(`Undefined error type`);
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

//#region Parent node
/**
 * Retrieves an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
Element.prototype.getElement = function (type, selectors) {
	const element = this.querySelector(selectors);
	if (element instanceof type) return (/** @type {InstanceType<T>} */ (element));
	else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
Element.prototype.tryGetElement = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const element = this.querySelector(selectors);
		if (element instanceof type) resolve(/** @type {InstanceType<T>} */(element));
		else if (strict) reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
	});
};

/**
 * Retrieves elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @returns {NodeListOf<InstanceType<T>>} The NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type.
 */
Element.prototype.getElements = function (type, selectors) {
	const elements = this.querySelectorAll(selectors);
	if (Array.from(elements).every(element => element instanceof type)) return (/** @type {NodeListOf<InstanceType<T>>} */ (elements));
	else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @param {boolean} strict Whether to reject if any element is missing or has an invalid type.
 * @returns {Promise<NodeListOf<InstanceType<T>>>} A promise that resolves to the NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type and strict mode is enabled.
 */
Element.prototype.tryGetElements = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const elements = this.querySelectorAll(selectors);
		if (Array.from(elements).every(element => element instanceof type)) resolve(/** @type {NodeListOf<InstanceType<T>>} */(elements));
		else if (strict) reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
	});
};

/**
 * Retrieves an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
Document.prototype.getElement = function (type, selectors) {
	return this.documentElement.getElement(type, selectors);
};

/**
 * Tries to retrieve an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
Document.prototype.tryGetElement = function (type, selectors, strict = false) {
	return this.documentElement.tryGetElement(type, selectors, strict);
};

/**
 * Retrieves elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @returns {NodeListOf<InstanceType<T>>} The NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type.
 */
Document.prototype.getElements = function (type, selectors) {
	return this.documentElement.getElements(type, selectors);
};

/**
 * Tries to retrieve elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @param {boolean} strict Whether to reject if any element is missing or has an invalid type.
 * @returns {Promise<NodeListOf<InstanceType<T>>>} A promise that resolves to the NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type and strict mode is enabled.
 */
Document.prototype.tryGetElements = function (type, selectors, strict = false) {
	return this.documentElement.tryGetElements(type, selectors, strict);
};

/**
 * Retrieves an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
DocumentFragment.prototype.getElement = function (type, selectors) {
	const element = this.querySelector(selectors);
	if (element instanceof type) return (/** @type {InstanceType<T>} */ (element));
	else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
DocumentFragment.prototype.tryGetElement = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const element = this.querySelector(selectors);
		if (element instanceof type) resolve(/** @type {InstanceType<T>} */(element));
		else if (strict) reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
	});
};

/**
 * Retrieves elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @returns {NodeListOf<InstanceType<T>>} The NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type.
 */
DocumentFragment.prototype.getElements = function (type, selectors) {
	const elements = this.querySelectorAll(selectors);
	if (Array.from(elements).every(element => element instanceof type)) return (/** @type {NodeListOf<InstanceType<T>>} */ (elements));
	else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @param {boolean} strict Whether to reject if any element is missing or has an invalid type.
 * @returns {Promise<NodeListOf<InstanceType<T>>>} A promise that resolves to the NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type and strict mode is enabled.
 */
DocumentFragment.prototype.tryGetElements = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const elements = this.querySelectorAll(selectors);
		if (Array.from(elements).every(element => element instanceof type)) resolve(/** @type {NodeListOf<InstanceType<T>>} */(elements));
		else if (strict) reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
	});
};
//#endregion
//#region Element
/**
 * Retrieves the closest ancestor element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
Element.prototype.getClosest = function (type, selectors) {
	const element = this.closest(selectors);
	if (element instanceof type) return (/** @type {InstanceType<T>} */ (element));
	else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve the closest ancestor element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
Element.prototype.tryGetClosest = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const element = this.closest(selectors);
		if (element instanceof type) resolve(/** @type {InstanceType<T>} */(element));
		else if (strict) reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
	});
};
//#endregion
//#region Document
/**
 * Asynchronously loads an image from the specified URL.
 * @param {string} url The URL of the image to be loaded.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image element.
 * @throws {Error} If the image fails to load.
 */
Document.prototype.loadImage = async function (url) {
	const image = new Image();
	const promise = Promise.withSignal((signal, resolve, reject) => {
		image.addEventListener(`load`, (event) => resolve(undefined), { signal });
		image.addEventListener(`error`, (event) => reject(Error.from(event.error)), { signal });
	});
	image.src = url;
	await promise;
	return image;
};

/**
 * Asynchronously loads multiple images from the provided URLs.
 * @param {string[]} urls An array of image URLs to be loaded.
 * @returns {Promise<HTMLImageElement[]>} A promise that resolves with an array of loaded image elements.
 * @throws {Error} If any image fails to load.
 */
Document.prototype.loadImages = async function (urls) {
	return await Promise.all(urls.map(url => this.loadImage(url)));
};
//#endregion
//#region Window
/**
 * Gets the type name of a value.
 * @param {any} value The value to get the type name of.
 * @returns {string} The type name of the value.
 */
Window.prototype.typename = function (value) {
	switch (value) {
		case undefined:
		case null: return String(value).toTitleCase();
		default: return Function.getPrototypeOf(value).name;
	}
};

const dialogAlert = document.getElement(HTMLDialogElement, `dialog.pop-up.alert`);
dialogAlert.addEventListener(`click`, (event) => {
	if (event.target === dialogAlert) {
		dialogAlert.close();
	}
});

/**
 * Asynchronously displays an alert message.
 * @param {any} message The message to display.
 * @param {string} title The title of the alert.
 * @returns {Promise<void>} A promise that resolves when the alert is closed.
 */
Window.prototype.write = function (message = ``, title = `Message`) {
	dialogAlert.showModal();
	//#region Header
	const htmlHeader = dialogAlert.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogAlert.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = `${message}`;
	//#endregion
	const promise = Promise.withSignal((signal, resolve) => {
		dialogAlert.addEventListener(`close`, (event) => resolve(undefined), { signal });
	});
	promise.finally(() => dialogAlert.close());
	return promise;
};

const dialogConfirm = document.getElement(HTMLDialogElement, `dialog.pop-up.confirm`);
dialogConfirm.addEventListener(`click`, (event) => {
	if (event.target === dialogConfirm) {
		dialogConfirm.close();
	}
});

/**
 * Asynchronously displays a confirmation dialog.
 * @param {string} message The message to display.
 * @param {string} title The title of the confirmation dialog.
 * @returns {Promise<boolean>} A promise that resolves to true if the user confirms, and false otherwise.
 */
Window.prototype.ask = function (message = ``, title = `Message`) {
	dialogConfirm.showModal();
	//#region Header
	const htmlHeader = dialogConfirm.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogConfirm.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogConfirm.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Button Decline
	const buttonDecline = htmlFooter.getElement(HTMLButtonElement, `button.invalid`);
	//#endregion
	//#endregion
	/** @type {Promise<boolean>} */
	const promise = Promise.withSignal((signal, resolve, reject) => {
		dialogConfirm.addEventListener(`close`, (event) => resolve(false), { signal });
		buttonAccept.addEventListener(`click`, (event) => resolve(true), { signal });
		buttonDecline.addEventListener(`click`, (event) => resolve(false), { signal });
	});
	promise.finally(() => dialogConfirm.close());
	return promise;
};

const dialogPrompt = document.getElement(HTMLDialogElement, `dialog.pop-up.prompt`);
dialogPrompt.addEventListener(`click`, (event) => {
	if (event.target === dialogPrompt) {
		dialogPrompt.close();
	}
});

/**
 * Asynchronously displays a prompt dialog.
 * @param {string} message The message to display.
 * @param {string} title The title of the prompt dialog.
 * @returns {Promise<string?>} A promise that resolves to the user's input value if accepted, or null if canceled.
 */
Window.prototype.read = function (message = ``, _default = ``, title = `Message`) {
	dialogPrompt.showModal();
	//#region Header
	const htmlHeader = dialogPrompt.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogPrompt.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogPrompt.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Input Prompt
	const inputPrompt = htmlFooter.getElement(HTMLInputElement, `input[type="text"]`);
	inputPrompt.value = _default;
	//#endregion
	//#endregion
	/** @type {Promise<string?>} */
	const promise = Promise.withSignal((signal, resolve, reject) => {
		dialogPrompt.addEventListener(`close`, (event) => resolve(null), { signal });
		buttonAccept.addEventListener(`click`, (event) => resolve(inputPrompt.value), { signal });
	});
	promise.finally(() => dialogPrompt.close());
	return promise;
};

/**
 * Issues a warning message.
 * @param {any} message The warning message to be issued.
 * @returns {Promise<void>} A Promise that resolves when the warning is displayed.
 */
Window.prototype.warn = async function (message = ``) {
	await this.write(message, `Warning`);
};

/**
 * Throws an error message.
 * @param {any} message The error message to be thrown.
 * @returns {Promise<void>} A Promise that resolves when the error is displayed.
 */
Window.prototype.throw = async function (message = ``) {
	await this.write(message, `Error`);
};

/**
 * Executes an action and handles any errors that occur.
 * @param {() => unknown} action The action to be executed.
 * @param {boolean} silent In silent mode errors are silently ignored; otherwise, they are thrown and the page is reloaded.
 * @returns {Promise<void>} A promise that resolves the action.
 */
Window.prototype.assert = async function (action, silent = false) {
	try {
		await action();
	} catch (error) {
		if (silent) return;
		await this.throw(Error.from(error));
		location.reload();
	}
};

/** @type {Keyframe} */
const keyframeAppear = { opacity: `1` };
/** @type {Keyframe} */
const keyframeDisappear = { opacity: `0` };

/**
 * Asynchronously loads a promise with a loading animation.
 * @template T
 * @param {Promise<T>} promise The promise to load.
 * @param {number} duration The duration of the loading animation.
 * @param {number} delay The delay before the loading animation starts.
 * @returns {Promise<T>} A promise that resolves to the result of the input promise.
 */
Window.prototype.load = async function (promise, duration = 200, delay = 0) {
	const dialogLoader = document.getElement(HTMLDialogElement, `dialog.loader`);
	try {
		dialogLoader.showModal();
		await dialogLoader.animate([keyframeDisappear, keyframeAppear], { duration, fill: `both` }).finished;
		return await promise;
	} finally {
		await dialogLoader.animate([keyframeAppear, keyframeDisappear], { duration, fill: `both`, delay }).finished;
		dialogLoader.close();
	}
};
//#endregion
//#region Version manager
/**
 * Represents a version manager for parsing and comparing version numbers.
 */
class VersionManager {
	/** @type {RegExp} */
	static #patternVersion = /^(\d+)\.(\d+)\.(\d+)$/;
	/**
	 * Parses a version number from the given string.
	 * @param {string} string The string representing the version number.
	 * @returns {VersionManager} A VersionManager instance representing the parsed version.
	 * @throws {SyntaxError} If the version syntax is invalid.
	 */
	static parse(string) {
		const match = VersionManager.#patternVersion.exec(string);
		if (match === null) throw new SyntaxError(`Invalid version '${string}' syntax. Version must have <number>.<number>.<number> syntax`);
		const [, major, minor, patch] = match.map(part => Number(part));
		const version = new VersionManager();
		version.#major = major;
		version.#minor = minor;
		version.#patch = patch;
		return version;
	}
	/** @type {number} */
	#major = 1;
	/** @type {number} */
	#minor = 0;
	/** @type {number} */
	#patch = 0;
	/**
	 * Checks if this version is higher than the specified version.
	 * @param {VersionManager} other The other version to compare against.
	 * @returns {boolean} True if this version is higher; otherwise, false.
	 */
	isHigherThen(other) {
		if (this.#major > other.#major) return true;
		else if (this.#minor > other.#minor) return true;
		else if (this.#patch > other.#patch) return true;
		else return false;
	}
	/**
	 * Converts the version to a string representation.
	 * @returns {string} The string representation of the version.
	 */
	toString() {
		return `${this.#major}.${this.#minor}.${this.#patch}`;
	}
}
//#endregion
//#region Navigator
Object.defineProperty(Navigator.prototype, `dataPath`, {
	get() {
		const developer = document.getElement(HTMLMetaElement, `meta[name="author"]`).content;
		const title = document.getElement(HTMLMetaElement, `meta[name="title"]`).content;
		return `${developer}.${title}`;
	}
});

Object.defineProperty(Navigator.prototype, `version`, {
	get() {
		const metaVersion = document.getElement(HTMLMetaElement, `meta[name="generator"]`).content;
		return VersionManager.parse(metaVersion);
	}
});

Object.defineProperty(Navigator.prototype, `colorScheme`, {
	get() {
		return document.getElement(HTMLMetaElement, `meta[name="color-scheme"]`).content;
	},
	set(value) {
		document.getElement(HTMLMetaElement, `meta[name="color-scheme"]`).content = String(value);
	}
});

/**
 * Downloads the specified file.
 * @param {File} file The file to download.
 * @returns {void}
 */
Navigator.prototype.download = function (file) {
	const aLink = document.createElement(`a`);
	aLink.download = file.name;
	aLink.href = URL.createObjectURL(file);
	aLink.click();
	URL.revokeObjectURL(aLink.href);
	aLink.remove();
};
//#endregion

export { Stack, Queue, DataPair, StrictMap, ImplementationError };
