// @ts-ignore
/** @typedef {import("./window.js")} */

"use strict";

/** @enum {String} */ const MessageTypes = {
	/** @readonly */ message: `message`,
	/** @readonly */ warning: `warning`,
	/** @readonly */ error: `error`,
};
Object.freeze(MessageTypes);

class ACInformantElement extends ACWindowElement {
	constructor() {
		super();
		this.duration = 100;
	}
	#getHeader() {
		const header = this.querySelector(`*.header`);
		if (!(header instanceof HTMLElement)) {
			throw new TypeError(`Invalid element: ${header}`);
		}
		return header;
	}
	#getContainer() {
		const container = this.querySelector(`*.container`);
		if (!(container instanceof HTMLElement)) {
			throw new TypeError(`Invalid element: ${container}`);
		}
		return container;
	}
	#getFooter() {
		const footer = this.querySelector(`*.footer`);
		if (!(footer instanceof HTMLElement)) {
			throw new TypeError(`Invalid element: ${footer}`);
		}
		return footer;
	}
	/**
	 * @param {MessageTypes} type 
	 */
	#configureHeader(type = MessageTypes.message) {
		const header = this.#getHeader();
		//#region Title
		const h3Title = document.createElement(`h3`);
		switch (type) {
			case MessageTypes.message: {
				header.classList.add(`highlight`);
				h3Title.innerText = `Message`;
			} break;
			case MessageTypes.warning: {
				header.classList.add(`warn`);
				h3Title.innerText = `Warning`;
			} break;
			case MessageTypes.error: {
				header.classList.add(`alert`);
				h3Title.innerText = `Error`;
			} break;
			default: throw new TypeError(`Invalid message type.`);
		}
		//#endregion
		header.replaceChildren(h3Title);
	}
	/**
	 * @param {String} message 
	 * @param {MessageTypes} type 
	 */
	async alert(message, type = MessageTypes.message) {
		//#region Header
		this.#configureHeader(type);
		//#endregion
		//#region Container
		const container = this.#getContainer();
		container.innerText = message;
		//#endregion
		await this.show();
		return (/** @type {Promise<void>} */ (new Promise((resolve) => {
			this.addEventListener(`click`, async (event) => {
				if (event.target == this) {
					await this.close();
					resolve();
				}
			});
		})));
	}
	/**
	 * @param {String} message 
	 * @param {MessageTypes} type 
	 */
	async confirm(message, type = MessageTypes.message) {
		//#region Header
		this.#configureHeader(type);
		//#endregion
		//#region Container
		const container = this.#getContainer();
		container.innerText = message;
		//#endregion
		//#region Footer
		const footer = this.#getFooter();
		const buttonAccept = footer.appendChild(document.createElement(`button`));
		buttonAccept.innerText = `Accept`;
		buttonAccept.classList.add(`layer`, `rounded`, `flex`, `with-padding`);
		{ }
		const buttonDecline = footer.appendChild(document.createElement(`button`));
		buttonDecline.innerText = `Decline`;
		buttonDecline.classList.add(`layer`, `rounded`, `flex`, `with-padding`);
		{ }
		//#endregion
		await this.show();
		return (/** @type {Promise<Boolean>} */ (new Promise((resolve) => {
			this.addEventListener(`click`, async (event) => {
				if (event.target == this) {
					await this.close();
					resolve(false);
				}
			});
			buttonAccept.addEventListener(`click`, async (event) => {
				await this.close();
				resolve(true);
			});
			buttonDecline.addEventListener(`click`, async (event) => {
				await this.close();
				resolve(false);
			});
		})));
	}

	/**
	 * @param {String} message 
	 * @param {MessageTypes} type 
	 */
	async prompt(message, type = MessageTypes.message) {
		//#region Header
		this.#configureHeader(type);
		//#endregion
		//#region Container
		const container = this.#getContainer();
		container.innerText = message;
		//#endregion
		//#region Footer
		const footer = this.#getFooter();
		const inputPrompt = footer.appendChild(document.createElement(`input`));
		inputPrompt.type = `text`;
		inputPrompt.placeholder = `Enter text`;
		inputPrompt.classList.add(`depth`, `rounded`, `flex`, `with-padding`,);
		{ }
		const buttonContinue = footer.appendChild(document.createElement(`button`));
		buttonContinue.innerText = `Continue`;
		buttonContinue.classList.add(`layer`, `rounded`, `flex`, `centered`, `with-padding`);
		{ }
		//#endregion
		await this.show();
		return (/** @type {Promise<String?>} */ (new Promise((resolve) => {
			this.addEventListener(`click`, async (event) => {
				if (event.target == this) {
					await this.close();
					resolve(null);
				}
			});
			buttonContinue.addEventListener(`click`, async (event) => {
				await this.close();
				resolve(inputPrompt.value);
			});
		})));
	}
}
customElements.define(`ac-informant`, ACInformantElement, { extends: `dialog` });