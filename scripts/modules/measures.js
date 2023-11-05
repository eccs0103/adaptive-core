"use strict";

//#region Point
class Point {
	/**
	 * @param {Point} source 
	 */
	static clone(source) {
		const result = new Point(...source.metrics);
		return result;
	}
	/**
	 * @param  {Number[]} metrics 
	 */
	constructor(...metrics) {
		this.metrics.push(...metrics);
	}
	/** @type {Number[]} */ #metrics = [];
	/** @readonly */ get metrics() {
		return this.#metrics;
	}
	clone() {
		return Point.clone(this);
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
}
//#endregion
//#region Point 1D
class Point1D extends Point {
	/**
	 * @param {Point1D} source 
	 */
	static clone(source) {
		const result = new Point1D(source.x);
		return result;
	}
	/**
	 * @param {Point1D} source 
	 */
	static toBaseSegment(source) {
		const zero = source.clone();
		for (let index = 0; index < zero.metrics.length; index++) {
			zero.metrics[index] = 0;
		}
		const result = new Segment(zero, source.clone());
		return result;
	}
	/**
	 * @param {Number} x 
	 */
	constructor(x) {
		super();
		this.x = x;
	}
	get x() {
		return this.metrics[0];
	}
	set x(value) {
		this.metrics[0] = value;
	}
	clone() {
		return Point1D.clone(this);
	}
	toBaseSegment() {
		return Point1D.toBaseSegment(this);
	}
}
//#endregion
//#region Point 2D
class Point2D extends Point1D {
	/**
	 * @param {Point2D} source 
	 */
	static clone(source) {
		const result = new Point2D(source.x, source.y);
		return result;
	}
	/**
	 * @param {Point2D} source 
	 */
	static toBaseSegment(source) {
		const zero = source.clone();
		for (let index = 0; index < zero.metrics.length; index++) {
			zero.metrics[index] = 0;
		}
		const result = new Segment(zero, source.clone());
		return result;
	}
	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	constructor(x, y) {
		super(x);
		this.y = y;
	}
	get y() {
		return this.metrics[1];
	}
	set y(value) {
		this.metrics[1] = value;
	}
	clone() {
		return Point2D.clone(this);
	}
	toBaseSegment() {
		return Point2D.toBaseSegment(this);
	}
}
//#endregion
//#region Point 3D
class Point3D extends Point2D {
	/**
	 * @param {Point3D} source 
	 */
	static clone(source) {
		const result = new Point3D(source.x, source.y, source.z);
		return result;
	}
	/**
	 * @param {Point3D} source 
	 */
	static toBaseSegment(source) {
		const zero = source.clone();
		for (let index = 0; index < zero.metrics.length; index++) {
			zero.metrics[index] = 0;
		}
		const result = new Segment(zero, source.clone());
		return result;
	}
	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} z 
	 */
	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}
	get z() {
		return this.metrics[2];
	}
	set z(value) {
		this.metrics[2] = value;
	}
	clone() {
		return Point3D.clone(this);
	}
	toBaseSegment() {
		return Point3D.toBaseSegment(this);
	}
}
//#endregion
//#region Segment
/**
 * @template {Point1D} T
 */
class Segment {
	/**
	 * @template {Point1D} T
	 * @param {Segment<T>} source 
	 */
	static clone(source) {
		const result = new Segment(source.begin, source.end);
		return result;
	}
	/**
	 * @template {Point1D} T
	 * @param {Segment<T>} source 
	 */
	static toBasePoint(source) {
		const result = source.end.clone();
		for (let index = 0; index < result.metrics.length; index++) {
			result.metrics[index] -= source.begin[index];
		}
		return result;
	}
	/**
	 * @template {Point1D} T
	 * @param {T} first 
	 * @param {T} second 
	 */
	static getDistanceBetween(first, second) {
		return Math.hypot(...first.metrics.map((metric, index) => metric - second.metrics[index]));
	}
	/**
	 * @param {T} begin 
	 * @param {T} end 
	 */
	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
	}
	/** @type {T} */ #begin;
	get begin() {
		return this.#begin;
	}
	set begin(value) {
		this.#begin = value;
	}
	/** @type {T} */ #end;
	get end() {
		return this.#end;
	}
	set end(value) {
		this.#end = value;
	}
	clone() {
		return Segment.clone(this);
	}
	getLength() {
		return Segment.getDistanceBetween(this.begin, this.end);
	}
	toBasePoint() {
		return Segment.toBasePoint(this);
	}
	/**
	 * @param {Number} [digits] 
	 */
	toFixed(digits) {
		return `${this.begin.toFixed(digits)} => ${this.end.toFixed(digits)}`;
	}
	/**
	 * @param {Number} [digits] 
	 */
	toExponential(digits) {
		return `${this.begin.toExponential(digits)} => ${this.end.toExponential(digits)}`;
	}
	/**
	 * @param {Number} [precision] 
	 */
	toPrecision(precision) {
		return `${this.begin.toPrecision(precision)} => ${this.end.toPrecision(precision)}`;
	}
	/**
	 * @param {Number} [radix] 
	 */
	toString(radix) {
		return `${this.begin.toString(radix)} => ${this.end.toString(radix)}`;
	}
	/**
	 * @param {String | String[]} [locales] 
	 * @param {Intl.NumberFormatOptions} [options] 
	 */
	toLocaleString(locales, options) {
		return `${this.begin.toLocaleString(locales, options)} => ${this.end.toLocaleString(locales, options)}`;
	}
}
//#endregion

export {
	Point,
	Point1D,
	Point2D,
	Point3D,
	Segment
};
