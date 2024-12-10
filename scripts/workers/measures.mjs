"use strict";

import { FastEngine } from "./generators.mjs";

//#region Stopwatch
/**
 * A class representing a stopwatch to measure time durations.
 */
class Stopwatch {
	/**
	 * @param {boolean} launch Whether to start the stopwatch immediately.
	 */
	constructor(launch = false) {
		this.#launched = launch;

		const engine = new FastEngine(true);

		let previous = performance.now();
		engine.addEventListener(`update`, (event) => {
			let current = performance.now();
			if (this.#launched) {
				this.#elapsed += current - previous;
			}
			previous = current;
		});
	}
	/** @type {DOMHighResTimeStamp} */
	#elapsed = 0;
	/**
	 * Gets the elapsed time as milliseconds.
	 * @readonly
	 * @returns {DOMHighResTimeStamp}
	 */
	get elapsed() {
		return this.#elapsed;
	}
	/**
	 * Resets the elapsed time to zero.
	 * @returns {void}
	 */
	reset() {
		this.#elapsed = 0;
	}
	/** @type {boolean} */
	#launched;
	/**
	 * Gets the launched state of the stopwatch.
	 * @returns {boolean}
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launched state of the stopwatch.
	 * @param {boolean} value
	 * @returns {void}
	 */
	set launched(value) {
		this.#launched = value;
	}
}
//#endregion

export { Stopwatch };
