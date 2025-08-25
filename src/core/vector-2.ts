"use strict";

import { Vector1D } from "./vector-1.js";

//#region Vector 2D
class Vector2D extends Vector1D {
	#y: number;
	get y(): number {
		return this.#y;
	}
	set y(value: number) {
		this.#y = value;
	}
	constructor(x: number, y: number) {
		super(x);
		this.#y = y;
	}
	*[Symbol.iterator](): Generator<number, void> {
		yield this.x;
		yield this.y;
	}
}
//#endregion

export { Vector2D };
