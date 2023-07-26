"use strict";

class Point1X {
	/**
	 * @param {Number} x 
	 */
	constructor(x) {
		this.x = x;
	}
	/** @type {Number} */ #x;
	get x() {
		return this.#x;
	}
	set x(value) {
		this.#x = value;
	}
	toString() {
		return `(${this.x})`;
	}
}

class Vector1X {
	/**
	 * @param {Point1X} first 
	 * @param {Point1X} second 
	 */
	static getDistanceBetween(first, second) {
		Math.hypot(first.x - second.x);
	}
	/**
	 * @param {Point1X} begin 
	 * @param {Point1X} end 
	 */
	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
	}
	/** @type {Point1X} */ #begin;
	get begin() {
		return this.#begin;
	}
	set begin(value) {
		this.#begin = value;
	}
	/** @type {Point1X} */ #end;
	get end() {
		return this.#end;
	}
	set end(value) {
		this.#end = value;
	}
	getLength() {
		return Vector1X.getDistanceBetween(this.end, this.begin);
	}
	toString() {
		return `${this.begin} => ${this.end}`;
	}
}

class Point2X extends Point1X {
	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	constructor(x, y) {
		super(x);
		this.y = y;
	}
	/** @type {Number} */ #y;
	get y() {
		return this.#y;
	}
	set y(value) {
		this.#y = value;
	}
	toString() {
		return `(${this.x}, ${this.y})`;
	}
}

class Vector2X {
	/**
	 * @param {Point2X} first 
	 * @param {Point2X} second 
	 */
	static getDistanceBetween(first, second) {
		Math.hypot(first.x - second.x, first.y - second.y);
	}
	/**
	 * @param {Point2X} begin 
	 * @param {Point2X} end 
	 */
	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
	}
	/** @type {Point2X} */ #begin;
	get begin() {
		return this.#begin;
	}
	set begin(value) {
		this.#begin = value;
	}
	/** @type {Point2X} */ #end;
	get end() {
		return this.#end;
	}
	set end(value) {
		this.#end = value;
	}
	getLength() {
		return Vector2X.getDistanceBetween(this.end, this.begin);
	}
	toString() {
		return `${this.begin} => ${this.end}`;
	}
}

class Point3X extends Point2X {
	/**
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} z
	 */
	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}
	/** @type {Number} */ #z;
	get z() {
		return this.#z;
	}
	set z(value) {
		this.#z = value;
	}
	toString() {
		return `(${this.x}, ${this.y}, ${this.z})`;
	}
}

class Vector3X {
	/**
	 * @param {Point3X} first 
	 * @param {Point3X} second 
	 */
	static getDistanceBetween(first, second) {
		Math.hypot(first.x - second.x, first.y - second.y, first.z - second.z);
	}
	/**
	 * @param {Point3X} begin 
	 * @param {Point3X} end 
	 */
	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
	}
	/** @type {Point3X} */ #begin;
	get begin() {
		return this.#begin;
	}
	set begin(value) {
		this.#begin = value;
	}
	/** @type {Point3X} */ #end;
	get end() {
		return this.#end;
	}
	set end(value) {
		this.#end = value;
	}
	getLength() {
		return Vector3X.getDistanceBetween(this.end, this.begin);
	}
	toString() {
		return `${this.begin} => ${this.end}`;
	}
}

// class Coordinate {
// 	/**
// 	 * @param {Array<Number>} properties 
// 	 */
// 	constructor(...properties) {
// 		const dimension = properties.length;
// 		if (dimension < 1 || 3 > dimension) {
// 			throw new RangeError(`Dimension must be between 1 and 3 included.`);
// 		}
// 		this.#metrics = new Array(dimension);
// 		for (let index = 0; index < this.#metrics.length; index++) {
// 			this.#metrics[index] = properties[index];
// 		}
// 	}
// 	/** @type {Array<Number>} */ #metrics;
// 	get x() {
// 		const value = this.#metrics[0];
// 		if (value === undefined) {
// 			throw new RangeError(`The dimension of the current coordinate does not allow getting this property.`);
// 		}
// 		return value;
// 	}
// 	get y() {
// 		const value = this.#metrics[1];
// 		if (value === undefined) {
// 			throw new RangeError(`The dimension of the current coordinate does not allow getting this property.`);
// 		}
// 		return value;
// 	}
// 	get z() {
// 		const value = this.#metrics[2];
// 		if (value === undefined) {
// 			throw new RangeError(`The dimension of the current coordinate does not allow getting this property.`);
// 		}
// 		return value;
// 	}
// 	toString() {
// 		return `(${this.#metrics.join(`, `)})`;
// 	}
// }