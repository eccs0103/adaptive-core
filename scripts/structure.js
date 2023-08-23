// @ts-ignore
/** @typedef {import("./components/archive.js")} */
// @ts-ignore
/** @typedef {import("./components/manager.js")} */

"use strict";

//#region Settings
/**
 * @typedef {{}} SettingsNotation
 */

class Settings {
	/**
	 * @param {SettingsNotation} source 
	 */
	static import(source) {
		const result = new Settings();
		return result;
	}
	/**
	 * @param {Settings} source 
	 */
	static export(source) {
		const result = (/** @type {SettingsNotation} */ ({}));
		return result;
	}
	reset() {
		const settings = new Settings();
		for (const key in settings) {
			this[key] = settings[key];
		}
	}
}
//#endregion
//#region Metadata
const metaAuthor = document.querySelector(`meta[name="author"]`);
if (!(metaAuthor instanceof HTMLMetaElement)) {
	throw new TypeError(`Invalid element: ${metaAuthor}`);
}
const developer = metaAuthor.content;

const metaApplicationName = document.querySelector(`meta[name="application-name"]`);
if (!(metaApplicationName instanceof HTMLMetaElement)) {
	throw new TypeError(`Invalid element: ${metaApplicationName}`);
}
const title = metaApplicationName.content;

/** @type {Archive<SettingsNotation>} */ const archiveSettings = new Archive(`${developer}.${title}.Settings`, Settings.export(new Settings()));

const settings = Settings.import(archiveSettings.data);
//#endregion
