/// <reference path="../Declarations/Extensions.d.ts" />

"use strict";

//#region Number
/**
 * Imports a number from the source.
 * @param {unknown} source The source to import.
 * @param {string} name The name of the source.
 * @returns {number} The imported number.
 * @throws {ReferenceError} If the source is undefined.
 * @throws {TypeError} If the source is not a number.
 */
Number.import = function (source, name = `source`) {
	if (source === undefined) {
		throw new ReferenceError(`${name.replace(/^\w/, (part) => part.toUpperCase())} is not defined`);
	}
	if (typeof (source) !== `number`) {
		throw new TypeError(`Unable to import ${(name)} due it's ${typename(source)} type`);
	}
	const result = source.valueOf();
	return result;
};

/**
 * Exports the number value.
 * @returns {number} The exported number.
 */
Number.prototype.export = function () {
	const result = this.valueOf();
	return result;
};
//#endregion
//#region Boolean
/**
 * Imports a boolean from the source.
 * @param {unknown} source The source to import.
 * @param {string} name The name of the source.
 * @returns {boolean} The imported boolean.
 * @throws {ReferenceError} If the source is undefined.
 * @throws {TypeError} If the source is not a boolean.
 */
Boolean.import = function (source, name = `source`) {
	if (source === undefined) {
		throw new ReferenceError(`${name.replace(/^\w/, (part) => part.toUpperCase())} is not defined`);
	}
	if (typeof (source) !== `boolean`) {
		throw new TypeError(`Unable to import ${(name)} due it's ${typename(source)} type`);
	}
	const result = source.valueOf();
	return result;
};

/**
 * Exports the boolean value.
 * @returns {boolean} The exported boolean.
 */
Boolean.prototype.export = function () {
	const result = this.valueOf();
	return result;
};
//#endregion
//#region String
/**
 * Imports a string from the source.
 * @param {unknown} source The source to import.
 * @param {string} name The name of the source.
 * @returns {string} The imported string.
 * @throws {ReferenceError} If the source is undefined.
 * @throws {TypeError} If the source is not a string.
 */
String.import = function (source, name = `source`) {
	if (source === undefined) {
		throw new ReferenceError(`${name.replace(/^\w/, (part) => part.toUpperCase())} is not defined`);
	}
	if (typeof (source) !== `string`) {
		throw new TypeError(`Unable to import ${(name)} due it's ${typename(source)} type`);
	}
	const result = source.valueOf();
	return result;
};

/**
 * Checks if the given string is empty.
 * @param {string} text The string to check.
 * @returns {boolean} Returns true if the string is empty, otherwise returns false.
 */
String.isEmpty = function (text) {
	return text.length === 0;
}

/**
 * Exports the string value.
 * @returns {string} The exported string.
 */
String.prototype.export = function () {
	const result = this.valueOf();
	return result;
};

/**
 * Replaces the string with the provided text if it's empty.
 * @param {string} text The text to replace the string with if it's empty.
 * @returns {string} Returns the original string if it's not empty, otherwise returns the provided text.
 */
String.prototype.replaceVoid = function (text) {
	return (this.length > 0 ? this.valueOf() : text);
};
//#endregion
//#region Function
/**
 * Not implemented function to import source.
 * @param {unknown} source The source to import.
 * @param {string} name The name of the source.
 * @returns {any} The imported value.
 * @throws {ReferenceError} If the function is called.
 */
Function.prototype.import = function (source, name = `source`) {
	throw new ReferenceError(`Not implemented function`);
};

/**
 * Not implemented function to export source.
 * @returns {any} The exported value.
 * @throws {ReferenceError} If the function is called.
 */
Function.prototype.export = function () {
	throw new ReferenceError(`Not implemented function`);
};
//#endregion
//#region Object
/**
 * Imports an object from the source.
 * @param {unknown} source The source to import.
 * @param {string} name The name of the source.
 * @returns {Object} The imported object.
 * @throws {ReferenceError} If the source is undefined.
 * @throws {TypeError} If the source is not an object or is null.
 */
Object.import = function (source, name = `source`) {
	if (source === undefined) {
		throw new ReferenceError(`${name.replace(/^\w/, (part) => part.toUpperCase())} is not defined`);
	}
	if (typeof (source) !== `object`) {
		throw new TypeError(`Unable to import ${(name)} due it's ${typename(source)} type`);
	}
	if (source === null) {
		throw new TypeError(`Unable to import ${(name)} due it's ${typename(null)} type`);
	}
	/**
	 * @todo Check
	 */
	const result = source.valueOf();
	return result;
};

/**
 * Exports the object value.
 * @returns {Object} The exported object.
 */
Object.prototype.export = function () {
	const result = this.valueOf();
	return result;
};
//#endregion
//#region Array
/**
 * Imports an array from the source.
 * @param {unknown} source The source to import.
 * @param {string} name The name of the source.
 * @returns {any[]} The imported array.
 * @throws {ReferenceError} If the source is undefined.
 * @throws {TypeError} If the source is not an array or if any element cannot be imported.
 */
Array.import = function (source, name = `source`) {
	if (source === undefined) {
		throw new ReferenceError(`${name.replace(/^\w/, (part) => part.toUpperCase())} is not defined`);
	}
	if (!(source instanceof Array)) {
		throw new TypeError(`Unable to import ${name} due it's ${typename(source)} type`);
	}
	const result = Array.from(source);
	return result;
};

/**
 * Exports the array value.
* @todo Check
 * @returns {this[]} The exported array.
 */
Array.prototype.export = function () {
	const result = this.map(item => item.export());
	return result;
};
//#endregion
//#region Math
/**
 * Clamps a value between a minimum and maximum value.
 * @param {number} value The value to be clamped.
 * @param {number} min The minimum allowed value.
 * @param {number} max The maximum allowed value.
 * @returns {number} The clamped value.
 */
Math.between = function (value, min, max) {
	return Math.min(Math.max(min, value), max);
};

const toDegreeFactor = 180 / Math.PI;
/**
 * Converts radians to degrees.
 * @param {number} radians The angle in radians.
 * @returns {number} The equivalent angle in degrees.
 */
Math.toDegrees = function (radians) {
	return radians * toDegreeFactor;
};

const toRadianFactor = Math.PI / 180;
/**
 * Converts degrees to radians.
 * @param {number} degrees The angle in degrees.
 * @returns {number} The equivalent angle in radians.
 */
Math.toRadians = function (degrees) {
	return degrees * toRadianFactor;
};

/**
 * Converts a value to a factor within the range [0, 1] based on a specified period.
 * @param {number} value The value to convert.
 * @param {number} period The period to use for conversion.
 * @returns {number} The converted factor within the range [0, 1].
 */
Math.toFactor = function (value, period) {
	return value % (period + 1) / period;
};

/**
 * Converts a value to a factor within the range [0, 1] based on a specified period.
 * @param {number} value The value to convert.
 * @param {number} period The period to use for conversion.
 * @returns {number} The converted factor within the range [0, 1].
 */
Math.toSignedFactor = function (value, period) {
	return value % (period + 1) / period * 2 - 1;
};
//#endregion
//#region Promise
/**
 * @template T
 * @param {() => T | PromiseLike<T>} action The action to execute.
 * @returns {Promise<T>} A promise that resolves with the result of the action.
 */
Promise.fulfill = function (action) {
	return new Promise((resolve, reject) => {
		try {
			resolve(action());
		} catch (error) {
			reject(error);
		}
	});
};
//#endregion
//#region Error
/**
 * @param {any} error The error object to generate.
 * @returns {Error} The generated error object.
 */
Error.generate = function (error) {
	return error instanceof Error ? error : new Error(`Undefined error type`);
};

/**
 * @returns {string}
 */
Error.prototype.toString = function () {
	let text = this.stack ?? `${this.name}: ${this.message}`;
	if (this.cause !== undefined) {
		text += ` cause of:\n\r${Error.generate(this.cause)}`;
	}
	return text;
};
//#endregion

//#region Element
/**
 * Retrieves an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
Element.prototype.getElement = function (type, selectors) {
	const element = this.querySelector(selectors);
	if (element instanceof type) {
		return (/** @type {InstanceType<T>} */ (element));
	} else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
Element.prototype.tryGetElement = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const element = this.querySelector(selectors);
		if (element instanceof type) {
			resolve(/** @type {InstanceType<T>} */(element));
		} else if (strict) {
			reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
		}
	});
};

/**
 * Retrieves the closest ancestor element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
Element.prototype.getClosest = function (type, selectors) {
	const element = this.closest(selectors);
	if (element instanceof type) {
		return (/** @type {InstanceType<T>} */ (element));
	} else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve the closest ancestor element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
Element.prototype.tryGetClosest = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const element = this.closest(selectors);
		if (element instanceof type) {
			resolve(/** @type {InstanceType<T>} */(element));
		} else if (strict) {
			reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
		}
	});
};

/**
 * Retrieves elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @returns {NodeListOf<InstanceType<T>>} The NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type.
 */
Element.prototype.getElements = function (type, selectors) {
	const elements = this.querySelectorAll(selectors);
	if (Array.from(elements).every(element => element instanceof type)) {
		return (/** @type {NodeListOf<InstanceType<T>>} */ (elements));
	} else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @param {boolean} strict Whether to reject if any element is missing or has an invalid type.
 * @returns {Promise<NodeListOf<InstanceType<T>>>} A promise that resolves to the NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type and strict mode is enabled.
 */
Element.prototype.tryGetElements = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const elements = this.querySelectorAll(selectors);
		if (Array.from(elements).every(element => element instanceof type)) {
			resolve(/** @type {NodeListOf<InstanceType<T>>} */(elements));
		} else if (strict) {
			reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
		}
	});
};
//#endregion
//#region Document
/**
 * Retrieves an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
Document.prototype.getElement = function (type, selectors) {
	return this.documentElement.getElement(type, selectors);
};

/**
 * Tries to retrieve an element of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
Document.prototype.tryGetElement = function (type, selectors, strict = false) {
	return this.documentElement.tryGetElement(type, selectors, strict);
};

/**
 * Retrieves elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @returns {NodeListOf<InstanceType<T>>} The NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type.
 */
Document.prototype.getElements = function (type, selectors) {
	return this.documentElement.getElements(type, selectors);
};

/**
 * Tries to retrieve elements of the specified type and selectors.
 * @template {typeof Element} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @param {boolean} strict Whether to reject if any element is missing or has an invalid type.
 * @returns {Promise<NodeListOf<InstanceType<T>>>} A promise that resolves to the NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type and strict mode is enabled.
 */
Document.prototype.tryGetElements = function (type, selectors, strict = false) {
	return this.documentElement.tryGetElements(type, selectors, strict);
};
//#endregion
//#region Window
/**
 * Gets the type name of a value.
 * @param {unknown} value The value to get the type name of.
 * @returns {string} The type name of the value.
 */
Window.prototype.typename = function (value) {
	if (value === undefined) return `Undefined`;
	else if (value === null) return `Null`;
	else return value.constructor.name;
};

const dialogAlert = document.getElement(HTMLDialogElement, `dialog.pop-up.alert`);
dialogAlert.addEventListener(`click`, (event) => {
	if (event.target === dialogAlert) {
		dialogAlert.close();
	}
});

/**
 * Asynchronously displays an alert message.
 * @param {any} message The message to display.
 * @param {string} title The title of the alert.
 * @returns {Promise<void>} A promise that resolves when the alert is closed.
 */
Window.prototype.alertAsync = function (message = ``, title = `Message`) {
	dialogAlert.showModal();
	//#region Header
	const htmlHeader = dialogAlert.getElement(HTMLElement, `*.header`);
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
	const htmlContainer = dialogAlert.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = `${message}`;
	//#endregion
	const controller = new AbortController();
	const promise = ( /** @type {Promise<void>} */(new Promise((resolve) => {
		dialogAlert.addEventListener(`close`, (event) => {
			resolve();
		}, { signal: controller.signal });
	})));
	promise.finally(() => {
		controller.abort();
		dialogAlert.close();
	});
	return promise;
};

const dialogConfirm = document.getElement(HTMLDialogElement, `dialog.pop-up.confirm`);
dialogConfirm.addEventListener(`click`, (event) => {
	if (event.target === dialogConfirm) {
		dialogConfirm.close();
	}
});

/**
 * Asynchronously displays a confirmation dialog.
 * @param {string} message The message to display.
 * @param {string} title The title of the confirmation dialog.
 * @returns {Promise<boolean>} A promise that resolves to true if the user confirms, and false otherwise.
 */
Window.prototype.confirmAsync = function (message = ``, title = `Message`) {
	dialogConfirm.showModal();
	//#region Header
	const htmlHeader = dialogConfirm.getElement(HTMLElement, `*.header`);
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
	const htmlContainer = dialogConfirm.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogConfirm.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Button Decline
	const buttonDecline = htmlFooter.getElement(HTMLButtonElement, `button.invalid`);
	//#endregion
	//#endregion
	const controller = new AbortController();
	const promise = (/** @type {Promise<boolean>} */(new Promise((resolve) => {
		dialogConfirm.addEventListener(`close`, (event) => {
			resolve(false);
		}, { signal: controller.signal });
		buttonAccept.addEventListener(`click`, (event) => {
			resolve(true);
		}, { signal: controller.signal });
		buttonDecline.addEventListener(`click`, (event) => {
			resolve(false);
		}, { signal: controller.signal });
	})));
	promise.finally(() => {
		controller.abort();
		dialogConfirm.close();
	});
	return promise;
};

const dialogPrompt = document.getElement(HTMLDialogElement, `dialog.pop-up.prompt`);
dialogPrompt.addEventListener(`click`, (event) => {
	if (event.target === dialogPrompt) {
		dialogPrompt.close();
	}
});

/**
 * Asynchronously displays a prompt dialog.
 * @param {string} message The message to display.
 * @param {string} title The title of the prompt dialog.
 * @returns {Promise<string?>} A promise that resolves to the user's input value if accepted, or null if canceled.
 */
Window.prototype.promptAsync = function (message = ``, _default = ``, title = `Message`) {
	dialogPrompt.showModal();
	//#region Header
	const htmlHeader = dialogPrompt.getElement(HTMLElement, `*.header`);
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
	const htmlContainer = dialogPrompt.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogPrompt.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Input Prompt
	const inputPrompt = htmlFooter.getElement(HTMLInputElement, `input[type="text"]`);
	inputPrompt.value = _default;
	//#endregion
	//#endregion
	const controller = new AbortController();
	const promise = (/** @type {Promise<string?>} */(new Promise((resolve) => {
		dialogPrompt.addEventListener(`close`, (event) => {
			resolve(null);
		}, { signal: controller.signal });
		buttonAccept.addEventListener(`click`, (event) => {
			resolve(inputPrompt.value);
		}, { signal: controller.signal });
	})));
	promise.finally(() => {
		controller.abort();
		dialogPrompt.close();
	});
	return promise;
};

/**
 * Issues a warning message.
 * @param {any} message The warning message to be issued.
 * @returns {Promise<void>} A Promise that resolves when the warning is displayed.
 */
Window.prototype.warn = async function (message = ``) {
	await this.alertAsync(message, `Warning`);
};

/**
 * Throws an error message.
 * @param {any} message The error message to be thrown.
 * @returns {Promise<void>} A Promise that resolves when the error is displayed.
 */
Window.prototype.throw = async function (message = ``) {
	await this.alertAsync(message, `Error`);
};

/**
 * Asynchronously loads a promise with a loading animation.
 * @template T
 * @param {Promise<T>} promise The promise to load.
 * @param {number} duration The duration of the loading animation.
 * @param {number} delay The delay before the loading animation starts.
 * @returns {Promise<T>} A promise that resolves to the result of the input promise.
 */
Window.prototype.load = async function (promise, duration = 200, delay = 0) {
	const dialogLoader = document.getElement(HTMLDialogElement, `dialog.loader`);
	try {
		dialogLoader.showModal();
		await dialogLoader.animate([
			{ opacity: `0` },
			{ opacity: `1` },
		], { duration: duration, fill: `both` }).finished;
		return await promise;
	} finally {
		await dialogLoader.animate([
			{ opacity: `1` },
			{ opacity: `0` },
		], { duration: duration, fill: `both`, delay: delay }).finished;
		dialogLoader.close();
	}
};

/**
 * Asynchronously handles an error, displaying it in an alert.
 * @param {Error} error The error to handle.
 * @param {boolean} reload Indicates whether the application should be reloaded after displaying the error.
 * @returns {Promise<void>} A promise that resolves once the error handling is complete.
 */
Window.prototype.stabilize = async function (error, reload = true) {
	await window.throw(error);
	if (reload) {
		location.reload();
	}
};
//#endregion
//#region Version manager
/**
 * Represents a version manager for parsing and comparing version numbers.
 */
class VersionManager {
	/**
	 * Parses a version number from the given text.
	 * @param {string} text The text representing the version number.
	 * @returns {VersionManager} A VersionManager instance representing the parsed version.
	 * @throws {SyntaxError} If the version syntax is invalid.
	 */
	static parse(text) {
		const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(text);
		if (match === null) throw new SyntaxError(`Invalid version '${text}' syntax. Version must have <number>.<number>.<number> syntax`);
		const [, major, minor, patch] = match.map(part => Number.parseInt(part));
		const version = new VersionManager();
		version.#major = major;
		version.#minor = minor;
		version.#patch = patch;
		return version;
	}
	/** @type {number} */
	#major = 1;
	/** @type {number} */
	#minor = 0;
	/** @type {number} */
	#patch = 0;
	/**
	 * Checks if this version is higher than the specified version.
	 * @param {VersionManager} other The other version to compare against.
	 * @returns {boolean} True if this version is higher; otherwise, false.
	 */
	isHigherThen(other) {
		if (this.#major > other.#major) return true;
		else if (this.#minor > other.#minor) return true;
		else if (this.#patch > other.#patch) return true;
		else return false;
	}
	/**
	 * Converts the version to a string representation.
	 * @returns {string} The string representation of the version.
	 */
	toString() {
		return `${this.#major}.${this.#minor}.${this.#patch}`;
	}
}
//#endregion
//#region Navigator
/**
 * Retrieves the data path based on developer and application name metadata.
 * @returns {string} The data path.
 */
Navigator.prototype.getDataPath = function () {
	const developer = document.getElement(HTMLMetaElement, `meta[name="author"]`).content;
	const title = document.getElement(HTMLMetaElement, `meta[name="title"]`).content;
	return `${developer}.${title}`;
};

/**
 * Retrieves the version information from the metadata.
 * @returns {VersionManager} An instance representing the version.
 */
Navigator.prototype.getVersion = function () {
	const metaVersion = document.getElement(HTMLMetaElement, `meta[name="generator"]`).content;
	return VersionManager.parse(metaVersion);
};

/**
 * Defines a custom property on the Navigator prototype to interact with the color scheme meta tag.
 */
Object.defineProperty(Navigator.prototype, `colorScheme`, {
	get() {
		return document.getElement(HTMLMetaElement, `meta[name="color-scheme"]`).content;
	},
	set(value) {
		document.getElement(HTMLMetaElement, `meta[name="color-scheme"]`).content = String(value);
	}
});

/**
 * Downloads the specified file.
 * @param {File} file The file to download.
 * @returns {void}
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
/**
 * Parses the search part of the URL and returns it as a map.
 * @returns {Map<string, string>} A map containing the search parameters.
 */
Location.prototype.getSearchMap = function () {
	return new Map(window.decodeURI(location.search.replace(/^\??/, ``)).split(`&`).filter(item => item).map((item) => {
		const [key, value] = item.split(`=`, 2);
		return [key, value];
	}));
};
//#endregion

//#region Application
/**
 * @typedef ApplicationNotation
 * @property {string} [version]
 */

class Application {
	/**
	 * @param {unknown} source 
	 * @returns {Application}
	 */
	static import(source) {
		const result = new Application();
		const shell = Object.import(source);
		result.version = VersionManager.parse(String.import(shell[`version`], `property version`));
		return result;
	}
	/**
	 * @returns {ApplicationNotation}
	 */
	export() {
		return {
			version: this.version.toString(),
		};
	}
	/** @type {VersionManager} */
	#version = new VersionManager();
	get version() {
		return this.#version;
	}
	set version(value) {
		this.#version = value;
	}
}

// const application = new ArchiveManager(`${navigator.getDataPath()}.Application`, Application).data;
//#endregion
//#region Version
// const version = navigator.getVersion();
// if (version.isHigherThen(application.version)) {
// 	window.dispatchEvent(new Event(`update`, { bubbles: false, cancelable: false }));
// 	application.version = version;
// }
//#endregion

export { };