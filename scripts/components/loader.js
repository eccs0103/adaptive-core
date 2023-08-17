// @ts-ignore
/** @typedef {import("./window.js")} */

"use strict";

const dialogLoader = document.querySelector(`dialog.loader`);
if (dialogLoader) {
	if (!(dialogLoader instanceof ACWindowElement)) {
		throw new TypeError(`Invalid element: ${dialogLoader}`);
	}
	dialogLoader.show();
	window.addEventListener(`load`, async (event) => {
		await dialogLoader.close();
	});
}
