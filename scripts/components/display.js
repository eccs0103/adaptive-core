// @ts-ignore
/** @typedef {import("./engine.js")} */

"use strict";

/**
 * @template {RenderingContext} T
 */
class Display extends Engine {
	/**
	 * @param {T} context 
	 * @param {Boolean} launched 
	 */
	constructor(context, launched = false) {
		super(launched);
		this.#context = context;
		const canvas = this.#context.canvas;
		this.addEventListener(`resize`, (event) => {
			if (canvas instanceof HTMLCanvasElement) {
				const { width, height } = canvas.getBoundingClientRect();
				canvas.width = width;
				canvas.height = height;
				this.dispatchEvent(new Event(`render`));
			}
		});
		window.addEventListener(`resize`, (event) => {
			this.dispatchEvent(new Event(`resize`));
		});
	}
	/** @type {RenderingContext} */ #context;
}
