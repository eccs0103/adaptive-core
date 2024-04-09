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
					this.#time += difference;
					this.#FPS = (1000 / difference);
					this.dispatchEvent(new Event(`update`));
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
	/** @type {DOMHighResTimeStamp} */
	#time = 0;
	/**
	 * Gets the elapsed time since the engine started.
	 * @readonly
	 * @returns {DOMHighResTimeStamp}
	 */
	get time() {
		return this.#time;
	}
	/** @type {boolean} */
	#launched = false;
	/**
	 * Gets the launch status of the engine.
	 * @returns {boolean}
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launch status of the engine.
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
	 */
	get FPSLimit() {
		return 1000 / this.#gap;
	}
	/**
	 * Sets the FPS limit of the engine.
	 * @throws {RangeError} If the FPS limit is not higher than 0.
	 */
	set FPSLimit(value) {
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
	 */
	get FPS() {
		return this.#FPS;
	}
	/**
	 * Gets the time delta between frames.
	 * @readonly
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

		const callback = () => {
			if (this.launched) {
				this.dispatchEvent(new Event(`update`));
			}
			setTimeout(callback, this.#delta);
		};
		setTimeout(callback, this.#delta);

		this.launched = launch;
	}
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
	#launched = false;
	/**
	 * Gets the launch status of the engine.
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launch status of the engine.
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
	#delta = (1000 / 60);
	/**
	 * Gets the FPS of the engine.
	 */
	get FPS() {
		return (1000 / this.#delta);
	}
	/**
	 * Sets the FPS of the engine.
	 * @throws {RangeError} If the FPS is not higher than 0.
	 */
	set FPS(value) {
		if (value <= 0) {
			throw new RangeError(`FPS must be higher than 0`);
		}
		this.#delta = (1000 / value);
	}
	/**
	 * Gets the time delta between frames.
	 * @readonly
	 */
	get delta() {
		return this.#delta * 1000;
	}
}
//#endregion

export { Engine, FastEngine, PreciseEngine };