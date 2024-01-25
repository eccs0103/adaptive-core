"use strict";

//#region Archive
/**
 * @template T 
 */
class Archive {
	/**
	 * @param {string} key 
	 * @param {T} initial
	 */
	constructor(key, initial) {
		this.#key = key;
		if (localStorage.getItem(this.#key) === null) {
			this.data = initial;
		}
	}
	/** @type {string} */ #key;
	get data() {
		const item = localStorage.getItem(this.#key) ?? (() => {
			throw new ReferenceError(`Key '${this.#key}' isn't defined`);
		})();
		return (/** @type {T} */ (JSON.parse(item)));
	}
	set data(value) {
		localStorage.setItem(this.#key, JSON.stringify(value, undefined, `\t`));
	}
	/**
	 * @param {(value: T) => T} action 
	 */
	change(action) {
		this.data = action(this.data);
	}
}
//#endregion
//#region Notation progenitor
/**
 * @abstract
 */
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
	 * @param {string} path 
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

//#region Store
class Store {
	/**
	 * @param {string} database 
	 * @param {string} store
	 */
	constructor(database, store) {
		let requestDatabaseOpen = indexedDB.open(database);
		this.#store = store;
		const controller = new AbortController();
		this.#promiseDatabaseOpen = new Promise((resolve, reject) => {
			requestDatabaseOpen.addEventListener(`success`, (event) => resolve(requestDatabaseOpen.result), { signal: controller.signal });
			requestDatabaseOpen.addEventListener(`error`, (event) => reject(requestDatabaseOpen.error), { signal: controller.signal });
		});
		requestDatabaseOpen.addEventListener(`upgradeneeded`, (event) => {
			const database = requestDatabaseOpen.result;
			console.log(...database.objectStoreNames);
			if (!database.objectStoreNames.contains(this.#store)) {
				database.createObjectStore(this.#store);
			}
		});
		this.#promiseDatabaseOpen.finally(() => {
			controller.abort();
		});
	}
	/** @type {string} */ #store;
	/** @type {Promise<IDBDatabase>} */ #promiseDatabaseOpen;
	/**
	 * @param {string} key 
	 * @returns {Promise<any>}
	 */
	async get(key) {
		const database = await this.#promiseDatabaseOpen;
		const transaction = database.transaction([this.#store], `readwrite`);
		const store = transaction.objectStore(this.#store);
		const requestGetValue = store.get(key);
		const controller = new AbortController();
		try {
			return await new Promise((resolve, reject) => {
				requestGetValue.addEventListener(`success`, () => resolve(requestGetValue.result), { signal: controller.signal });
				requestGetValue.addEventListener(`error`, () => reject(requestGetValue.error), { signal: controller.signal });
			});
		} finally {
			controller.abort();
		}
	}
	/**
	 * @param {string} key 
	 * @param {any} value
	 */
	async set(key, value) {
		const database = await this.#promiseDatabaseOpen;
		const transaction = database.transaction([this.#store], `readwrite`);
		const store = transaction.objectStore(this.#store);
		const requestPutValue = store.put(value, key);
		const controller = new AbortController();
		try {
			return await new Promise((resolve, reject) => {
				requestPutValue.addEventListener(`success`, () => resolve(requestPutValue.result), { signal: controller.signal });
				requestPutValue.addEventListener(`error`, () => reject(requestPutValue.error), { signal: controller.signal });
			});
		} finally {
			controller.abort();
		}
	}
}
//#endregion
//#region Locker
/**
 * @template T
 */
class Locker extends Store {
	/**
	 * @param {string} database 
	 * @param {string} store 
	 * @param {string} key 
	 */
	constructor(database, store, key) {
		super(database, store);
		this.#key = key;
	}
	/** @type {string} */ #key;
	/**
	 * @returns {Promise<T>}
	 */
	async get() {
		return await super.get(this.#key);
	}
	/**
	 * @param {T} value 
	 */
	// @ts-ignore
	async set(value) {
		await super.set(this.#key, value);
	}
}
//#endregion

export { Archive, NotationProgenitor, NotationContainer, Store, Locker };