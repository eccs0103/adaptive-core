"use strict";

import { } from "../structure.js";
import { Stopwatch } from "./measures.js";

//#region Analyser
/**
 * Provides methods for analysing the code.
 */
class Analyser {
	/**
	 * Executes a given action multiple times and returns the average time taken.
	 * @param {() => unknown} action The function to be benchmarked.
	 * @param {number} count The number of times to run the action. Defaults to 1.
	 * @returns {Promise<number>} The average time taken in milliseconds.
	 */
	static async benchmark(action, count = 1) {
		const stopwatch = new Stopwatch();
		for (let index = 0; index < count; index++) {
			stopwatch.launched = true;
			await action();
			stopwatch.launched = false;
		}
		return stopwatch.elapsed / count;
	}
}
//#endregion

export { Analyser };
