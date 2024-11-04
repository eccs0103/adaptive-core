"use strict";

import { } from "../scripts/structure.js";

//#region Alert severity
/**
 * @enum {number}
 */
const AlertSeverity = {
	/**
	 * Ignore the response, taking no action.
	 * @readonly
	 */
	ignore: 0,
	/**
	 * Log the response for informational purposes.
	 * @readonly
	 */
	log: 1,
	/**
	 * Throw an error in response to a critical event.
	 * @readonly
	 */
	throw: 2,
};
Object.freeze(AlertSeverity);
//#endregion
//#region Controller
/**
 * Represents the controller for the application.
 */
class Controller {
	//#region Internal
	/** @type {boolean} */
	static #locked = true;
	/**
	 * Starts the main application flow.
	 * @returns {Promise<void>}
	 */
	static async launch() {
		Controller.#locked = false;
		const self = new Controller();
		Controller.#locked = true;

		try {
			await self.#main();
		} catch (error) {
			await self.#catch(Error.from(error));
		}
	}
	constructor() {
		if (Controller.#locked) throw new TypeError(`Illegal constructor`);
	}
	/** @type {AlertSeverity} */
	#severity = AlertSeverity.throw;
	/**
	 * @param {Error} error 
	 * @returns {Promise<void>}
	 */
	async #catch(error) {
		switch (this.#severity) {
			case AlertSeverity.ignore: break;
			case AlertSeverity.log: {
				console.error(error);
			} break;
			case AlertSeverity.throw: {
				await window.alertAsync(error);
				location.reload();
			} break;
		}
	}
	//#endregion
	//#region Implementation
	/**
	 * @returns {Promise<void>}
	 */
	async #main() {
		// Your run logic goes here
	}
	//#endregion
}

await Controller.launch();
//#endregion
