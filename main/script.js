"use strict";

import { } from "../scripts/structure.js";

//#region Controller
/**
 * Represents the controller for the application.
 */
class Controller {
	//#region Launch
	/** @type {boolean} */
	static #locked = true;
	/**
	 * This method orchestrates the preload process and then starts the main application flow.
	 * @param {ConstructorParameters<typeof Controller>} args 
	 * @returns {Promise<Controller>}
	 */
	static async construct(...args) {
		Controller.#locked = false;
		const self = new Controller(...args);
		Controller.#locked = true;

		if (self.#usePreload) await window.load(self.#preload());
		await self.#run();

		return self;
	}
	constructor() {
		if (Controller.#locked) throw new TypeError(`Illegal constructor`);
	}
	//#endregion
	//#region Logic
	/** @type {boolean} */
	#usePreload = true;
	/**
	 * @returns {Promise<void>}
	 */
	async #preload() {
		// Your preload logic goes here
	}
	/**
	 * @returns {Promise<void>}
	 */
	async #run() {
		// Your run logic goes here
	}
	//#endregion
}

await window.assert(Controller.construct);
//#endregion
