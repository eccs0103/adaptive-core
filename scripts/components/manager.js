// @ts-ignore
/** @typedef {import("./informant.js")} */
// @ts-ignore
/** @typedef {import("./panel.js")} */

"use strict";

class Manager extends Informant {
	constructor() {
		super();
		
		const panelLoader = document.querySelector(`ac-panel.loader`);
		if (!(panelLoader instanceof ACPanelElement)) {
			throw new TypeError(`Invalid element: ${panelLoader}`);
		}
		this.#panelLoader = panelLoader;
	}
	/** @type {ACPanelElement} */ #panelLoader;

	/**
	 * @param {Promise<unknown>} task 
	 */
	async load(task) {
		this.#panelLoader.open();
		await task;
		await this.#panelLoader.close();
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
	async prevent(error) {
		const message = this.analysis(error);
		if (this.#locked) {
			await this.alert(message, `Error`);
			location.reload();
		} else {
			console.error(message);
		};
	}
}
