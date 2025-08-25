"use strict";

import { Vector2D } from "./vector-2.js";

//#region Vector 3D
class Vector3D extends Vector2D {
	#z: number;
	get z(): number {
		return this.#z;
	}
	set z(value: number) {
		this.#z = value;
	}
	constructor(x: number, y: number, z: number) {
		super(x, y);
		this.#z = z;
	}
	*[Symbol.iterator](): Generator<number, void> {
		yield this.x;
		yield this.y;
		yield this.z;
	}
}
//#endregion

export { Vector3D };
