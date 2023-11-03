// @ts-ignore
/** @typedef {import("./declarations/extensions.d.ts")} */

"use strict";

//#region Window
/**
 * @param {String} message 
 * @param {String} title
 */
// @ts-ignore
Window.prototype.alertAsync = function (message, title = `Message`) {
	return Promise.resolve(this.alert(message));
};

/**
 * @param {String} message 
 * @param {String} title
 */
// @ts-ignore
Window.prototype.confirmAsync = function (message, title = `Message`) {
	return Promise.resolve(this.confirm(message));
};

/**
 * @param {String} message 
 * @param {String} title
 */
// @ts-ignore
Window.prototype.promptAsync = function (message, title = `Message`) {
	return Promise.resolve(this.prompt(message));
};

/**
 * @template T
 * @param {Promise<T>} promise 
 * @param {Number} duration 
 * @param {Number} delay 
 */
// @ts-ignore
Window.prototype.load = async function (promise, duration = 200, delay = 0) {
	const dialogLoader = document.getElement(HTMLDialogElement, `dialog#loader`);
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
//#region Document
/**
 * @template {typeof HTMLElement} T
 * @param {T} type 
 * @param {String} selectors 
 * @param {ParentNode} parent 
 */
// @ts-ignore
Document.prototype.getElement = function (type, selectors, parent = this) {
	const element = parent.querySelector(selectors);
	if (!(element instanceof type)) {
		throw new TypeError(`Element ${selectors} is missing or has invalid type`);
	}
	return (/** @type {InstanceType<T>} */ (element));
};

// /**
//  * @param  {any[]} data 
//  */
// // @ts-ignore
// Document.prototype.log = function (...data) {

// };

/**
 * @param {any} error 
 */
// @ts-ignore
Document.prototype.analysis = function (error) {
	return error instanceof Error ? error.stack ?? `${error.name}: ${error.message}` : `Invalid error type.`;
};

/**
 * @param {String} message 
 * @param {Boolean} locked
 */
// @ts-ignore
Document.prototype.prevent = async function (message, locked = true) {
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
// @ts-ignore
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
// @ts-ignore
Location.prototype.getSearchMap = function () {
	return new Map(window.decodeURI(location.search.replace(/^\??/, ``)).split(`&`).filter(item => item).map((item) => {
		const [key, value] = item.split(`=`, 2);
		return [key, value];
	}));
};
//#endregion