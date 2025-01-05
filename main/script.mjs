"use strict";

import { } from "../scripts/structure.mjs";

import { } from "../scripts/dom/extensions.mjs";
import { } from "../scripts/dom/palette.mjs";
import { } from "../scripts/dom/storage.mjs";

//#region Controller
/**
 * Represents the controller for the application.
 */
class Controller {
	//#region Internal
	/** @type {boolean} */
	static #locked = true;
	/**
	 * @param {any} reason 
	 * @returns {Promise<void>}
	 */
	static async #catch(reason) {
		const error = Error.from(reason);
		let message = String(error);
		message += `\n\nAn error occurred. Any further actions may result in errors. To prevent this from happening, would you like to reload?`;
		if (await window.confirmAsync(message)) location.reload();
		throw reason;
	}
	/**
	 * Starts the main application flow.
	 * @returns {Promise<void>}
	 */
	static async build() {
		Controller.#locked = false;
		const self = new Controller();
		Controller.#locked = true;

		try {
			await self.#main();
		} catch (reason) {
			await Controller.#catch(reason);
		}
	}
	constructor() {
		if (Controller.#locked) throw new TypeError(`Illegal constructor`);
	}
	//#endregion

	/**
	 * @returns {Promise<void>}
	 */
	async #main() {
		// Your run logic goes here
	}
}
//#endregion

Controller.build();
