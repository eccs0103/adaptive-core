"use strict";

import { type Vector } from "./vector.js";
import { Vector2D } from "./vector-2.js";

//#region Vector 3D
class Vector3D extends Vector2D {
	//#region Properties
	#z: number;
	get z(): number {
		return this.#z;
	}
	set z(value: number) {
		this.#z = value;
	}
	//#endregion
	//#region Builders
	static #patternVector3D: RegExp = /^\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)$/;
	constructor(x: number, y: number, z: number) {
		super(x, y);
		this.#z = z;
	}
	static fromScalar(scalar: number): Vector3D {
		return new Vector3D(scalar, scalar, scalar);
	}
	static fromVector(vector: Vector): Vector3D {
		const metrics = vector[Symbol.iterator]();
		const metric1 = metrics.next();
		if (metric1.done) return new Vector3D(0, 0, 0);
		const metric2 = metrics.next();
		if (metric2.done) return new Vector3D(metric1.value, 0, 0);
		const metric3 = metrics.next();
		if (metric3.done) return new Vector3D(metric1.value, metric2.value, 0);
		return new Vector3D(metric1.value, metric2.value, metric3.value);
	}
	static tryParse(string: string): Vector3D | null {
		const match = Vector3D.#patternVector3D.exec(string.trim());
		if (match === null) return null;
		const [, x, y, z] = match.map(Number);
		return new Vector3D(x, y, z);
	}
	static parse(string: string): Vector3D {
		const vector = Vector3D.tryParse(string);
		if (vector === null) throw new SyntaxError(`Invalid syntax '${string}' for 3D vector`);
		return vector;
	}
	//#endregion
	//#region Converters
	*[Symbol.iterator](): IteratorObject<number, BuiltinIteratorReturn> {
		yield this.x;
		yield this.y;
		yield this.z;
	}
	//#endregion
	//#region Presets
	static get newNaN(): Vector3D { return Vector3D.fromScalar(NaN); }
	static get newUnitX(): Vector3D { return new Vector3D(1, 0, 0); }
	static get newUnitY(): Vector3D { return new Vector3D(0, 1, 0); }
	static get newUnitZ(): Vector3D { return new Vector3D(0, 0, 1); }
	static get newUnit(): Vector3D { return Vector3D.fromScalar(1); }
	//#endregion
}
//#endregion

export { Vector3D };
