// @ts-ignore
/** @typedef {import("./archive.js")} */
// @ts-ignore
/** @typedef {import("./console.js")} */
// @ts-ignore
/** @typedef {import("./window.js")} */
// @ts-ignore
/** @typedef {import("./informant.js")} */

"use strict";

class Manager {
	/**
	 * @param {String} developer 
	 * @param {String} title 
	 */
	constructor(developer, title) {
		this.#developer = developer;
		this.#title = title;
	}
	/** @type {String} */ #developer = ``;
	// /** @readonly */ get developer() {
	// 	return this.#developer;
	// }
	/** @type {String} */ #title = ``;
	// /** @readonly */ get title() {
	// 	return this.#title;
	// }
	/**
	 * @template Notation
	 * @param {String} name 
	 * @param {Notation} [initial] 
	 */
	setArchive(name, initial) {
		return new Archive(`${this.#developer}.${this.#title}.${name}`, initial);
	}
	/** @readonly */ get console() {
		const console = document.querySelector(`dialog.console`);
		if (!(console instanceof ACConsoleElement)) {
			throw new TypeError(`Invalid element: ${console}`);
		}
		return console;
	}
	/** @readonly */ get loader() {
		const loader = document.querySelector(`dialog.loader`);
		if (!(loader instanceof ACWindowElement)) {
			throw new TypeError(`Invalid element: ${loader}`);
		}
		return loader;
	}
	/** @readonly */ get informant() {
		const informant = document.querySelector(`dialog.informant`);
		if (!(informant instanceof ACInformantElement)) {
			throw new TypeError(`Invalid element: ${informant}`);
		}
		return informant;
	}
	getSearch() {
		return new Map(window.decodeURI(location.search.replace(/^\??/, ``)).split(`&`).filter(item => item).map((item) => {
			const [key, value] = item.split(`=`);
			return [key, value];
		}));
	}
	/**
	 * @param {File} file 
	 */
	download(file) {
		const aLink = document.createElement(`a`);
		aLink.download = file.name;
		aLink.href = URL.createObjectURL(file);
		aLink.click();
		URL.revokeObjectURL(aLink.href);
		aLink.remove();
	}
	/**
	 * @param {any} error 
	 */
	analysis(error) {
		return error instanceof Error ? error.stack ?? `${error.name}: ${error.message}` : `Invalid error type.`;
	}
	#locked = true;
	/**
	 * @param {any} error 
	 */
	prevent(error) {
		const message = this.analysis(error);
		if (this.#locked) {
			try {
				this.informant.alert(message, MessageTypes.error);
			} finally {
				window.alert(message);
			}
			location.reload();
		} else {
			console.error(message);
		};
	}
}
