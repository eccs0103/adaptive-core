"use strict";

/**
 * @template Notation 
 */
class Archive {
	/**
	 * @param {String} key 
	 * @param {Notation} [initial] 
	 */
	constructor(key, initial) {
		this.#key = key;
		if (initial !== undefined) {
			this.data = initial;
		}
	}
	/** @type {String} */ #key;
	get #item() {
		let item = localStorage.getItem(this.#key);
		if (item === null) {
			item = ``;
			localStorage.setItem(this.#key, item);
		}
		return item;
	}
	set #item(value) {
		localStorage.setItem(this.#key, value);
	}
	get data() {
		return (/** @type {Notation} */ (JSON.parse(this.#item)));
	}
	set data(value) {
		this.#item = JSON.stringify(value, undefined, `\t`);
	}
	/**
	 * @param {(value: Notation) => Notation} action 
	 */
	change(action) {
		this.data = action(this.data);
	}
}