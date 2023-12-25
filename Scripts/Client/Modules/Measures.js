"use strict";

//#region Point
/**
 * @interface
 */
class Point {
	/** @readonly */ get #metrics() {
		return Array.from(this);
	}
	/**
	 * @param {Number} [digits] 
	 */
	toFixed(digits) {
		return `(${this.#metrics.map(metric => metric.toFixed(digits)).join(`, `)})`;
	}
	/**
	 * @param {Number} [digits] 
	 */
	toExponential(digits) {
		return `(${this.#metrics.map(metric => metric.toExponential(digits)).join(`, `)})`;
	}
	/**
	 * @param {Number} [precision] 
	 */
	toPrecision(precision) {
		return `(${this.#metrics.map(metric => metric.toPrecision(precision)).join(`, `)})`;
	}
	/**
	 * @param {Number} [radix] 
	 */
	toString(radix) {
		return `(${this.#metrics.map(metric => metric.toString(radix)).join(`, `)})`;
	}
	/**
	 * @param {String | String[]} [locales] 
	 * @param {Intl.NumberFormatOptions} [options] 
	 */
	toLocaleString(locales, options) {
		return `(${this.#metrics.map(metric => metric.toLocaleString(locales, options)).join(`, `)})`;
	}
	/**
	 * @returns {Generator<Number>}
	 */
	*[Symbol.iterator]() {
		throw new ReferenceError(`Not implemented function`);
	}
}
//#endregion
//#region Point 1D
class Point1D extends Point {
	/**
	 * @param {Point1D} first 
	 * @param {Point1D} second 
	 */
	static [`+`](first, second) {
		return new Point1D(first.x + second.x);
	}
	/**
	 * @param {Point1D} first 
	 * @param {Point1D} second 
	 */
	static [`-`](first, second) {
		return new Point1D(first.x - second.x);
	}
	/**
	 * @param {Point1D} target 
	 * @param {Number} factor 
	 */
	static [`*`](target, factor) {
		return new Point1D(target.x * factor);
	}
	/**
	 * @param {Point1D} target 
	 * @param {Number} factor 
	 */
	static [`/`](target, factor) {
		return new Point1D(target.x / factor);
	}
	/**
	 * @param {Point1D} source 
	 * @returns {Point1D}
	 */
	static clone(source) {
		return new Point1D(source.x);
	}
	/** @readonly */ static get ZERO() { return new Point1D(0); }
	/**
	 * @param {Number} x 
	 */
	constructor(x) {
		super();
		this.x = x;
	}
	/** @type {Number} */ #x = 0;
	get x() {
		return this.#x;
	}
	set x(value) {
		this.#x = value;
	}
	/**
	 * @param {Point1D} other 
	 */
	[`+`](other) {
		return Point1D["+"](this, other);
	}
	/**
	 * @param {Point1D} other 
	 */
	[`-`](other) {
		return Point1D["-"](this, other);
	}
	/**
	 * @param {Number} factor 
	 */
	[`*`](factor) {
		return Point1D["*"](this, factor);
	}
	/**
	 * @param {Number} factor 
	 */
	[`/`](factor) {
		return Point1D["/"](this, factor);
	}
	clone() {
		return Point1D.clone(this);
	}
	*[Symbol.iterator]() {
		yield this.x;
		return;
	}
}
//#endregion
//#region Point 2D
class Point2D extends Point1D {
	/**
	 * @param {Point2D} first 
	 * @param {Point2D} second 
	 */
	static [`+`](first, second) {
		return new Point2D(first.x + second.x, first.y + second.y);
	}
	/**
	 * @param {Point2D} first 
	 * @param {Point2D} second 
	 */
	static [`-`](first, second) {
		return new Point2D(first.x - second.x, first.y - second.y);
	}
	/**
	 * @param {Point2D} target 
	 * @param {Number} factor 
	 */
	static [`*`](target, factor) {
		return new Point2D(target.x * factor, target.y * factor);
	}
	/**
	 * @param {Point2D} target 
	 * @param {Number} factor 
	 */
	static [`/`](target, factor) {
		return new Point2D(target.x / factor, target.y / factor);
	}
	/**
	 * @param {Point2D} source 
	 * @returns {Point2D}
	 */
	static clone(source) {
		return new Point2D(source.x, source.y);
	}
	/** @readonly */ static get ZERO() { return new Point2D(0, 0); }
	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	constructor(x, y) {
		super(x);
		this.y = y;
	}
	/** @type {Number} */ #y = 0;
	get y() {
		return this.#y;
	}
	set y(value) {
		this.#y = value;
	}
	/**
	 * @param {Point2D} other 
	 */
	[`+`](other) {
		return Point2D["+"](this, other);
	}
	/**
	 * @param {Point2D} other 
	 */
	[`-`](other) {
		return Point2D[`-`](this, other);
	}
	/**
	 * @param {Number} factor 
	 */
	[`*`](factor) {
		return Point2D[`*`](this, factor);
	}
	/**
	 * @param {Number} factor 
	 */
	[`/`](factor) {
		return Point2D[`/`](this, factor);
	}
	clone() {
		return Point2D.clone(this);
	}
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		return;
	}
}
//#endregion
//#region Point 3D
class Point3D extends Point2D {
	/**
	 * @param {Point3D} first 
	 * @param {Point3D} second 
	 */
	static [`+`](first, second) {
		return new Point3D(first.x + second.x, first.y + second.y, first.z + second.z);
	}
	/**
	 * @param {Point3D} first 
	 * @param {Point3D} second 
	 */
	static [`-`](first, second) {
		return new Point3D(first.x - second.x, first.y - second.y, first.z - second.z);
	}
	/**
	 * @param {Point3D} target 
	 * @param {Number} factor 
	 */
	static [`*`](target, factor) {
		return new Point3D(target.x * factor, target.y * factor, target.z * factor);
	}
	/**
	 * @param {Point3D} target 
	 * @param {Number} factor 
	 */
	static [`/`](target, factor) {
		return new Point3D(target.x / factor, target.y / factor, target.z * factor);
	}
	/**
	 * @param {Point3D} source 
	 * @returns {Point3D}
	 */
	static clone(source) {
		return new Point3D(source.x, source.y, source.z);
	}
	/** @readonly */ static get ZERO() { return new Point3D(0, 0, 0); }
	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} z 
	 */
	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}
	/** @type {Number} */ #z = 0;
	get z() {
		return this.#z;
	}
	set z(value) {
		this.#z = value;
	}
	/**
	 * @param {Point3D} other 
	 */
	[`+`](other) {
		return Point3D["+"](this, other);
	}
	/**
	 * @param {Point3D} other 
	 */
	[`-`](other) {
		return Point3D[`-`](this, other);
	}
	/**
	 * @param {Number} factor 
	 */
	[`*`](factor) {
		return Point3D[`*`](this, factor);
	}
	/**
	 * @param {Number} factor 
	 */
	[`/`](factor) {
		return Point3D[`/`](this, factor);
	}
	clone() {
		return Point3D.clone(this);
	}
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.z;
		return;
	}
}
//#endregion

export {
	Point,
	Point1D,
	Point2D,
	Point3D,
};
