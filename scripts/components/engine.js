"use strict";

class Engine extends EventTarget {
	/**
	 * @param {Boolean} launch
	 */
	constructor(launch = false) {
		super();
		let previous = 0;
		const controller = new AbortController();
		this.addEventListener(`render`, (event) => {
			if (this.time !== 0) {
				this.dispatchEvent(new Event(`initialize`));
				controller.abort();
			}
		}, { signal: controller.signal });
		/**
		 * @param {DOMHighResTimeStamp} time 
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
						this.dispatchEvent(new Event(`render`));
					}
				}
				previous = current;
			}
			requestAnimationFrame(callback);
		};
		requestAnimationFrame(callback);
		this.launched = launch;
	}
	/** @type {DOMHighResTimeStamp} */ #time = 0;
	/** @readonly */ get time() {
		return this.#time;
	}
	/** @type {Number} */ #FPS = 0;
	/** @readonly */ get FPS() {
		return this.#FPS;
	}
	/** @readonly */ get delta() {
		return 1 / this.#FPS;
	}
	/** @type {Boolean} */ #launched = false;
	get launched() {
		return this.#launched;
	}
	set launched(value) {
		if (this.#launched !== value) {
			this.dispatchEvent(new Event(`change`));
		}
		this.#launched = value;
		if (this.#launched) {
			this.dispatchEvent(new Event(`launch`));
		}
	}
	/** @type {Number} */ #FPSLimit = Infinity;
	get FPSLimit() {
		return this.#FPSLimit;
	}
	set FPSLimit(value) {
		if (value <= 0) {
			throw new RangeError(`FPS limit must be higher then 0.`);
		}
		this.#FPSLimit = value;
	}
	/**
	 * @param {Number} period 
	 */
	factor(period) {
		return this.time % period / period;
	}
}
