"use strict";

//#region Engine
/**
 * @typedef VirtualEngineEventMap
 * @property {Event} start
 * @property {Event} update
 * @property {Event} launch
 * @property {Event} change
 * 
 * @typedef {EventListener & VirtualEngineEventMap} EngineEventMap
 */

/**
 * Base class for engines.
 * @abstract
 */
class Engine extends EventTarget {
	/**
	 * Gets the launch status of the engine.
	 * @abstract
	 * @returns {boolean}
	 */
	get launched() {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Sets the launch status of the engine.
	 * @abstract
	 * @param {boolean} value
	 * @returns {void}
	 */
	set launched(value) {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Gets the FPS limit of the engine.
	 * @abstract
	 * @returns {number}
	 */
	get limit() {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Sets the FPS limit of the engine.
	 * @abstract
	 * @param {number} value
	 * @returns {void}
	 */
	set limit(value) {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Gets the Frames Per Second (FPS) of the engine.
	 * @abstract
	 * @returns {number}
	 */
	get FPS() {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Gets the time delta between frames.
	 * @abstract
	 * @readonly
	 * @returns {number}
	 */
	get delta() {
		throw new ReferenceError(`Not implemented function`);
	}
}
//#endregion
//#region Fast engine
/**
 * @typedef {{}} VirtualFastEngineEventMap
 * 
 * @typedef {EngineEventMap & VirtualFastEngineEventMap} FastEngineEventMap
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

		const controller = new AbortController();
		this.addEventListener(`update`, (event) => {
			this.dispatchEvent(new Event(`start`));
			controller.abort();
		}, { signal: controller.signal });

		let previous = 0;
		const callback = (/** @type {number} */ current) => {
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
	 * @param {K} type
	 * @param {(this: FastEngine, ev: FastEngineEventMap[K]) => any} listener
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	 */
	addEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
	}
	/**
	 * @template {keyof FastEngineEventMap} K
	 * @param {K} type
	 * @param {(this: FastEngine, ev: FastEngineEventMap[K]) => any} listener
	 * @param {boolean | EventListenerOptions} options
	 * @returns {void}
	 */
	removeEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
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
		if (this.#launched !== value) {
			this.dispatchEvent(new Event(`change`));
		}
		this.#launched = value;
		if (this.#launched) {
			this.dispatchEvent(new Event(`launch`));
		}
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
	 * @throws {RangeError} If the FPS limit is not higher than 0.
	 */
	set limit(value) {
		if (value <= 0) {
			throw new RangeError(`FPS limit must be higher than 0`);
		}
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
 * @typedef {{}} VirtualPreciseEngineEventMap
 * 
 * @typedef {EngineEventMap & VirtualPreciseEngineEventMap} PreciseEngineEventMap
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

		const controller = new AbortController();
		this.addEventListener(`update`, (event) => {
			this.dispatchEvent(new Event(`start`));
			controller.abort();
		}, { signal: controller.signal });

		let previous = performance.now();
		const callback = (/** @type {number} */ current) => {
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
	 * @param {K} type
	 * @param {(this: PreciseEngine, ev: PreciseEngineEventMap[K]) => any} listener
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	 */
	addEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
	}
	/**
	 * @template {keyof PreciseEngineEventMap} K
	 * @param {K} type
	 * @param {(this: PreciseEngine, ev: PreciseEngineEventMap[K]) => any} listener
	 * @param {boolean | EventListenerOptions} options
	 * @returns {void}
	 */
	removeEventListener(type, listener, options = false) {
		return super.addEventListener(type, listener, options);
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
		if (this.#launched !== value) {
			this.dispatchEvent(new Event(`change`));
		}
		this.#launched = value;
		if (this.#launched) {
			this.dispatchEvent(new Event(`launch`));
		}
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
	 * @throws {RangeError} If the FPS limit is not higher than 0.
	 */
	set limit(value) {
		if (value <= 0) {
			throw new RangeError(`FPS limit must be higher than 0`);
		}
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

export { Engine, FastEngine, PreciseEngine };