"use strict";

import { ImplementationError } from "./extensions.mjs";

const { random, trunc } = Math;

//#region Engine
/**
 * @typedef {object} EngineEventMap
 * @property {Event} start
 * @property {Event} update
 * @property {Event} launch
 * @property {Event} change
 */

/**
 * Base class for engines.
 * @abstract
 */
class Engine extends EventTarget {
	constructor() {
		super();
		if (new.target === Engine) throw new TypeError(`Unable to create an instance of an abstract class`);
	}
	/**
	 * @template {keyof EngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: Engine, ev: EngineEventMap[K]) => any} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} options 
	 * @returns {void}
	 */
	addEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
	}
	/**
	 * @template {keyof EngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: Engine, ev: EngineEventMap[K]) => any} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} options 
	 * @returns {void}
	 */
	removeEventListener(type, listener, options = false) {
		return super.removeEventListener(type, listener, options);
	}
	/**
	 * Gets the launch status of the engine.
	 * @abstract
	 * @returns {boolean}
	 */
	get launched() {
		throw new ImplementationError();
	}
	/**
	 * Sets the launch status of the engine.
	 * @abstract
	 * @param {boolean} value
	 * @returns {void}
	 */
	set launched(value) {
		throw new ImplementationError();
	}
	/**
	 * Gets the FPS limit of the engine.
	 * @abstract
	 * @returns {number}
	 */
	get limit() {
		throw new ImplementationError();
	}
	/**
	 * Sets the FPS limit of the engine.
	 * @abstract
	 * @param {number} value
	 * @returns {void}
	 */
	set limit(value) {
		throw new ImplementationError();
	}
	/**
	 * Gets the Frames Per Second (FPS) of the engine.
	 * @abstract
	 * @returns {number}
	 */
	get FPS() {
		throw new ImplementationError();
	}
	/**
	 * Gets the time delta between frames.
	 * @abstract
	 * @readonly
	 * @returns {number}
	 */
	get delta() {
		throw new ImplementationError();
	}
}
//#endregion
//#region Fast engine
/**
 * @typedef {{ }} Extendable.FastEngineEventMap
 * 
 * @typedef {EngineEventMap & Extendable.FastEngineEventMap} FastEngineEventMap
 */

/**
 * Constructs a fast type engine.
 */
class FastEngine extends Engine {
	/**
	 * @param {boolean} launch Whether the engine should be launched initially. Default is false.
	 */
	constructor(launch = false) {
		super();

		this.addEventListener(`update`, (event) => this.dispatchEvent(new Event(`start`)), { once: true });

		let previous = 0;
		/**
		 * @param {DOMHighResTimeStamp} current 
		 * @returns {void}
		 */
		const callback = (current) => {
			const difference = current - previous;
			if (difference > this.#gap) {
				if (this.launched) {
					this.#FPS = (1000 / difference);
					this.dispatchEvent(new Event(`update`));
				} else {
					this.#FPS = 0;
				}
				previous = current;
			}
			requestAnimationFrame(callback);
		};
		requestAnimationFrame(callback);

		this.launched = launch;
	}
	/**
	 * @template {keyof FastEngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: FastEngine, ev: FastEngineEventMap[K]) => any} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} options 
	 * @returns {void}
	 */
	addEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
	}
	/**
	 * @template {keyof FastEngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: FastEngine, ev: FastEngineEventMap[K]) => any} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} options 
	 * @returns {void}
	 */
	removeEventListener(type, listener, options = false) {
		return super.removeEventListener(type, listener, options);
	}
	/** @type {boolean} */
	#launched;
	/**
	 * Gets the launch status of the engine.
	 * @returns {boolean}
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launch status of the engine.
	 * @param {boolean} value 
	 * @returns {void}
	 */
	set launched(value) {
		const previous = this.#launched;
		this.#launched = value;
		if (previous !== value) this.dispatchEvent(new Event(`change`));
		if (value) this.dispatchEvent(new Event(`launch`));
	}
	/** @type {number} */
	#gap = 0;
	/**
	 * Gets the FPS limit of the engine.
	 * @returns {number}
	 */
	get limit() {
		return 1000 / this.#gap;
	}
	/**
	 * Sets the FPS limit of the engine.
	 * @param {number} value 
	 * @returns {void}
	 */
	set limit(value) {
		if (Number.isNaN(value)) return;
		if (value <= 0) return;
		this.#gap = 1000 / value;
	}
	/** @type {number} */
	#FPS = 0;
	/**
	 * Gets the current FPS of the engine.
	 * @readonly
	 * @returns {number}
	 */
	get FPS() {
		return this.#FPS;
	}
	/**
	 * Gets the time delta between frames.
	 * @readonly
	 * @returns {number}
	 */
	get delta() {
		return 1 / this.#FPS;
	}
}
//#endregion
//#region Precise engine
/**
 * @typedef {{ }} Extendable.PreciseEngineEventMap
 * 
 * @typedef {EngineEventMap & Extendable.PreciseEngineEventMap} PreciseEngineEventMap
 */

/**
 * Constructs a precise type engine.
 */
class PreciseEngine extends Engine {
	/**
	 * @param {boolean} launch Whether the engine should be launched initially. Default is false.
	 */
	constructor(launch = false) {
		super();

		this.addEventListener(`update`, (event) => this.dispatchEvent(new Event(`start`)), { once: true });

		let previous = performance.now();
		/**
		 * @param {DOMHighResTimeStamp} current 
		 * @returns {void}
		 */
		const callback = (current) => {
			const difference = current - previous;
			if (this.launched) {
				this.#FPS = (1000 / difference);
				this.dispatchEvent(new Event(`update`));
			} else {
				this.#FPS = 0;
			}
			previous = current;
			setTimeout(callback, this.#gap, performance.now());
		};
		setTimeout(callback, this.#gap, performance.now());

		this.launched = launch;
	};
	/**
	 * @template {keyof PreciseEngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: PreciseEngine, ev: PreciseEngineEventMap[K]) => any} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} options 
	 * @returns {void}
	 */
	addEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
	}
	/**
	 * @template {keyof PreciseEngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: PreciseEngine, ev: PreciseEngineEventMap[K]) => any} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} options 
	 * @returns {void}
	 */
	removeEventListener(type, listener, options = false) {
		return super.removeEventListener(type, listener, options);
	}
	/** @type {boolean} */
	#launched;
	/**
	 * Gets the launch status of the engine.
	 * @returns {boolean}
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launch status of the engine.
	 * @param {boolean} value 
	 * @returns {void}
	 */
	set launched(value) {
		const previous = this.#launched;
		this.#launched = value;
		if (previous !== value) this.dispatchEvent(new Event(`change`));
		if (value) this.dispatchEvent(new Event(`launch`));
	}
	/** @type {number} */
	#gap = 0;
	/**
	 * Gets the FPS limit of the engine.
	 * @returns {number}
	 */
	get limit() {
		return 1000 / this.#gap;
	}
	/**
	 * Sets the FPS limit of the engine.
	 * @param {number} value 
	 * @returns {void}
	 */
	set limit(value) {
		if (Number.isNaN(value)) return;
		if (value <= 0) return;
		this.#gap = 1000 / value;
	}
	/** @type {number} */
	#FPS = 0;
	/**
	 * Gets the current FPS of the engine.
	 * @readonly
	 * @returns {number}
	 */
	get FPS() {
		return this.#FPS;
	}
	/**
	 * Gets the time delta between frames.
	 * @readonly
	 * @returns {number}
	 */
	get delta() {
		return 1 / this.#FPS;
	}
}
//#endregion
//#region Static engine
/**
 * @typedef {{ }} Extendable.StaticEngineEventMap
 * 
 * @typedef {EngineEventMap & Extendable.StaticEngineEventMap} StaticEngineEventMap
 */

/**
 * Constructs a static type engine.
 */
class StaticEngine extends Engine {
	/**
	 * @param {boolean} launch Whether the engine should be launched initially. Default is false.
	 */
	constructor(launch = false) {
		super();

		this.addEventListener(`update`, (event) => this.dispatchEvent(new Event(`start`)), { once: true });

		let previous = 0;
		/**
		 * @param {DOMHighResTimeStamp} current 
		 * @returns {void}
		 */
		const callback = (current) => {
			const difference = current - previous;
			const factor = trunc(difference / this.#gap);
			this.#delta = difference / factor;
			for (let index = 0; index < factor; index++) {
				if (this.#focus && this.launched) this.dispatchEvent(new Event(`update`));
				previous = current;
			}
			requestAnimationFrame(callback);
		};
		requestAnimationFrame(callback);

		this.launched = launch;

		window.addEventListener(`focus`, (event) => this.#focus = true);
		window.addEventListener(`blur`, (event) => this.#focus = false);
	}
	/**
	 * @template {keyof StaticEngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: StaticEngine, ev: StaticEngineEventMap[K]) => any} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} options 
	 * @returns {void}
	 */
	addEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
	}
	/**
	 * @template {keyof StaticEngineEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: StaticEngine, ev: StaticEngineEventMap[K]) => any} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} options 
	 * @returns {void}
	 */
	removeEventListener(type, listener, options = false) {
		return super.removeEventListener(type, listener, options);
	}
	/** @type {boolean} */
	#launched;
	/**
	 * Gets the launch status of the engine.
	 * @returns {boolean}
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launch status of the engine.
	 * @param {boolean} value 
	 * @returns {void}
	 */
	set launched(value) {
		const previous = this.#launched;
		this.#launched = value;
		if (previous !== value) this.dispatchEvent(new Event(`change`));
		if (value) this.dispatchEvent(new Event(`launch`));
	}
	/** @type {number} */
	#gap = 1000 / 120;
	/**
	 * Gets the FPS limit of the engine.
	 * @returns {number}
	 */
	get limit() {
		return 1000 / this.#gap;
	}
	/**
	 * Sets the FPS limit of the engine.
	 * @param {number} value 
	 * @returns {void}
	 */
	set limit(value) {
		if (Number.isNaN(value)) return;
		if (value <= 0) return;
		this.#gap = 1000 / value;
		this.#delta = this.#gap;
	}
	/**
	 * Gets the current FPS of the engine.
	 * @readonly
	 * @returns {number}
	 */
	get FPS() {
		return 1000 / this.#delta;
		// return 1000 / this.#gap;
	}
	/** @type {number} */
	#delta = this.#gap;
	/**
	 * Gets the time delta between frames.
	 * @readonly
	 * @returns {number}
	 */
	get delta() {
		return this.#delta / 1000;
		// return this.#gap / 1000;
	}
	/** @type {boolean} */
	#focus = document.hasFocus();
}
//#endregion

//#region Random
/**
 * Random values generator.
 */
class Random {
	/** @type {Random} */
	static #global = new Random();
	/**
	 * The global instance.
	 * @readonly
	 * @returns {Random}
	 */
	static get global() {
		return Random.#global;
	}
	/**
	 * Generates a random boolean value.
	 * @param {number} factor Probability for `true` (0 to 1, default is 0.5).
	 * @returns {boolean} Random boolean value.
	 * @throws {TypeError} If factor is not finite.
	 * @throws {RangeError} If factor is out of range.
	 */
	boolean(factor = 0.5) {
		if (!Number.isFinite(factor)) throw new TypeError(`The factor ${factor} must be a finite number`);
		if (0 > factor || factor > 1) throw new RangeError(`The factor ${factor} is out of range [0 - 1]`);
		return random() < factor;
	}
	/**
	 * Returns a random number in range [min - max).
	 * @param {number} min The minimum value.
	 * @param {number} max The maximum value.
	 * @returns {number} A random number.
	 */
	number(min, max) {
		return random() * (max - min) + min;
	}
	/**
	 * Returns a random integer in range [min - max).
	 * @param {number} min The minimum value.
	 * @param {number} max The maximum value.
	 * @returns {number} A random integer.
	 */
	integer(min, max) {
		return trunc(this.number(min, max));
	}
	/**
	 * Returns a random element from an array.
	 * @template T
	 * @param {Readonly<T[]>} array The array of elements.
	 * @returns {T} A random element.
	 * @throws {Error} If the array is empty.
	 */
	item(array) {
		if (1 > array.length) throw new Error(`Array must have at least 1 item`);
		return array[this.integer(0, array.length)];
	}
	/**
	 * Generates a sequence of random numbers from min to max (exclusive).
	 * @param {number} min The minimum value.
	 * @param {number} max The maximum value.
	 * @returns {number[]} An array of random numbers.
	 */
	sequence(min, max) {
		const result = Array.sequence(min, max);
		this.shuffle(result);
		return result;
	};
	/**
	 * Returns a random subarray of elements from an array.
	 * @template T
	 * @param {Readonly<T[]>} array The array of elements.
	 * @param {number} count The number of elements to select.
	 * @returns {T[]} A random subarray of elements.
	 * @throws {TypeError} If count is not a finite integer.
	 * @throws {RangeError} If count is less than 0 or greater than array length.
	 */
	subarray(array, count = 1) {
		if (!Number.isInteger(count)) throw new TypeError(`The count ${count} must be a finite integer number`);
		if (0 > count || count > array.length) throw new RangeError(`The count ${count} is out of range [0 - ${array.length}]`);
		const clone = Array.from(array);
		const result = [];
		for (let index = 0; index < count; index++) {
			result.push(...clone.splice(this.integer(0, clone.length), 1));
		}
		return result;
	}
	/**
	 * Shuffles the elements of an array in place using the Fisher-Yates algorithm.
	 * @template T
	 * @param {T[]} array The array to shuffle.
	 * @returns {void}
	 */
	shuffle(array) {
		for (let index = 0; index < array.length - 1; index++) {
			const pair = this.integer(index, array.length);
			if (pair === index) continue;
			array.swap(index, pair);
		}
	}
	/**
	 * Selects a random element from a list according to their weights.
	 * @template T
	 * @param {Readonly<Map<T, number>>} cases The map with elements and their weights.
	 * @returns {T} A random element.
	 * @throws {RangeError} If the map is empty.
	 */
	case(cases) {
		if (1 > cases.size) throw new RangeError(`The cases must have at least 1 item`);
		const summary = Array.from(cases).reduce((previous, [, weight]) => previous + weight, 0);
		const random = this.number(0, summary);
		let begin = 0;
		for (const [item, weight] of cases) {
			const end = begin + weight;
			if (begin <= random && random < end) {
				return item;
			}
			begin = end;
		}
		throw new Error(`Unable to select element with value ${random}`);
	};
	/**
	 * Generates a random GUID identifier.
	 * @returns {string} A random GUID identifier.
	 */
	GUID() {
		return crypto.randomUUID();
	}
}
//#endregion

//#region Socket package
/**
 * @typedef {object} SocketPackageNotation
 * @property {string} type
 * @property {boolean} rejected
 * @property {object} details
 */

/**
 * Represents a structured data package for communication over sockets.
 */
class SocketPackage {
	/**
	 * Imports a SocketPackage from a given source object.
	 * @param {any} source The object to import as a SocketPackage.
	 * @param {string} name An optional name for the source, used in error messages.
	 * @returns {SocketPackage} A new instance of SocketPackage.
	 * @throws {TypeError} If the source cannot be imported as a SocketPackage.
	 */
	static import(source, name = `source`) {
		try {
			const shell = Object.import(source);
			const type = String.import(Reflect.get(shell, `type`), `property type`);
			const rejected = Boolean.import(Reflect.get(shell, `rejected`), `property rejected`);
			const details = Reflect.get(shell, `details`);
			return new SocketPackage(type, details, rejected);
		} catch (error) {
			throw new TypeError(`Unable to import ${(name)} due its ${typename(source)} type`, { cause: error });
		}
	}
	/**
	 * Exports the current SocketPackage instance as a plain object.
	 * @returns {SocketPackageNotation} The exported package notation.
	 */
	export() {
		return {
			type: this.#type.export(),
			rejected: this.#rejected.export(),
			details: this.#details
		};
	}
	/**
	 * @param {string} type The type of the package.
	 * @param {object} details The details or payload of the package.
	 * @param {boolean} rejected Whether the package is rejected.
	 */
	constructor(type, details = null, rejected = false) {
		this.#type = type;
		this.#details = details;
		this.#rejected = rejected;
	}
	/** @type {string} */
	#type;
	/**
	 * Gets the type of the package.
	 * @readonly
	 * @returns {string}
	 */
	get type() {
		return this.#type;
	}
	/** @type {boolean} */
	#rejected;
	/**
	 * Gets the rejection status of the package.
	 * @readonly
	 * @returns {boolean}
	 */
	get rejected() {
		return this.#rejected;
	}
	/** @type {object} */
	#details;
	/**
	 * Gets the details of the package.
	 * @readonly
	 * @returns {object}
	 */
	get details() {
		return this.#details;
	}
}
//#endregion
//#region Socket manager
/**
 * @typedef {object} SocketManagerEventMap
 * @property {Event} connect
 * @property {Event} disconnect
 */

/**
 * Manages WebSocket connections and provides methods for sending and receiving messages.
 * This class extends the `EventTarget` API to handle connection events.
 */
class SocketManager extends EventTarget {
	/**
	 * @param {string | URL} url The URL for the WebSocket connection.
	 */
	constructor(url) {
		super();

		this.#url = url;
		this.#connect(0);
	}
	/**
	 * @template {keyof SocketManagerEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: SocketManager, ev: SocketManagerEventMap[K]) => any} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | AddEventListenerOptions} options 
	 * @returns {void}
	 */
	addEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
	}
	/**
	 * @template {keyof SocketManagerEventMap} K
	 * @overload
	 * @param {K} type 
	 * @param {(this: SocketManager, ev: SocketManagerEventMap[K]) => any} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} [options] 
	 * @returns {void}
	 */
	/**
	 * @param {string} type 
	 * @param {EventListenerOrEventListenerObject} listener 
	 * @param {boolean | EventListenerOptions} options 
	 * @returns {void}
	 */
	removeEventListener(type, listener, options = false) {
		return super.removeEventListener(type, listener, options);
	}
	/** @type {string | URL} */
	#url;
	/** @type {WebSocket?} */
	#socket = null;
	/**
	 * @param {number} attempt 
	 * @returns {Promise<void>}
	 */
	async #connect(attempt) {
		try {
			const socket = this.#socket = new WebSocket(this.#url);
			await Promise.withSignal((signal, resolve, reject) => {
				socket.addEventListener(`open`, (event) => resolve(undefined), { signal });
				socket.addEventListener(`error`, (event) => reject(event["error"]), { signal });
				socket.addEventListener(`close`, (event) => reject(event.reason), { signal });
			});
			this.dispatchEvent(new Event(`connect`));
		} catch (reason) {
			await this.#connect(attempt + 1);
		}
		this.#observe();
	}
	/**
	 * @returns {Promise<void>}
	 */
	async #observe() {
		const socket = this.#socket;
		if (socket === null) return;
		await Promise.withSignal((signal, resolve) => {
			socket.addEventListener(`error`, (event) => resolve(event["error"]), { signal });
			socket.addEventListener(`close`, (event) => resolve(event.reason), { signal });
		});
		this.dispatchEvent(new Event(`disconnect`));
		this.#connect(0);
	}
	/**
	 * Sends a message to the server and waits for a response.
	 * @param {string} type The type of the message.
	 * @param {object} details The payload of the message.
	 * @returns {Promise<object>} Resolves with the response details.
	 * @throws {Error} If the socket is not connected or an error occurs.
	 */
	async send(type, details = null) {
		const socket = this.#socket;
		if (socket === null || socket.readyState !== WebSocket.OPEN) throw new Error(`Socket is not connected.`);
		const promiseResponse = Promise.withSignal((signal, resolve, reject) => {
			socket.addEventListener(`message`, ({ data }) => {
				const response = SocketPackage.import(JSON.parse(data));
				if (response.type !== type) return;
				if (response.rejected) reject(response.details);
				resolve(response.details);
			}, { signal });
		});
		socket.send(JSON.stringify(new SocketPackage(type, details).export()));
		return await promiseResponse;
	}
}
//#endregion

export { Engine, FastEngine, PreciseEngine, StaticEngine, Random, SocketManager };
