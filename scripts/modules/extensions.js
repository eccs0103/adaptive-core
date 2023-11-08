// @ts-ignore
/** @typedef {import("./declarations/extensions.d.ts")} */

"use strict";

//#region Math
/**
* @param {Number} value 
* @param {Number} period 
* @returns [0 - 1)
*/
Math.toFactor = function (value, period) {
	return value % period / period;
};

/**
 * @param {Number} value 
 * @param {Number} period 
 * @returns [-1 - 1)
 */
Math.toSignedFactor = function (value, period) {
	return value % period / (period / 2) - 1;
};
//#endregion
//#region Window
/**
 * @param {String} message 
 * @param {String} title
 */
Window.prototype.alertAsync = async function (message, title = `Message`) {
	const dialogPopUp = this.document.getElement(HTMLDialogElement, `dialog.pop-up.alert`);
	dialogPopUp.addEventListener(`click`, (event) => {
		if (event.target === dialogPopUp) {
			dialogPopUp.close();
		}
	});
	dialogPopUp.showModal();
	//#region Header
	const htmlHeader = dialogPopUp.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogPopUp.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	const promise = await ( /** @type {Promise<void>} */(new Promise((resolve) => {
		dialogPopUp.addEventListener(`close`, (event) => {
			resolve();
		});
	})));
	dialogPopUp.remove();
	return promise;
};

/**
 * @param {String} message 
 * @param {String} title
 */
Window.prototype.confirmAsync = async function (message, title = `Message`) {
	const dialogPopUp = this.document.getElement(HTMLDialogElement, `dialog.pop-up.confirm`);
	dialogPopUp.addEventListener(`click`, (event) => {
		if (event.target === dialogPopUp) {
			dialogPopUp.close();
		}
	});
	dialogPopUp.showModal();
	//#region Header
	const htmlHeader = dialogPopUp.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogPopUp.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogPopUp.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Button Decline
	const buttonDecline = htmlFooter.getElement(HTMLButtonElement, `button.invalid`);
	//#endregion
	//#endregion
	const promise = await (/** @type {Promise<Boolean>} */(new Promise((resolve) => {
		dialogPopUp.addEventListener(`close`, (event) => {
			resolve(false);
		});
		buttonAccept.addEventListener(`click`, (event) => {
			resolve(true);
		});
		buttonDecline.addEventListener(`click`, (event) => {
			resolve(false);
		});
	})));
	dialogPopUp.remove();
	return promise;
};

/**
 * @param {String} message 
 * @param {String} title
 */
Window.prototype.promptAsync = async function (message, title = `Message`) {
	const dialogPopUp = this.document.getElement(HTMLDialogElement, `dialog.pop-up.prompt`);
	dialogPopUp.addEventListener(`click`, (event) => {
		if (event.target === dialogPopUp) {
			dialogPopUp.close();
		}
	});
	dialogPopUp.showModal();
	//#region Header
	const htmlHeader = dialogPopUp.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogPopUp.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogPopUp.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Input Prompt
	const inputPrompt = htmlFooter.getElement(HTMLInputElement, `input[type="text"]`);
	//#endregion
	//#endregion
	const promise = await (/** @type {Promise<String?>} */(new Promise((resolve) => {
		dialogPopUp.addEventListener(`close`, (event) => {
			resolve(null);
		});
		buttonAccept.addEventListener(`click`, (event) => {
			resolve(inputPrompt.value);
		});
	})));
	dialogPopUp.remove();
	return promise;
};

/**
 * @template T
 * @param {Promise<T>} promise 
 * @param {Number} duration 
 * @param {Number} delay 
 */
Window.prototype.load = async function (promise, duration = 200, delay = 0) {
	const dialogLoader = document.getElement(HTMLDialogElement, `dialog.loader`);
	dialogLoader.showModal();
	await dialogLoader.animate([
		{ opacity: `0` },
		{ opacity: `1` },
	], { duration: duration, fill: `both` }).finished;
	const value = await promise;
	await dialogLoader.animate([
		{ opacity: `1` },
		{ opacity: `0` },
	], { duration: duration, fill: `both`, delay: delay }).finished;
	dialogLoader.close();
	return value;
};
//#endregion
//#region HTML element
/**
 * @template {typeof HTMLElement} T
 * @param {T} type 
 * @param {String} selectors 
 */
HTMLElement.prototype.getElement = function (type, selectors) {
	const element = this.querySelector(selectors);
	if (!(element instanceof type)) {
		throw new TypeError(`Element ${selectors} is missing or has invalid type`);
	}
	return (/** @type {InstanceType<T>} */ (element));
};
//#endregion
//#region Document
/**
 * @template {typeof HTMLElement} T
 * @param {T} type 
 * @param {String} selectors 
 */
Document.prototype.getElement = function (type, selectors) {
	return this.documentElement.getElement(type, selectors);
};

// /**
//  * @param  {any[]} data 
//  */
// Document.prototype.log = function (...data) {
// 	const dialogConsole = this.getElement(HTMLDialogElement, `dialog.console`);
// 	dialogConsole.innerText = `${data.join(` `)}`;
// 	dialogConsole.open = true;
// };

/**
 * @param {any} error 
 */
Document.prototype.analysis = function (error) {
	return error instanceof Error ? error : new Error(`Undefined error type`);
};

/**
 * @param {Error} error 
 * @param {Boolean} locked
 */
Document.prototype.prevent = async function (error, locked = true) {
	const message = error.stack ?? `${error.name}: ${error.message}`;
	if (locked) {
		await window.alertAsync(message, `Error`);
		location.reload();
	} else {
		console.error(message);
	};
};
//#endregion
//#region Navigator
/**
 * @param {File} file 
 */
Navigator.prototype.download = function (file) {
	const aLink = document.createElement(`a`);
	aLink.download = file.name;
	aLink.href = URL.createObjectURL(file);
	aLink.click();
	URL.revokeObjectURL(aLink.href);
	aLink.remove();
};
//#endregion
//#region Location
Location.prototype.getSearchMap = function () {
	return new Map(window.decodeURI(location.search.replace(/^\??/, ``)).split(`&`).filter(item => item).map((item) => {
		const [key, value] = item.split(`=`, 2);
		return [key, value];
	}));
};
//#endregion

export { };
