"use strict";

/**
* @template Notation
*/
class Database {
	static #locked = true;
	/**
	 * @template Notation
	 * @param {String} path 
	 */
	static async construct(path) {
		Database.#locked = false;
		/** @type {Database<Notation>} */ const instance = new Database();
		Database.#locked = true;
		//
		instance.#store = await (/** @type {Promise<IDBObjectStore>} */ (new Promise((resolve, reject) => {
			const request = indexedDB.open(`database`, 1);
			request.addEventListener(`upgradeneeded`, (event) => {
				instance.#store = request.result.createObjectStore(path);
			});
			request.addEventListener(`success`, (event) => {
				const transaction = request.result.transaction(path, `readwrite`);
				resolve(transaction.objectStore(path));
			});
			request.addEventListener(`error`, (event) => {
				reject(request.error);
			});
		})));
		//
		return instance;
	}
	constructor() {
		if (Database.#locked) {
			throw new TypeError(`Illegal constructor`);
		}
	}
	/** @type {IDBObjectStore} */ #store;
	/**
	 * @param {String} key 
	 * @returns {Promise<Notation>} 
	 */
	async get(key) {
		/** @type {IDBRequest<Notation>} */ const request = this.#store.get(key);
		return new Promise((resolve, reject) => {
			request.addEventListener(`success`, (event) => {
				resolve(request.result);
			});
			request.addEventListener(`error`, (event) => {
				reject(request.error);
			});
		});
	}
	/**
	 * @param {String} key 
	 * @param {Notation} value 
	 * @returns {Promise<void>} 
	 */
	async set(key, value) {
		/** @type {IDBRequest<IDBValidKey>} */ const request = this.#store.put(value, key);
		return new Promise((resolve, reject) => {
			request.addEventListener(`success`, (event) => {
				resolve();
			});
			request.addEventListener(`error`, (event) => {
				reject(request.error);
			});
		});
	}
	/**
	 * @param {String} key 
	 * @param {(value: Notation) => Notation} action 
	 */
	async change(key, action) {
		return this.set(key, action(await this.get(key)));
	}
}