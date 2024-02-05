"use strict";

const { random, trunc } = Math;

//#region Random
/**
 * Utility class for generating random numbers and values.
 */
class Random {
	/**
	 * Generates a random number within the specified range.
	 * @param {number} min The minimum value of the range.
	 * @param {number} max The maximum value of the range.
	 * @returns {number} A random number within the range [min, max).
	 */
	number(min, max) {
		return random() * (max - min) + min;
	}
	/**
	 * Generates a random integer within the specified range.
	 * @param {number} min The minimum value of the range.
	 * @param {number} max The maximum value of the range.
	 * @returns {number} A random integer within the range [min, max).
	 */
	integer(min, max) {
		return trunc(this.number(min, max));
	}
	/**
	 * Retrieves a random item from the provided array.
	 * @template T
	 * @param {T[]} array The array from which to select a random item.
	 * @returns {T} A randomly selected item from the array.
	 */
	item(array) {
		return array[this.integer(0, array.length)];
	}
	/**
	 * Selects a case from the provided map based on their relative percentages.
	 * @template T
	 * @param {Map<T, number>} cases A map where each key represents a case, and the value is the percentage weight of that case.
	 * @returns {T} The selected case based on their percentages.
	 * @throws {RangeError} If the selected value is out of range [0, summary).
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
		throw new RangeError(`Selector ${random} is out of range [0 - ${summary})`);
	}
	/**
	 * Generates a globally unique identifier (GUID).
	 * @returns {string} A string representing a GUID.
	 */
	GUID() {
		return `${crypto.randomUUID()}`;
	}
}
//#endregion

export { Random };
