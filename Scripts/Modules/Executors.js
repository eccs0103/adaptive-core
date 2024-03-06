"use strict";

//#region Engine
/**
 * @abstract
 * @classdesc Base class for engines.
 * @extends {EventTarget}
 */
class Engine extends EventTarget {
	/**
	 * Gets the launch status of the engine.
	 * @abstract
	 * @returns {boolean} True if the engine is launched, false otherwise.
	 */
	get launched() {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Sets the launch status of the engine.
	 * @abstract
	 * @param {boolean} value The launch status to set.
	 */
	set launched(value) {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Gets the Frames Per Second (FPS) of the engine.
	 * @abstract
	 * @returns {number} The current FPS of the engine.
	 */
	get FPS() {
		throw new ReferenceError(`Not implemented function`);
	}
	/**
	 * Gets the time delta between frames.
	 * @readonly
	 * @abstract
	 * @returns {number} The time delta between frames.
	 */
	get delta() {
		throw new ReferenceError(`Not implemented function`);
	}
}
//#endregion
//#region Fast engine
class FastEngine extends Engine {
	/**
	 * Constructs a FastEngine instance.
	 * @param {boolean} launch Whether the engine should be launched initially. Default is false.
	 */
	constructor(launch = false) {
		super();
		let previous = 0;
		const controller = new AbortController();
		this.addEventListener(`update`, (event) => {
			if (this.time !== 0) {
				this.dispatchEvent(new Event(`start`));
				controller.abort();
			}
		}, { signal: controller.signal });
		/**
		 * Handles the animation frame callback.
		 * @param {DOMHighResTimeStamp} time The current timestamp.
		 */
		const callback = (time) => {
			let current = time;
			const difference = current - previous;
			const differenceLimit = 1000 / this.#FPSLimit;
			if (difference > differenceLimit) {
				if (this.launched) {
					this.#time += difference;
					this.#FPS = 1000 / difference;
					if (this.time !== 0) {
						this.dispatchEvent(new Event(`update`));
					}
				}
				previous = current;
			}
			requestAnimationFrame(callback);
		};
		requestAnimationFrame(callback);
		this.launched = launch;
	}
	/** @type {DOMHighResTimeStamp} */
	#time = 0;
	/**
	 * Gets the elapsed time since the engine started.
	 * @readonly
	 * @returns {DOMHighResTimeStamp} The elapsed time.
	 */
	get time() {
		return this.#time;
	}
	/** @type {boolean} */
	#launched = false;
	/**
	 * Gets the launch status of the engine.
	 * @returns {boolean} True if the engine is launched, false otherwise.
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launch status of the engine.
	 * @param {boolean} value The launch status to set.
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
	#FPSLimit = Infinity;
	/**
	 * Gets the FPS limit of the engine.
	 * @returns {number} The FPS limit.
	 */
	get FPSLimit() {
		return this.#FPSLimit;
	}
	/**
	 * Sets the FPS limit of the engine.
	 * @param {number} value The FPS limit to set.
	 * @throws {RangeError} If the FPS limit is not higher than 0.
	 */
	set FPSLimit(value) {
		if (value <= 0) {
			throw new RangeError(`FPS limit must be higher than 0`);
		}
		this.#FPSLimit = value;
	}
	/** @type {number} */
	#FPS = 0;
	/**
	 * Gets the current FPS of the engine.
	 * @readonly
	 * @returns {number} The current FPS.
	 */
	get FPS() {
		return this.#FPS;
	}
	/**
	 * Gets the time delta between frames.
	 * @readonly
	 * @returns {number} The time delta between frames.
	 */
	get delta() {
		return 1 / this.#FPS;
	}
}
//#endregion
//#region Precise engine
class PreciseEngine extends Engine {
	/**
	 * Constructs a PreciseEngine instance.
	 * @param {boolean} launch Whether the engine should be launched initially. Default is false.
	 */
	constructor(launch = false) {
		super();
		const controller = new AbortController();
		this.addEventListener(`update`, (event) => {
			this.dispatchEvent(new Event(`start`));
			controller.abort();
		}, { signal: controller.signal });
		/**
		 * Handles the engine update callback.
		 */
		const callback = () => {
			if (this.launched) {
				this.dispatchEvent(new Event(`update`));
			}
			setTimeout(callback, this.#delta);
		};
		setTimeout(callback, this.#delta);
		this.launched = launch;
	}
	/** @type {boolean} */
	#launched = false;
	/**
	 * Gets the launch status of the engine.
	 * @returns {boolean} True if the engine is launched, false otherwise.
	 */
	get launched() {
		return this.#launched;
	}
	/**
	 * Sets the launch status of the engine.
	 * @param {boolean} value The launch status to set.
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
	 * @returns {number} The current FPS.
	 */
	get FPS() {
		return (1000 / this.#delta);
	}
	/**
	 * Sets the FPS of the engine.
	 * @param {number} value The FPS to set.
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
	 * @returns {number} The time delta between frames.
	 */
	get delta() {
		return this.#delta * 1000;
	}
}
//#endregion

//#region Fast display
/**
 * Represents a fast display using a rendering context.
 * @template {RenderingContext} T
 * @extends {FastEngine}
 */
class FastDisplay extends FastEngine {
	/**
	 * Constructs a FastDisplay instance.
	 * @param {T} context The rendering context for the display.
	 * @param {boolean} launched Whether the display should be launched initially. Default is false.
	 */
	constructor(context, launched = false) {
		super(launched);
		this.#context = context;
		this.#resize();
		window.addEventListener(`resize`, (event) => {
			this.#resize();
		});
	}
	/** @type {RenderingContext} */
	#context;
	/**
	 * Resizes the canvas based on the current dimensions.
	 * Dispatches resize and update events after resizing.
	 */
	#resize() {
		const canvas = this.#context.canvas;
		if (canvas instanceof HTMLCanvasElement) {
			const { width, height } = canvas.getBoundingClientRect();
			canvas.width = width;
			canvas.height = height;
			this.dispatchEvent(new UIEvent(`resize`));
			this.dispatchEvent(new Event(`update`));
		}
	}
}
//#endregion
//#region Precise display
/**
 * Represents a precise display using a rendering context.
 * @template {RenderingContext} T
 * @extends {PreciseEngine}
 */
class PreciseDisplay extends PreciseEngine {
	/**
	 * Constructs a PreciseDisplay instance.
	 * @param {T} context The rendering context for the display.
	 * @param {boolean} launched Whether the display should be launched initially. Default is false.
	 */
	constructor(context, launched = false) {
		super(launched);
		this.#context = context;
		this.#resize();
		window.addEventListener(`resize`, (event) => {
			this.#resize();
		});
	}
	/** @type {RenderingContext} */
	#context;
	/**
	 * Resizes the canvas based on the current dimensions.
	 * Dispatches resize and update events after resizing.
	 */
	#resize() {
		const canvas = this.#context.canvas;
		if (canvas instanceof HTMLCanvasElement) {
			const { width, height } = canvas.getBoundingClientRect();
			canvas.width = width;
			canvas.height = height;
			this.dispatchEvent(new UIEvent(`resize`));
			this.dispatchEvent(new Event(`update`));
		}
	}
}
//#endregion

export { FastEngine, PreciseEngine, FastDisplay, PreciseDisplay };