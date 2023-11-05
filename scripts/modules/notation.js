"use strict";

import {
	Archive
} from "./archive.js";

//#region Notation progenitor
class NotationProgenitor {
	/**
	 * @param {any} source 
	 * @returns {NotationProgenitor}
	 */
	static import(source) {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * @param {NotationProgenitor} source 
	 * @returns {any}
	 */
	static export(source) {
		throw new ReferenceError(`Not implemented function`);
	}
}
//#endregion
//#region Notation container
/**
 * @template {typeof NotationProgenitor} T
 */
class NotationContainer {
	/**
	 * @param {T} prototype 
	 * @param {String} path 
	 */
	constructor(prototype, path) {
		this.#prototype = prototype;
		const archive = new Archive(path, prototype.export(Reflect.construct(this.#prototype, [])));
		//
		const object = prototype.import(archive.data);
		if (!(object instanceof prototype)) {
			throw new TypeError(`The return type of the import function must be the same as the prototype`);
		}
		this.#content = (/** @type {InstanceType<T>} */ (object));
		window.addEventListener(`beforeunload`, (event) => {
			archive.data = prototype.export(this.#content);
		});
	}
	/** @type {T} */ #prototype;
	/** @type {InstanceType<T>} */ #content;
	get content() {
		return this.#content;
	}
	reset() {
		this.#content = (/** @type {InstanceType<T>} */ (Reflect.construct(this.#prototype, [])));
	}
}
//#endregion

export {
	NotationProgenitor,
	NotationContainer
};
