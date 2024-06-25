"use strict";

import { } from "../scripts/structure.js";

//#region Controller
/**
 * Represents the controller for the application.
 */
class Controller {
	/**
	 * Performs initial setup and loads necessary resources before the main logic.
	 * @returns {Promise<void>}
	 */
	async awake() {
		// Your code before loading goes here
	}
	/**
	 * Contains the main logic for the application.
	 * @returns {Promise<void>}
	 */
	async main() {
		// Your code within loading goes here
	}
};
const controller = new Controller();
await window.ensure(() => controller.awake());
await window.load(window.ensure(() => controller.main()));
//#endregion
