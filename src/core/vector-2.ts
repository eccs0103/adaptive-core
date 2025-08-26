"use strict";

import { type Vector } from "./vector.js";
import { Vector1D } from "./vector-1.js";

//#region Vector 2D
class Vector2D extends Vector1D {
	//#region Properties
	#y: number;
	get y(): number {
		return this.#y;
	}
	set y(value: number) {
		this.#y = value;
	}
	//#endregion
	//#region Builders
	constructor(x: number, y: number) {
		super(x);
		this.#y = y;
	}
	static #patternVector2D: RegExp = /^\(\s*(\S+)\s*,\s*(\S+)\s*\)$/;
	static fromScalar(scalar: number): Vector2D {
		return new Vector2D(scalar, scalar);
	}
	static fromVector(vector: Vector): Vector2D {
		const metrics = vector[Symbol.iterator]();
		const metric1 = metrics.next();
		if (metric1.done) return new Vector2D(0, 0);
		const metric2 = metrics.next();
		if (metric2.done) return new Vector2D(metric1.value, 0);
		return new Vector2D(metric1.value, metric2.value);
	}
	static tryParse(string: string): Vector2D | null {
		const match = Vector2D.#patternVector2D.exec(string.trim());
		if (match === null) return null;
		const [, x, y] = match.map(Number);
		return new Vector2D(x, y);
	}
	static parse(string: string): Vector2D {
		const vector = Vector2D.tryParse(string);
		if (vector === null) throw new SyntaxError(`Invalid syntax '${string}' for 2D vector`);
		return vector;
	}
	//#endregion
	//#region Converters
	*[Symbol.iterator](): IteratorObject<number, BuiltinIteratorReturn> {
		yield this.x;
		yield this.y;
	}
	//#endregion
	//#region Presets
	static get newNaN(): Vector2D { return Vector2D.fromScalar(NaN); }
	static get newUnitX(): Vector2D { return new Vector2D(1, 0); }
	static get newUnitY(): Vector2D { return new Vector2D(0, 1); }
	static get newUnit(): Vector2D { return Vector2D.fromScalar(1); }
	//#endregion
}
//#endregion

export { Vector2D };
