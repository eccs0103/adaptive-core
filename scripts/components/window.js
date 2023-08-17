"use strict";

class ACWindowElement extends HTMLDialogElement {
	async connectedCallback() {
		await this.animate([
			{ opacity: `0` }
		], { duration: 0, iterations: 1, fill: `both` }).finished;
	}
	/** @type {Number} */ #duration = 500;
	get duration() {
		return this.#duration;
	}
	set duration(value) {
		this.#duration = value;
	}
	async show() {
		await this.showModal();
	}
	async showModal() {
		super.showModal();
		await this.animate([
			{ opacity: `1` }
		], { duration: this.duration * 0.25, iterations: 1, fill: `both` }).finished;
	}
	async close() {
		await this.animate([
			{ opacity: `0` }
		], { duration: this.duration * 0.75, iterations: 1, fill: `both` }).finished;
		super.close();
	}
}
customElements.define(`ac-window`, ACWindowElement, { extends: `dialog` });