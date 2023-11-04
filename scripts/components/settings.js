// @ts-ignore
/** @typedef {import("./archive.js")} */

"use strict";

class SettingsProgenitor {
	/**
	 * @param {any} source 
	 * @returns {SettingsProgenitor}
	 */
	static import(source) {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * @param {SettingsProgenitor} source 
	 * @returns {any}
	 */
	static export(source) {
		throw new ReferenceError(`Not implemented function`);
	}
}

/**
 * @template {typeof SettingsProgenitor} T
 */
class SettingsContainer {
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
