"use strict";

const { random, round, trunc } = Math;

//#region Random
/**
 * Random values generator.
 */
class Random {
	/**
	 * Generates a random boolean value.
	 * @returns {boolean} A random boolean value.
	 */
	boolean() {
		return Boolean(round(random()));
	}
	/**
	 * Returns a random number between the specified values.
	 * @param {number} min The minimum value.
	 * @param {number} max The maximum value.
	 * @returns {number} A random number.
	 */
	number(min, max) {
		return random() * (max - min) + min;
	}
	/**
	 * Returns a random integer between the specified values.
	 * @param {number} min The minimum value.
	 * @param {number} max The maximum value.
	 * @returns {number} A random integer.
	 */
	integer(min, max) {
		return trunc(this.number(min, max));
	}
	/**
	 * Returns a random element from an array.
	 * @template T
	 * @param {T[]} array The array of elements.
	 * @returns {T} A random element.
	 */
	item(array) {
		return array[this.integer(0, array.length)];
	}
	/**
	 * Selects a random element from a list according to their weights.
	 * @template T
	 * @param {Map<T, number>} cases The map with elements and their weights.
	 * @returns {T} A random element.
	 * @throws {RangeError} If the map is empty.
	 */
	case(cases) {
		const summary = [...cases].reduce((previous, [, percentage]) => previous + percentage, 0);
		const random = this.number(0, summary);
		let begin = 0;
		for (const [item, percentage] of cases) {
			const end = begin + percentage;
			if (begin <= random && random < end) {
				return item;
			}
			begin = end;
		}
		throw new RangeError(`Unable to select value. Most likely the map is empty.`);
	}
	/**
	 * Generates a random GUID identifier.
	 * @returns {string} A random GUID identifier.
	 */
	GUID() {
		return `${crypto.randomUUID()}`;
	}
}
//#endregion

export { Random };
