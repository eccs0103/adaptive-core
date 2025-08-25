"use strict";

import { Vector } from "./vector.js";

//#region Vector 1D
class Vector1D extends Vector {
	#x: number;
	get x(): number {
		return this.#x;
	}
	set x(value: number) {
		this.#x = value;
	}
	constructor(x: number) {
		super();
		this.#x = x;
	}
}
//#endregion

export { Vector1D };
