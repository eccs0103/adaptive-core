"use strict";

//#region Point
/**
 * Base class representing a point in a any-dimensional space.
 * @abstract
 */
class Point {
	/**
	 * Converts the point to a string with a fixed number of decimal places for each metric.
	 * @param {number} [digits] The number of digits to appear after the decimal point for each metric.
	 * @returns {string} A string representation of the point with fixed decimal places.
	 */
	toFixed(digits) {
		return `(${[...this].map(metric => metric.toFixed(digits)).join(`, `)})`;
	}
	/**
	 * Converts the point to a string using exponential notation for each metric.
	 * @param {number} [digits] The number of digits to appear after the decimal point for each metric.
	 * @returns {string} A string representation of the point using exponential notation.
	 */
	toExponential(digits) {
		return `(${[...this].map(metric => metric.toExponential(digits)).join(`, `)})`;
	}
	/**
	 * Converts the point to a string with a specified precision for each metric.
	 * @param {number} [precision] The number of significant digits for each metric.
	 * @returns {string} A string representation of the point with specified precision.
	 */
	toPrecision(precision) {
		return `(${[...this].map(metric => metric.toPrecision(precision)).join(`, `)})`;
	}
	/**
	 * Converts the point to a string, using a specified radix for each metric.
	 * @param {number} [radix] An integer between 2 and 36 specifying the base to use for representing numeric values.
	 * @returns {string} A string representation of the point in the specified radix.
	 */
	toString(radix) {
		return `(${[...this].map(metric => metric.toString(radix)).join(`, `)})`;
	}
	/**
	 * Converts the point to a localized string using the specified locales and formatting options for each metric.
	 * @param {Intl.LocalesArgument} [locales] A string with a BCP 47 language tag, or an array of such strings.
	 * @param {Intl.NumberFormatOptions} [options] An object with some or all of the properties of the Intl.NumberFormat object.
	 * @returns {string} A localized string representation of the point.
	 */
	toLocaleString(locales, options) {
		return `(${[...this].map(metric => metric.toLocaleString(locales, options)).join(`, `)})`;
	}
	/**
	 * Returns a generator for iterating over the metrics of the point.
	 * @returns {Generator<number>} A generator for iterating over the metrics.
	 */
	*[Symbol.iterator]() {
		throw new ReferenceError(`Not implemented function`);
	}
}
//#endregion
//#region Point 1D
/**
 * Represents a point in one-dimensional space.
 * @extends {Point}
 */
class Point1D extends Point {
	/**
	 * Adds two one-dimensional points.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} A new point representing the sum of the input points.
	 */
	static [`+`](first, second) {
		return new Point1D(first.x + second.x);
	}
	/**
	 * Subtracts the second one-dimensional point from the first.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} A new point representing the difference between the input points.
	 */
	static [`-`](first, second) {
		return new Point1D(first.x - second.x);
	}
	/**
	 * Multiplies two one-dimensional points.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} A new point representing the product of the input points.
	 */
	static [`*`](first, second) {
		return new Point1D(first.x * second.x);
	}
	/**
	 * Divides the first one-dimensional point by the second.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} A new point representing the quotient of the input points.
	 */
	static [`/`](first, second) {
		return new Point1D(first.x / second.x);
	}
	/**
	 * Creates a clone of a one-dimensional point.
	 * @param {Readonly<Point1D>} source The point to clone.
	 * @returns {Point1D} A new point with the same value as the input point.
	 */
	static clone(source) {
		return new Point1D(source.x);
	}
	/**
	 * Creates a one-dimensional point with the specified value.
	 * @param {number} value The value of the one-dimensional point.
	 * @returns {Point1D} A new one-dimensional point with the specified value.
	 */
	static repeat(value) {
		return new Point1D(value);
	}
	/**
	 * Gets a one-dimensional point with zero value.
	 * @readonly
	 * @returns {Point1D}
	 */
	static get ZERO() {
		return Point1D.repeat(0);
	}
	/**
	 * Creates a new one-dimensional point.
	 * @param {number} x The value of the point along the x-axis.
	 */
	constructor(x) {
		super();
		this.x = x;
	}
	/** @type {number} */
	#x = 0;
	/**
	 * Gets the x-coordinate of the point.
	 */
	get x() {
		return this.#x;
	}
	/**
	 * Sets the x-coordinate of the point.
	 */
	set x(value) {
		this.#x = value;
	}
	/**
	 * Adds another point to this point.
	 * @param {Readonly<Point1D>} other The point to add.
	 * @returns {Point1D} A new point representing the sum of this point and the input point.
	 */
	[`+`](other) {
		return Point1D[`+`](this, other);
	}
	/**
	 * Subtracts another point from this point.
	 * @param {Readonly<Point1D>} other The point to subtract.
	 * @returns {Point1D} A new point representing the difference between this point and the input point.
	 */
	[`-`](other) {
		return Point1D[`-`](this, other);
	}
	/**
	 * Multiplies this point by another point.
	 * @param {Readonly<Point1D>} other The point to multiply by.
	 * @returns {Point1D} A new point representing the product of this point and the input point.
	 */
	[`*`](other) {
		return Point1D[`*`](this, other);
	}
	/**
	 * Divides this point by another point.
	 * @param {Readonly<Point1D>} other The point to divide by.
	 * @returns {Point1D} A new point representing the quotient of this point and the input point.
	 */
	[`/`](other) {
		return Point1D[`/`](this, other);
	}
	/**
	 * Creates a clone of this point.
	 * @returns {Point1D} A new point with the same value as this point.
	 */
	clone() {
		return Point1D.clone(this);
	}
	/**
	 * Returns a generator for iterating over the metrics of this point.
	 * @returns {Generator<number>} A generator for iterating over the metrics.
	 */
	*[Symbol.iterator]() {
		yield this.x;
		return;
	}
}
//#endregion
//#region Point 2D
/**
 * Represents a point in two-dimensional space.
 * @extends {Point1D}
 */
class Point2D extends Point1D {
	/**
	 * Adds two two-dimensional points.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} A new point representing the sum of the input points.
	 */
	static [`+`](first, second) {
		return new Point2D(first.x + second.x, first.y + second.y);
	}
	/**
	 * Subtracts the second two-dimensional point from the first.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} A new point representing the difference between the input points.
	 */
	static [`-`](first, second) {
		return new Point2D(first.x - second.x, first.y - second.y);
	}
	/**
	 * Multiplies two two-dimensional points.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} A new point representing the product of the input points.
	 */
	static [`*`](first, second) {
		return new Point2D(first.x * second.x, first.y * second.y);
	}
	/**
	 * Divides the first two-dimensional point by the second.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} A new point representing the quotient of the input points.
	 */
	static [`/`](first, second) {
		return new Point2D(first.x / second.x, first.y / second.y);
	}
	/**
	 * Creates a clone of a two-dimensional point.
	 * @param {Readonly<Point2D>} source The point to clone.
	 * @returns {Point2D} A new point with the same value as the input point.
	 */
	static clone(source) {
		return new Point2D(source.x, source.y);
	}
	/**
	 * Creates a two-dimensional point with the specified value.
	 * @param {number} value The value of the two-dimensional point.
	 * @returns {Point2D} A new two-dimensional point with the specified value.
	 */
	static repeat(value) {
		return new Point2D(value, value);
	}
	/**
	 * Gets a two-dimensional point with zero value.
	 * @readonly
	 * @returns {Point2D}
	 */
	static get ZERO() {
		return Point2D.repeat(0);
	}
	/**
	 * Creates a new two-dimensional point.
	 * @param {number} x The value of the point along the x-axis.
	 * @param {number} y The value of the point along the y-axis.
	 */
	constructor(x, y) {
		super(x);
		this.y = y;
	}
	/** @type {number} */
	#y = 0;
	/**
	 * Gets the y-coordinate of the point.
	 */
	get y() {
		return this.#y;
	}
	/**
	 * Sets the y-coordinate of the point.
	 */
	set y(value) {
		this.#y = value;
	}
	/**
	 * Adds another point to this point.
	 * @param {Readonly<Point2D>} other The point to add.
	 * @returns {Point2D} A new point representing the sum of this point and the input point.
	 */
	[`+`](other) {
		return Point2D[`+`](this, other);
	}
	/**
	 * Subtracts another point from this point.
	 * @param {Readonly<Point2D>} other The point to subtract.
	 * @returns {Point2D} A new point representing the difference between this point and the input point.
	 */
	[`-`](other) {
		return Point2D[`-`](this, other);
	}
	/**
	 * Multiplies this point by another point.
	 * @param {Readonly<Point2D>} other The point to multiply by.
	 * @returns {Point2D} A new point representing the product of this point and the input point.
	 */
	[`*`](other) {
		return Point2D[`*`](this, other);
	}
	/**
	 * Divides this point by another point.
	 * @param {Readonly<Point2D>} other The point to divide by.
	 * @returns {Point2D} A new point representing the quotient of this point and the input point.
	 */
	[`/`](other) {
		return Point2D[`/`](this, other);
	}
	/**
	 * Creates a clone of this point.
	 * @returns {Point2D} A new point with the same value as this point.
	 */
	clone() {
		return Point2D.clone(this);
	}
	/**
	 * Returns a generator for iterating over the metrics of this point.
	 * @returns {Generator<number>} A generator for iterating over the metrics.
	 */
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		return;
	}
}
//#endregion
//#region Point 3D
/**
 * Represents a point in two-dimensional space.
 * @extends {Point2D}
 */
class Point3D extends Point2D {
	/**
	 * Adds two two-dimensional points.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} A new point representing the sum of the input points.
	 */
	static [`+`](first, second) {
		return new Point3D(first.x + second.x, first.y + second.y, first.z + second.z);
	}
	/**
	 * Subtracts the second two-dimensional point from the first.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} A new point representing the difference between the input points.
	 */
	static [`-`](first, second) {
		return new Point3D(first.x - second.x, first.y - second.y, first.z - second.z);
	}
	/**
	 * Multiplies two two-dimensional points.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} A new point representing the product of the input points.
	 */
	static [`*`](first, second) {
		return new Point3D(first.x * second.x, first.y * second.y, first.z * second.z);
	}
	/**
	 * Divides the first two-dimensional point by the second.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} A new point representing the quotient of the input points.
	 */
	static [`/`](first, second) {
		return new Point3D(first.x / second.x, first.y / second.y, first.z / second.z);
	}
	/**
	 * Creates a clone of a two-dimensional point.
	 * @param {Readonly<Point3D>} source The point to clone.
	 * @returns {Point3D} A new point with the same value as the input point.
	 */
	static clone(source) {
		return new Point3D(source.x, source.y, source.z);
	}
	/**
	 * Creates a two-dimensional point with the specified value.
	 * @param {number} value The value of the two-dimensional point.
	 * @returns {Point3D} A new two-dimensional point with the specified value.
	 */
	static repeat(value) {
		return new Point3D(value, value, value);
	}
	/**
	 * Gets a two-dimensional point with zero value.
	 * @readonly
	 * @returns {Point3D}
	 */
	static get ZERO() {
		return Point3D.repeat(0);
	}
	/**
	 * Creates a new two-dimensional point.
	 * @param {number} x The value of the point along the x-axis.
	 * @param {number} y The value of the point along the y-axis.
	 * @param {number} z The value of the point along the z-axis.
	 */
	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}
	/** @type {number} */
	#z = 0;
	/**
	 * Gets the z-coordinate of the point.
	 */
	get z() {
		return this.#z;
	}
	/**
	 * Sets the z-coordinate of the point.
	 */
	set z(value) {
		this.#z = value;
	}
	/**
	 * Adds another point to this point.
	 * @param {Readonly<Point3D>} other The point to add.
	 * @returns {Point3D} A new point representing the sum of this point and the input point.
	 */
	[`+`](other) {
		return Point3D[`+`](this, other);
	}
	/**
	 * Subtracts another point from this point.
	 * @param {Readonly<Point3D>} other The point to subtract.
	 * @returns {Point3D} A new point representing the difference between this point and the input point.
	 */
	[`-`](other) {
		return Point3D[`-`](this, other);
	}
	/**
	 * Multiplies this point by another point.
	 * @param {Readonly<Point3D>} other The point to multiply by.
	 * @returns {Point3D} A new point representing the product of this point and the input point.
	 */
	[`*`](other) {
		return Point3D[`*`](this, other);
	}
	/**
	 * Divides this point by another point.
	 * @param {Readonly<Point3D>} other The point to divide by.
	 * @returns {Point3D} A new point representing the quotient of this point and the input point.
	 */
	[`/`](other) {
		return Point3D[`/`](this, other);
	}
	/**
	 * Creates a clone of this point.
	 * @returns {Point3D} A new point with the same value as this point.
	 */
	clone() {
		return Point3D.clone(this);
	}
	/**
	 * Returns a generator for iterating over the metrics of this point.
	 * @returns {Generator<number>} A generator for iterating over the metrics.
	 */
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.z;
		return;
	}
}
//#endregion

//#region Matrix
/**
 * Represents a generic matrix.
 * @template Item 
 */
class Matrix {
	/**
	 * Initializes a new instance of the Matrix class.
	 * @param {Readonly<Point2D>} size The size of the matrix.
	 * @param {Item} [initial] The initial value for all matrix elements.
	 */
	constructor(size, initial) {
		this.#size = size.clone();
		/** @type {Item[][]} */
		const data = (this.#data = new Array(this.#size.y));
		for (let y = 0; y < data.length; y++) {
			/** @type {Item[]} */
			const row = (data[y] = new Array(this.#size.x));
			for (let x = 0; x < row.length; x++) {
				if (initial !== undefined) {
					/** @type {Item} */
					(row[x] == initial);
				}
			}
		}
	}
	/** @type {Point2D} */
	#size;
	/** 
	 * Gets the size of the matrix.
	 * @readonly 
	 */
	get size() {
		return Object.freeze(this.#size);
	}
	/** @type {Item[][]} */
	#data;
	/**
	 * Gets the value at the specified position in the matrix.
	 * @param {Readonly<Point2D>} position The position in the matrix.
	 * @returns {Item} The value at the specified position.
	 */
	get(position) {
		const matrix = this.#data;
		if (matrix === undefined) return matrix;
		const row = matrix[position.y];
		if (row === undefined) return row;
		return row[position.x];
	}
	/**
	 * Sets the value at the specified position in the matrix.
	 * @param {Readonly<Point2D>} position The position in the matrix.
	 * @param {Item} value The value to set.
	 */
	set(position, value) {
		if (this.#data === undefined) this.#data = new Array(this.#size.y);
		const matrix = this.#data;
		if (matrix[position.y] === undefined) matrix[position.y] = new Array(this.#size.x);
		const row = matrix[position.y];
		row[position.x] = value;
	}
};
//#endregion

export { Point, Point1D, Point2D, Point3D, Matrix };
