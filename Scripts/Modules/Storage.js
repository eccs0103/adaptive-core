"use strict";

import { } from "./Extensions.js";

//#region Archive
/**
 * Generic class for managing data stored in the browser's local storage.
 * @template T The type of data to be stored.
 */
class Archive {
	/**
	 * Creates an instance of the Archive class.
	 * @param {string} key The key to identify the data in local storage.
	 * @param {T} initial The initial value of the data if not already stored.
	 */
	constructor(key, initial) {
		this.#key = key;
		if (localStorage.getItem(this.#key) === null) {
			this.data = initial;
		}
	}
	/** @type {string} */ #key;
	/**
	 * Gets the stored data from local storage.
	 * @returns {T}
	 */
	get data() {
		const item = localStorage.getItem(this.#key) ?? (() => {
			throw new ReferenceError(`Key '${this.#key}' isn't defined`);
		})();
		return (/** @type {T} */ (JSON.parse(item)));
	}
	/**
	 * Sets the data to be stored in local storage.
	 * @param {T} value The data to be stored.
	 */
	set data(value) {
		localStorage.setItem(this.#key, JSON.stringify(value, undefined, `\t`));
	}
	/**
	 * Applies an action to modify the stored data.
	 * @param {(value: T) => T} action The function that modifies the current data.
	 */
	change(action) {
		this.data = action(this.data);
	}
}
//#endregion
//#region Archive manager
/**
 * Manages the lifecycle of an archive.
 * @template {Function & { new(...args: any): any }} T
 */
class ArchiveManager {
	/**
	 * Creates an instance of the ArchiveManager class.
	 * @param {string} path The path to the archive in local storage.
	 * @param {T} prototype The prototype of the archive.
	 * @param {any[]} args The arguments to initialize the archive.
	 */
	constructor(path, prototype, ...args) {
		this.#assembler = Reflect.construct.bind(Reflect.construct, prototype, args);
		const archive = new Archive(path, this.#assembler().export());

		const data = prototype.import(archive.data, `archive data`);
		if (!(data instanceof prototype)) {
			throw new TypeError(`Imported data ${(data)} type does not match ${(prototype)}`);
		}
		this.#data = (/** @type {InstanceType<T>} */ (data));
		window.addEventListener(`beforeunload`, (event) => {
			archive.data = this.#data.export();
		});
	}
	/** @type {() => InstanceType<T>} */
	#assembler;
	/** @type {InstanceType<T>} */
	#data;
	/**
	 * Gets the current data from the archive.
	 * @returns {InstanceType<T>} The current data.
	 */
	get data() {
		return this.#data;
	}
	/**
	 * Reassembles the archive.
	 * @returns {InstanceType<T>} The reassembled data.
	 */
	reassemble() {
		this.#data = this.#assembler();
		return this.data;
	}
}
//#endregion

//#region Store
/**
 * Represents a client-side storage using IndexedDB.
 */
class Store {
	/**
	 * Creates a new instance of the Store class.
	 * @param {string} database The name of the IndexedDB database.
	 * @param {string} store The name of the object store within the database.
	 */
	constructor(database, store) {
		this.#store = store;
		const promiseOpenDatabase = this.#createOpenDatabasePromise(database);
		this.#promiseGetStore = Promise.fulfill(async () => {
			const database = await promiseOpenDatabase;
			const transaction = database.transaction([this.#store], `readwrite`);
			return transaction.objectStore(this.#store);
		});
		// requestDatabaseOpen.addEventListener(`upgradeneeded`, (event) => {
		// 	const database = requestDatabaseOpen.result;
		// 	if (!database.objectStoreNames.contains(this.#store)) {
		// 		database.createObjectStore(this.#store);
		// 	}
		// });
	}
	/** @type {string} */ #store;
	/**
	 * @param {string} name 
	 * @returns {Promise<IDBDatabase>}
	 */
	#createOpenDatabasePromise(name) {
		const request = indexedDB.open(name);
		const controller = new AbortController();
		/** @type {Promise<IDBDatabase>} */ const promise = new Promise((resolve, reject) => {
			request.addEventListener(`success`, (event) => {
				resolve(request.result);
			}, { signal: controller.signal });
			request.addEventListener(`error`, (event) => {
				reject(request.error);
			}, { signal: controller.signal });
		});
		promise.finally(() => {
			controller.abort();
		});
		return promise;
	}
	/** @type {Promise<IDBObjectStore>} */ #promiseGetStore;
	/**
	 * Retrieves the value associated with the specified key from the store.
	 * @param {string} key The key to retrieve the value for.
	 * @returns {Promise<any>} A promise resolving to the value associated with the key.
	 */
	async get(key) {
		// const database = await this.#promiseOpenDatabase;
		// const transaction = database.transaction([this.#store], `readwrite`);
		// const store = transaction.objectStore(this.#store);
		const store = await this.#promiseGetStore;
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
	 * Sets the value associated with the specified key in the store.
	 * @param {string} key The key to set the value for.
	 * @param {any} value The value to set.
	 * @returns {Promise<void>} A promise indicating the completion of the set operation.
	 */
	async set(key, value) {
		// const database = await this.#promiseOpenDatabase;
		// const transaction = database.transaction([this.#store], `readwrite`);
		// const store = transaction.objectStore(this.#store);
		const store = await this.#promiseGetStore;
		const requestPutValue = store.put(value, key);
		const controller = new AbortController();
		try {
			return await new Promise((resolve, reject) => {
				requestPutValue.addEventListener(`success`, () => resolve(), { signal: controller.signal });
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
 * Represents a locker that extends the Store class for storing a single value under a specific key.
 * @template T The type of value to be stored.
 */
class Locker extends Store {
	/**
	 * Creates a new instance of the Locker class.
	 * @param {string} database The name of the IndexedDB database.
	 * @param {string} store The name of the object store within the database.
	 * @param {string} key The key under which the value will be stored.
	 */
	constructor(database, store, key) {
		super(database, store);
		this.#key = key;
	}
	/** @type {string} */ #key;
	/**
	 * Retrieves the value stored under the specified key in the locker.
	 * @returns {Promise<T>} A promise resolving to the stored value.
	 */
	async get() {
		return await super.get(this.#key);
	}
	/**
	 * Sets the value to be stored under the specified key in the locker.
	 * @param {T} value The value to be stored.
	 * @returns {Promise<void>} A promise indicating the completion of the set operation.
	 */
	// @ts-ignore
	async set(value) {
		await super.set(this.#key, value);
	}
}
//#endregion

export { Archive, ArchiveManager, Store, Locker };