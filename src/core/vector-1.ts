"use strict";

import { Vector } from "./vector.js";

//#region Vector 1D
class Vector1D extends Vector {
	//#region Properties
	#x: number;
	get x(): number {
		return this.#x;
	}
	set x(value: number) {
		this.#x = value;
	}
	//#endregion
	//#region Builders
	constructor(x: number) {
		super();
		this.#x = x;
	}
	static #patternVector1D: RegExp = /^\(\s*(\S+)\s*\)$/;
	static fromScalar(scalar: number): Vector1D {
		return new Vector1D(scalar);
	}
	static fromVector(vector: Vector): Vector1D {
		const metrics = vector[Symbol.iterator]();
		const metric1 = metrics.next();
		if (metric1.done) return new Vector1D(0);
		return new Vector1D(metric1.value);
	}
	static tryParse(string: string): Vector1D | null {
		const match = Vector1D.#patternVector1D.exec(string.trim());
		if (match === null) return null;
		const [, x] = match.map(Number);
		return new Vector1D(x);
	}
	static parse(string: string): Vector1D {
		const vector = Vector1D.tryParse(string);
		if (vector === null) throw new SyntaxError(`Invalid syntax '${string}' for 1D vector`);
		return vector;
	}
	//#endregion
	//#region Converters
	*[Symbol.iterator](): IteratorObject<number, BuiltinIteratorReturn> {
		yield this.x;
	}
	//#endregion
	//#region Presets
	static get newNaN(): Vector1D { return Vector1D.fromScalar(NaN); }
	static get newZero(): Vector1D { return Vector1D.fromScalar(0); }
	static get newUnitX(): Vector1D { return new Vector1D(1); }
	static get newUnit(): Vector1D { return Vector1D.fromScalar(1); }
	//#endregion
}
//#endregion

export { Vector1D };
