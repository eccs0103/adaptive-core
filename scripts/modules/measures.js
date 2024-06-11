"use strict";

const { hypot, abs, trunc } = Math;

//#region Point
/**
 * Abstract base class representing a point.
 * @abstract
 */
class Point {
	/**
	 * Returns a string representation of the point with a fixed number of digits after the decimal point.
	 * @param {number} [digits] The number of digits to appear after the decimal point.
	 * @returns {string} A string representation of the point.
	 */
	toFixed(digits) {
		return `(${Array.from(this).map(metric => metric.toFixed(digits)).join(`, `)})`;
	}
	/**
	 * Returns a string representation of the point in exponential notation.
	 * @param {number} [digits] The number of digits to appear after the decimal point.
	 * @returns {string} A string representation of the point in exponential notation.
	 */
	toExponential(digits) {
		return `(${Array.from(this).map(metric => metric.toExponential(digits)).join(`, `)})`;
	}
	/**
	 * Returns a string representation of the point with a specified precision.
	 * @param {number} [precision] The number of significant digits.
	 * @returns {string} A string representation of the point with the specified precision.
	 */
	toPrecision(precision) {
		return `(${Array.from(this).map(metric => metric.toPrecision(precision)).join(`, `)})`;
	}
	/**
	 * Returns a string representation of the point in the specified radix (base).
	 * @param {number} [radix] An integer between 2 and 36 specifying the base to use for representing numeric values.
	 * @returns {string} A string representation of the point in the specified radix.
	 */
	toString(radix) {
		return `(${Array.from(this).map(metric => metric.toString(radix)).join(`, `)})`;
	}
	/**
	 * Returns a string representation of the point formatted according to the specified locale and formatting options.
	 * @param {Intl.LocalesArgument} [locales] A string with a BCP 47 language tag, or an array of such strings.
	 * @param {Intl.NumberFormatOptions} [options] An object with some or all of the following properties.
	 * @returns {string} A string representation of the point formatted according to the specified locale and formatting options.
	 */
	toLocaleString(locales, options) {
		return `(${Array.from(this).map(metric => metric.toLocaleString(locales, options)).join(`, `)})`;
	}
	/**
	 * Returns an iterator object that yields each component of the point.
	 * @abstract
	 * @returns {Iterator<number>} An iterator object.
	 */
	*[Symbol.iterator]() {
		throw new ReferenceError(`Not implemented function`);
	}
}
//#endregion
//#region Point 1D
/**
 * Represents a point in one-dimensional space.
 */
class Point1D extends Point {
	//#region Modifiers
	/**
	 * Calculates the distance between two points in one-dimensional space.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {number} The distance between the two points.
	 */
	static getDistanceBetween(first, second) {
		return hypot(first.x - second.x);
	}
	//#endregion
	//#region Constructors
	/**
	 * Static method to add two points.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} The result of adding the two points.
	 */
	static [`+`](first, second) {
		return new Point1D(first.x + second.x);
	}
	/**
	 * Static method to subtract one point from another.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} The result of subtracting the second point from the first.
	 */
	static [`-`](first, second) {
		return new Point1D(first.x - second.x);
	}
	/**
	 * Static method to multiply two points.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} The result of multiplying the two points.
	 */
	static [`*`](first, second) {
		return new Point1D(first.x * second.x);
	}
	/**
	 * Static method to divide one point by another.
	 * @param {Readonly<Point1D>} first The first point.
	 * @param {Readonly<Point1D>} second The second point.
	 * @returns {Point1D} The result of dividing the first point by the second.
	 */
	static [`/`](first, second) {
		return new Point1D(first.x / second.x);
	}
	/**
	 * Static method to clone a point.
	 * @param {Readonly<Point1D>} source The point to clone.
	 * @returns {Point1D} A new point with the same coordinates as the source point.
	 */
	static clone(source) {
		return new Point1D(source.x);
	}
	/**
	 * Static method to create a point with a repeated value.
	 * @param {number} value The value to repeat.
	 * @returns {Point1D} A new point with the specified value.
	 */
	static repeat(value) {
		return new Point1D(value);
	}
	/**
	 * Returns the NaN point (NaN).
	 * @readonly
	 * @returns {Point1D} The NaN point.
	 */
	static get NAN() {
		return Point1D.repeat(NaN);
	}
	/** @type {Readonly<Point1D>} */
	static #CONSTANT_NAN = Object.freeze(Point1D.NAN);
	/**
	 * Returns the constant NaN point (NaN).
	 * @readonly
	 * @returns {Readonly<Point1D>} The constant NaN point.
	 */
	static get CONSTANT_NAN() {
		return this.#CONSTANT_NAN;
	}
	/**
	 * Returns the zero point (0).
	 * @readonly
	 * @returns {Point1D} The zero point.
	 */
	static get ZERO() {
		return Point1D.repeat(0);
	}
	/** @type {Readonly<Point1D>} */
	static #CONSTANT_ZERO = Object.freeze(Point1D.ZERO);
	/**
	 * Returns the constant zero point (0).
	 * @readonly
	 * @returns {Readonly<Point1D>} The constant zero point.
	 */
	static get CONSTANT_ZERO() {
		return this.#CONSTANT_ZERO;
	}
	/**
	 * Returns the single point (1).
	 * @readonly
	 * @returns {Point1D} The single point.
	 */
	static get SINGLE() {
		return Point1D.repeat(1);
	}
	/** @type {Readonly<Point1D>} */
	static #CONSTANT_SINGLE = Object.freeze(Point1D.SINGLE);
	/**
	 * Returns the constant single point (1).
	 * @readonly
	 * @returns {Readonly<Point1D>} The constant single point.
	 */
	static get CONSTANT_SINGLE() {
		return this.#CONSTANT_SINGLE;
	}
	/**
	 * Returns the double point (2).
	 * @readonly
	 * @returns {Point1D} The double point.
	 */
	static get DOUBLE() {
		return Point1D.repeat(2);
	}
	/** @type {Readonly<Point1D>} */
	static #CONSTANT_DOUBLE = Object.freeze(Point1D.DOUBLE);
	/**
	 * Returns the constant double point (2).
	 * @readonly
	 * @returns {Readonly<Point1D>} The constant double point.
	 */
	static get CONSTANT_DOUBLE() {
		return this.#CONSTANT_DOUBLE;
	}
	/**
	 * @param {number} x The x-coordinate of the point.
	 */
	constructor(x) {
		super();
		this.x = x;
	}
	//#endregion
	//#region Properties
	/** @type {number} */
	#x = 0;
	/**
	 * Gets the x-coordinate of the point.
	 * @returns {number} The x-coordinate.
	 */
	get x() {
		return this.#x;
	}
	/**
	 * Sets the x-coordinate of the point.
	 * @param {number} value The new value for the x-coordinate.
	 */
	set x(value) {
		this.#x = value;
	}
	//#endregion
	//#region Methods
	/**
	 * Calculates the distance from this point to another point in one-dimensional space.
	 * @param {Readonly<Point1D>} other The other point.
	 * @returns {number} The distance from this point to the other point.
	 */
	getDistanceFrom(other) {
		return Point1D.getDistanceBetween(this, other);
	}
	/**
	 * Adds another point to this point.
	 * @param {Readonly<Point1D>} other The point to add.
	 * @returns {Point1D} The result of adding the other point to this point.
	 */
	[`+`](other) {
		return Point1D[`+`](this, other);
	}
	/**
	 * Subtracts another point from this point.
	 * @param {Readonly<Point1D>} other The point to subtract.
	 * @returns {Point1D} The result of subtracting the other point from this point.
	 */
	[`-`](other) {
		return Point1D[`-`](this, other);
	}
	/**
	 * Multiplies this point by another point.
	 * @param {Readonly<Point1D>} other The point to multiply by.
	 * @returns {Point1D} The result of multiplying this point by the other point.
	 */
	[`*`](other) {
		return Point1D[`*`](this, other);
	}
	/**
	 * Divides this point by another point.
	 * @param {Readonly<Point1D>} other The point to divide by.
	 * @returns {Point1D} The result of dividing this point by the other point.
	 */
	[`/`](other) {
		return Point1D[`/`](this, other);
	}
	/**
	 * Creates a clone of this point.
	 * @returns {Point1D} A new point with the same coordinates as this point.
	 */
	clone() {
		return Point1D.clone(this);
	}
	/**
	 * Returns an iterator that yields the x-coordinate of the point.
	 * @returns {Iterator<number>} An iterator object that yields the x-coordinate.
	 */
	*[Symbol.iterator]() {
		yield this.x;
		return;
	}
	//#endregion
}
//#endregion
//#region Point 2D
/**
 * Represents a point in two-dimensional space.
 */
class Point2D extends Point1D {
	//#region Modifiers
	/**
	 * Calculates the distance between two points in two-dimensional space.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {number} The distance between the two points.
	 */
	static getDistanceBetween(first, second) {
		return hypot(first.x - second.x, first.y - second.y);
	}
	//#endregion
	//#region Constructors
	/**
	 * Static method to add two points.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} The result of adding the two points.
	 */
	static [`+`](first, second) {
		return new Point2D(first.x + second.x, first.y + second.y);
	}
	/**
	 * Static method to subtract one point from another.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} The result of subtracting the second point from the first.
	 */
	static [`-`](first, second) {
		return new Point2D(first.x - second.x, first.y - second.y);
	}
	/**
	 * Static method to multiply two points.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} The result of multiplying the two points.
	 */
	static [`*`](first, second) {
		return new Point2D(first.x * second.x, first.y * second.y);
	}
	/**
	 * Static method to divide one point by another.
	 * @param {Readonly<Point2D>} first The first point.
	 * @param {Readonly<Point2D>} second The second point.
	 * @returns {Point2D} The result of dividing the first point by the second.
	 */
	static [`/`](first, second) {
		return new Point2D(first.x / second.x, first.y / second.y);
	}
	/**
	 * Static method to clone a point.
	 * @param {Readonly<Point2D>} source The point to clone.
	 * @returns {Point2D} A new point with the same coordinates as the source point.
	 */
	static clone(source) {
		return new Point2D(source.x, source.y);
	}
	/**
	 * Static method to create a point with a repeated value.
	 * @param {number} value The value to repeat.
	 * @returns {Point2D} A new point with the specified value.
	 */
	static repeat(value) {
		return new Point2D(value, value);
	}
	/**
	 * Returns the NaN point (NaN, NaN).
	 * @readonly
	 * @returns {Point2D} The NaN point.
	 */
	static get NAN() {
		return Point2D.repeat(NaN);
	}
	/** @type {Readonly<Point2D>} */
	static #CONSTANT_NAN = Object.freeze(Point2D.NAN);
	/**
	 * Returns the constant NaN point (NaN, NaN).
	 * @readonly
	 * @returns {Readonly<Point2D>} The constant NaN point.
	 */
	static get CONSTANT_NAN() {
		return this.#CONSTANT_NAN;
	}
	/**
	 * Returns the zero point (0, 0).
	 * @readonly
	 * @returns {Point2D} The zero point.
	 */
	static get ZERO() {
		return Point2D.repeat(0);
	}
	/** @type {Readonly<Point2D>} */
	static #CONSTANT_ZERO = Object.freeze(Point2D.ZERO);
	/**
	 * Returns the constant zero point (0, 0).
	 * @readonly
	 * @returns {Readonly<Point2D>} The constant zero point.
	 */
	static get CONSTANT_ZERO() {
		return this.#CONSTANT_ZERO;
	}
	/**
	 * Returns the single point (1, 1).
	 * @readonly
	 * @returns {Point2D} The single point.
	 */
	static get SINGLE() {
		return Point2D.repeat(1);
	}
	/** @type {Readonly<Point2D>} */
	static #CONSTANT_SINGLE = Object.freeze(Point2D.SINGLE);
	/**
	 * Returns the constant single point (1, 1).
	 * @readonly
	 * @returns {Readonly<Point2D>} The constant single point.
	 */
	static get CONSTANT_SINGLE() {
		return this.#CONSTANT_SINGLE;
	}
	/**
	 * Returns the double point (2, 2).
	 * @readonly
	 * @returns {Point2D} The double point.
	 */
	static get DOUBLE() {
		return Point2D.repeat(2);
	}
	/** @type {Readonly<Point2D>} */
	static #CONSTANT_DOUBLE = Object.freeze(Point2D.DOUBLE);
	/**
	 * Returns the constant double point (2, 2).
	 * @readonly
	 * @returns {Readonly<Point2D>} The constant double point.
	 */
	static get CONSTANT_DOUBLE() {
		return this.#CONSTANT_DOUBLE;
	}
	/**
	 * @param {number} x The x-coordinate of the point.
	 * @param {number} y The y-coordinate of the point.
	 */
	constructor(x, y) {
		super(x);
		this.y = y;
	}
	//#endregion
	//#region Properties
	/** @type {number} */
	#y = 0;
	/**
	 * Gets the y-coordinate of the point.
	 * @returns {number} The y-coordinate.
	 */
	get y() {
		return this.#y;
	}
	/**
	 * Sets the y-coordinate of the point.
	 * @param {number} value The new value for the y-coordinate.
	 */
	set y(value) {
		this.#y = value;
	}
	//#endregion
	//#region Methods
	/**
	 * Calculates the distance from this point to another point in two-dimensional space.
	 * @param {Readonly<Point2D>} other The other point.
	 * @returns {number} The distance from this point to the other point.
	 */
	getDistanceFrom(other) {
		return Point2D.getDistanceBetween(this, other);
	}
	/**
	 * Adds another point to this point.
	 * @param {Readonly<Point2D>} other The point to add.
	 * @returns {Point2D} The result of adding the other point to this point.
	 */
	[`+`](other) {
		return Point2D[`+`](this, other);
	}
	/**
	 * Subtracts another point from this point.
	 * @param {Readonly<Point2D>} other The point to subtract.
	 * @returns {Point2D} The result of subtracting the other point from this point.
	 */
	[`-`](other) {
		return Point2D[`-`](this, other);
	}
	/**
	 * Multiplies this point by another point.
	 * @param {Readonly<Point2D>} other The point to multiply by.
	 * @returns {Point2D} The result of multiplying this point by the other point.
	 */
	[`*`](other) {
		return Point2D[`*`](this, other);
	}
	/**
	 * Divides this point by another point.
	 * @param {Readonly<Point2D>} other The point to divide by.
	 * @returns {Point2D} The result of dividing this point by the other point.
	 */
	[`/`](other) {
		return Point2D[`/`](this, other);
	}
	/**
	 * Creates a clone of this point.
	 * @returns {Point2D} A new point with the same coordinates as this point.
	 */
	clone() {
		return Point2D.clone(this);
	}
	/**
	 * Returns an iterator that yields the coordinates of the point.
	 * @returns {Iterator<number>} An iterator object that yields the coordinates.
	 */
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		return;
	}
	//#endregion
}
//#endregion
//#region Point 3D
/**
 * Represents a point in three-dimensional space.
 */
class Point3D extends Point2D {
	//#region Modifiers
	/**
	 * Calculates the distance between two points in three-dimensional space.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {number} The distance between the two points.
	 */
	static getDistanceBetween(first, second) {
		return hypot(first.x - second.x, first.y - second.y, first.z - second.z);
	}
	//#endregion
	//#region Constructors
	/**
	 * Static method to add two points.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} The result of adding the two points.
	 */
	static [`+`](first, second) {
		return new Point3D(first.x + second.x, first.y + second.y, first.z + second.z);
	}
	/**
	 * Static method to subtract one point from another.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} The result of subtracting the second point from the first.
	 */
	static [`-`](first, second) {
		return new Point3D(first.x - second.x, first.y - second.y, first.z - second.z);
	}
	/**
	 * Static method to multiply two points.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} The result of multiplying the two points.
	 */
	static [`*`](first, second) {
		return new Point3D(first.x * second.x, first.y * second.y, first.z * second.z);
	}
	/**
	 * Static method to divide one point by another.
	 * @param {Readonly<Point3D>} first The first point.
	 * @param {Readonly<Point3D>} second The second point.
	 * @returns {Point3D} The result of dividing the first point by the second.
	 */
	static [`/`](first, second) {
		return new Point3D(first.x / second.x, first.y / second.y, first.z / second.z);
	}
	/**
	 * Static method to clone a point.
	 * @param {Readonly<Point3D>} source The point to clone.
	 * @returns {Point3D} A new point with the same coordinates as the source point.
	 */
	static clone(source) {
		return new Point3D(source.x, source.y, source.z);
	}
	/**
	 * Static method to create a point with a repeated value.
	 * @param {number} value The value to repeat.
	 * @returns {Point3D} A new point with the specified value.
	 */
	static repeat(value) {
		return new Point3D(value, value, value);
	}
	/**
	 * Returns the NaN point (NaN, NaN, NaN).
	 * @readonly
	 * @returns {Point3D} The NaN point.
	 */
	static get NAN() {
		return Point3D.repeat(NaN);
	}
	/** @type {Readonly<Point3D>} */
	static #CONSTANT_NAN = Object.freeze(Point3D.NAN);
	/**
	 * Returns the constant NaN point (NaN, NaN, NaN).
	 * @readonly
	 * @returns {Readonly<Point3D>} The constant NaN point.
	 */
	static get CONSTANT_NAN() {
		return this.#CONSTANT_NAN;
	}
	/**
	 * Returns the zero point (0, 0, 0).
	 * @readonly
	 * @returns {Point3D} The zero point.
	 */
	static get ZERO() {
		return Point3D.repeat(0);
	}
	/** @type {Readonly<Point3D>} */
	static #CONSTANT_ZERO = Object.freeze(Point3D.ZERO);
	/**
	 * Returns the constant zero point (0, 0, 0).
	 * @readonly
	 * @returns {Readonly<Point3D>} The constant zero point.
	 */
	static get CONSTANT_ZERO() {
		return this.#CONSTANT_ZERO;
	}
	/**
	 * Returns the single point (1, 1, 1).
	 * @readonly
	 * @returns {Point3D} The single point.
	 */
	static get SINGLE() {
		return Point3D.repeat(1);
	}
	/** @type {Readonly<Point3D>} */
	static #CONSTANT_SINGLE = Object.freeze(Point3D.SINGLE);
	/**
	 * Returns the constant single point (1, 1, 1).
	 * @readonly
	 * @returns {Readonly<Point3D>} The constant single point.
	 */
	static get CONSTANT_SINGLE() {
		return this.#CONSTANT_SINGLE;
	}
	/**
	 * Returns the double point (2, 2, 2).
	 * @readonly
	 * @returns {Point3D} The double point.
	 */
	static get DOUBLE() {
		return Point3D.repeat(2);
	}
	/** @type {Readonly<Point3D>} */
	static #CONSTANT_DOUBLE = Object.freeze(Point3D.DOUBLE);
	/**
	 * Returns the constant double point (2, 2, 2).
	 * @readonly
	 * @returns {Readonly<Point3D>} The constant double point.
	 */
	static get CONSTANT_DOUBLE() {
		return this.#CONSTANT_DOUBLE;
	}
	/**
	 * @param {number} x The x-coordinate of the point.
	 * @param {number} y The y-coordinate of the point.
	 * @param {number} z The z-coordinate of the point.
	 */
	constructor(x, y, z) {
		super(x, y);
		this.z = z;
	}
	//#endregion
	//#region Properties
	/** @type {number} */
	#z = 0;
	/**
	 * Gets the z-coordinate of the point.
	 * @returns {number} The z-coordinate.
	 */
	get z() {
		return this.#z;
	}
	/**
	 * Sets the z-coordinate of the point.
	 * @param {number} value The new value for the z-coordinate.
	 */
	set z(value) {
		this.#z = value;
	}
	//#endregion
	//#region Methods
	/**
	 * Calculates the distance from this point to another point in three-dimensional space.
	 * @param {Readonly<Point3D>} other The other point.
	 * @returns {number} The distance from this point to the other point.
	 */
	getDistanceFrom(other) {
		return Point3D.getDistanceBetween(this, other);
	}
	/**
	 * Adds another point to this point.
	 * @param {Readonly<Point3D>} other The point to add.
	 * @returns {Point3D} The result of adding the other point to this point.
	 */
	[`+`](other) {
		return Point3D[`+`](this, other);
	}
	/**
	 * Subtracts another point from this point.
	 * @param {Readonly<Point3D>} other The point to subtract.
	 * @returns {Point3D} The result of subtracting the other point from this point.
	 */
	[`-`](other) {
		return Point3D[`-`](this, other);
	}
	/**
	 * Multiplies this point by another point.
	 * @param {Readonly<Point3D>} other The point to multiply by.
	 * @returns {Point3D} The result of multiplying this point by the other point.
	 */
	[`*`](other) {
		return Point3D[`*`](this, other);
	}
	/**
	 * Divides this point by another point.
	 * @param {Readonly<Point3D>} other The point to divide by.
	 * @returns {Point3D} The result of dividing this point by the other point.
	 */
	[`/`](other) {
		return Point3D[`/`](this, other);
	}
	/**
	 * Creates a clone of this point.
	 * @returns {Point3D} A new point with the same coordinates as this point.
	 */
	clone() {
		return Point3D.clone(this);
	}
	/**
	 * Returns an iterator that yields the coordinates of the point.
	 * @returns {Iterator<number>} An iterator object that yields the coordinates.
	 */
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.z;
		return;
	}
	//#endregion
}
//#endregion

//#region Matrix
/**
 * Represents a matrix with generic data type.
 * @template T
 */
class Matrix {
	/**
	 * @param {Readonly<Point2D>} size The size of the matrix.
	 * @param {T} initial The initial value for all elements in the matrix.
	 * @throws {TypeError} If the x or y coordinate of the size is not an integer.
	 * @throws {RangeError} If the x or y coordinate of the size is negative.
	 */
	constructor(size, initial) {
		if (!Number.isInteger(size.x)) throw new TypeError(`The x-coordinate of size ${size} must be finite integer number`);
		if (size.x < 0) throw new RangeError(`The x-coordinate of size ${size} is out of range [0 - +∞)`);
		if (!Number.isInteger(size.y)) throw new TypeError(`The y-coordinate of size ${size} must be finite integer number`);
		if (size.y < 0) throw new RangeError(`The x-coordinate of size ${size} is out of range [0 - +∞)`);
		this.#size = size;
		/** @type {T[][]} */
		const data = (this.#data = new Array(size.y));
		for (let y = 0; y < data.length; y++) {
			/** @type {T[]} */
			const row = (data[y] = new Array(size.x));
			for (let x = 0; x < row.length; x++) {
				(row[x] = initial);
			}
		}
	}
	/** @type {Readonly<Point2D>} */
	#size;
	/** 
	 * Gets the size of the matrix.
	 * @readonly 
	 * @returns {Readonly<Point2D>} The size of the matrix.
	 */
	get size() {
		return this.#size;
	}
	/** @type {T[][]} */
	#data;
	/**
	 * Gets the value at the specified position in the matrix.
	 * @param {Readonly<Point2D>} position The position to get the value from.
	 * @returns {T} The value at the specified position.
	 * @throws {TypeError} If the x or y coordinate of the position is not an integer.
	 * @throws {RangeError} If the x or y coordinate of the position is out of range.
	 */
	get(position) {
		if (!Number.isInteger(position.x)) throw new TypeError(`The x-coordinate of position ${position} must be finite integer number`);
		if (0 > position.x || position.x >= this.#size.x) throw new RangeError(`The x-coordinate of position ${position} is out of range [0 - ${this.#size.x})`);
		if (!Number.isInteger(position.y)) throw new TypeError(`The y-coordinate of position ${position} must be finite integer number`);
		if (0 > position.y || position.y >= this.#size.y) throw new RangeError(`The x-coordinate of position ${position} is out of range [0 - ${this.#size.y})`);
		return this.#data[position.y][position.x];
	}
	/**
	 * Sets the value at the specified position in the matrix.
	 * @param {Readonly<Point2D>} position The position to set the value at.
	 * @param {T} value The value to set.
	 * @throws {TypeError} If the x or y coordinate of the position is not an integer.
	 * @throws {RangeError} If the x or y coordinate of the position is out of range.
	 */
	set(position, value) {
		if (!Number.isInteger(position.x)) throw new TypeError(`The x-coordinate of position ${position} must be finite integer number`);
		if (0 > position.x || position.x >= this.#size.x) throw new RangeError(`The x-coordinate of position ${position} is out of range [0 - ${this.#size.x})`);
		if (!Number.isInteger(position.y)) throw new TypeError(`The y-coordinate of position ${position} must be finite integer number`);
		if (0 > position.y || position.y >= this.#size.y) throw new RangeError(`The x-coordinate of position ${position} is out of range [0 - ${this.#size.y})`);
		this.#data[position.y][position.x] = value;
	}
}
//#endregion

//#region Timespan
/**
 * Represents a duration of time.
 */
class Timespan {
	//#region Converters
	/**
	 * @param {number} duration
	 * @returns {[boolean, number, number, number, number]}
	 */
	static #toTime(duration) {
		const negativity = duration < 0;
		duration = abs(duration);
		const milliseconds = duration % 1000;
		duration = trunc(duration / 1000);
		const seconds = duration % 60;
		duration = trunc(duration / 60);
		const minutes = duration % 60;
		duration = trunc(duration / 60);
		const hours = duration;
		return [negativity, hours, minutes, seconds, milliseconds];
	}
	/**
	 * @param {boolean} negativity
	 * @param {number} hours
	 * @param {number} minutes
	 * @param {number} seconds
	 * @param {number} milliseconds
	 * @returns {number}
	 */
	static #toDuration(negativity, hours, minutes, seconds, milliseconds) {
		return (negativity ? -1 : 1) * ((((hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds);
	}
	/**
	 * Converts a timespan to a string representation.
	 * @param {Readonly<Timespan>} timespan The timespan to stringify.
	 * @param {boolean} full Whether to include all time components.
	 * @returns {string} The string representation of the timespan.
	 */
	static stringify(timespan, full = true) {
		const { negativity, hours, minutes, seconds, milliseconds } = timespan;
		let destination = seconds.toFixed().padStart(2, `0`);
		if (full || milliseconds > 0) {
			destination = `${destination}.${milliseconds.toFixed().padStart(3, `0`)}`;
		}
		if (full || hours > 0) {
			destination = `${minutes.toFixed().padStart(2, `0`)}:${destination}`;
			destination = `${hours.toFixed().padStart(2, `0`)}:${destination}`;
		} else if (minutes > 0) {
			destination = `${minutes.toFixed().padStart(2, `0`)}:${destination}`;
		}
		if (negativity) {
			destination = `-${destination}`;
		}
		return destination;
	}
	/**
	 * Parses a string representation into a Timespan object.
	 * @param {string} string The string to parse.
	 * @returns {Timespan} The parsed Timespan object.
	 * @throws {SyntaxError} If the string has invalid syntax.
	 */
	static parse(string) {
		const match = /(-)?(?:(?:(\d+):)?(\d+):)?(\d+)(?:\.(\d+))?/.exec(string);
		if (match === null) throw new SyntaxError(`Invalid moment syntax: ${string}`);
		const negativity = (match[1] !== undefined);
		const [, , hours, minutes, seconds, milliseconds] = match.map(part => Number.parseInt(part ?? 0));
		if (0 > hours) throw new RangeError(`Invalid hours value: ${hours}`);
		if (0 > minutes || minutes > 59) throw new RangeError(`Invalid minutes value: ${minutes}`);
		if (0 > seconds || seconds > 59) throw new RangeError(`Invalid seconds value: ${seconds}`);
		if (0 > milliseconds || milliseconds > 999) throw new RangeError(`Invalid milliseconds value: ${milliseconds}`);
		return Timespan.viaTime(negativity, hours, minutes, seconds, milliseconds);
	}
	//#endregion
	//#region Constructors
	/**
	 * Creates a Timespan object from a duration.
	 * @param {number} duration The duration in milliseconds.
	 * @returns {Timespan} The Timespan object.
	 */
	static viaDuration(duration = 0) {
		const destination = new Timespan();
		destination.#duration = trunc(duration);
		[destination.#negativity, destination.#hours, destination.#minutes, destination.#seconds, destination.#milliseconds] = Timespan.#toTime(destination.#duration);
		return destination;
	}
	/**
	 * Creates a Timespan object from individual time components.
	 * @param {boolean} negativity Whether the timespan is negative.
	 * @param {number} hours The hours component.
	 * @param {number} minutes The minutes component.
	 * @param {number} seconds The seconds component.
	 * @param {number} milliseconds The milliseconds component.
	 * @returns {Timespan} The Timespan object.
	 * @throws {RangeError} If any component is out of range.
	 */
	static viaTime(negativity = false, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
		if (0 > hours) throw new RangeError(`Property 'hours' out of range: ${hours}`);
		if (0 > minutes || minutes > 59) throw new RangeError(`Property 'minutes' out of range: ${minutes}`);
		if (0 > seconds || seconds > 59) throw new RangeError(`Property 'seconds' out of range: ${seconds}`);
		if (0 > milliseconds || milliseconds > 999) throw new RangeError(`Property 'milliseconds' out of range: ${milliseconds}`);
		const destination = new Timespan();
		destination.#negativity = negativity;
		destination.#hours = trunc(hours);
		destination.#minutes = trunc(minutes);
		destination.#seconds = trunc(seconds);
		destination.#milliseconds = trunc(milliseconds);
		destination.#duration = Timespan.#toDuration(destination.#negativity, destination.#hours, destination.#minutes, destination.#seconds, destination.#milliseconds);
		return destination;
	}
	/**
	 * Clones a Timespan object.
	 * @param {Readonly<Timespan>} source The source Timespan object.
	 * @returns {Timespan} The cloned Timespan object.
	 */
	static clone(source) {
		const destination = new Timespan();
		destination.#duration = source.duration;
		destination.#negativity = source.negativity;
		destination.#hours = source.hours;
		destination.#minutes = source.minutes;
		destination.#seconds = source.seconds;
		destination.#milliseconds = source.milliseconds;
		return destination;
	}
	//#endregion
	//#region Presets
	/**
	 * Represents a zero timespan.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get ZERO() { return Timespan.viaTime(false, 0, 0, 0, 0); };
	/**
	 * Represents a timespan of one millisecond.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get MILLISECOND() { return Timespan.viaTime(false, 0, 0, 0, 1); };
	/**
	 * Represents a timespan of one second.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get SECOND() { return Timespan.viaTime(false, 0, 0, 1, 0); };
	/**
	 * Represents a timespan of one minute.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get MINUTE() { return Timespan.viaTime(false, 0, 1, 0, 0); };
	/**
	 * Represents a timespan of one hour.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get HOUR() { return Timespan.viaTime(false, 1, 0, 0, 0); };
	/**
	 * Represents a timespan of one day.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get DAY() { return Timespan.viaTime(false, 24, 0, 0, 0); };
	//#endregion
	//#region Modifiers
	/**
	 * Adds two timespans together.
	 * @param {Readonly<Timespan>} first The first timespan.
	 * @param {Readonly<Timespan>} second The second timespan.
	 * @returns {Timespan} The result of the addition.
	 */
	static [`+`](first, second) {
		return Timespan.viaDuration(first.duration + second.duration);
	}
	/**
	 * Subtracts one timespan from another.
	 * @param {Readonly<Timespan>} first The first timespan.
	 * @param {Readonly<Timespan>} second The second timespan.
	 * @returns {Timespan} The result of the subtraction.
	 */
	static [`-`](first, second) {
		return Timespan.viaDuration(first.duration - second.duration);
	}
	/**
	 * Multiplies a timespan by a factor.
	 * @param {Readonly<Timespan>} timespan The timespan to multiply.
	 * @param {number} factor The factor to multiply by.
	 * @returns {Timespan} The result of the multiplication.
	 */
	static [`*`](timespan, factor) {
		return Timespan.viaDuration(timespan.duration * factor);
	}
	/**
	 * Divides a timespan by a factor.
	 * @param {Readonly<Timespan>} timespan The timespan to divide.
	 * @param {number} factor The factor to divide by.
	 * @returns {Timespan} The result of the division.
	 */
	static [`/`](timespan, factor) {
		return Timespan.viaDuration(timespan.duration / factor);
	}
	/**
	 * Inverts the sign of a timespan.
	 * @param {Readonly<Timespan>} timespan The timespan to invert.
	 * @returns {Timespan} The inverted timespan.
	 */
	static invert(timespan) {
		return Timespan.viaDuration(-1 * timespan.duration);
	}
	//#endregion
	//#region Properties
	/** @type {number} */
	#duration = 0;
	/**
	 * Gets the duration of the timespan in milliseconds.
	 * @type {number}
	 */
	get duration() {
		return this.#duration;
	}
	/**
	 * Sets the duration of the timespan in milliseconds.
	 * @param {number} value The duration value to set.
	 */
	set duration(value) {
		if (value < 0) throw new RangeError(`Property 'duration' out of range: ${value}`);
		this.#duration = trunc(value);
		[this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds] = Timespan.#toTime(this.#duration);
	}
	/** @type {boolean} */
	#negativity = false;
	/**
	 * Gets whether the timespan is negative.
	 * @type {boolean}
	 */
	get negativity() {
		return this.#negativity;
	}
	/**
	 * Sets whether the timespan is negative.
	 * @param {boolean} value The negativity value to set.
	 */
	set negativity(value) {
		this.#negativity = value;
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#hours = 0;
	/**
	 * Gets the hours component of the timespan.
	 * @type {number}
	 */
	get hours() {
		return this.#hours;
	}
	/**
	 * Sets the hours component of the timespan.
	 * @param {number} value The hours value to set.
	 */
	set hours(value) {
		if (value < 0) throw new RangeError(`Property 'hours' out of range: ${value}`);
		this.#hours = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#minutes = 0;
	/**
	 * Gets the minutes component of the timespan.
	 * @type {number}
	 */
	get minutes() {
		return this.#minutes;
	}
	/**
	 * Sets the minutes component of the timespan.
	 * @param {number} value The minutes value to set.
	 */
	set minutes(value) {
		if (value < 0 || value > 59) throw new RangeError(`Property 'minutes' out of range: ${value}`);
		this.#minutes = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#seconds = 0;
	/**
	 * Gets the seconds component of the timespan.
	 * @type {number}
	 */
	get seconds() {
		return this.#seconds;
	}
	/**
	 * Sets the seconds component of the timespan.
	 * @param {number} value The seconds value to set.
	 */
	set seconds(value) {
		if (value < 0 || value > 59) throw new RangeError(`Property 'seconds' out of range: ${value}`);
		this.#seconds = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#milliseconds = 0;
	/**
	 * Gets the milliseconds component of the timespan.
	 * @type {number}
	 */
	get milliseconds() {
		return this.#milliseconds;
	}
	/**
	 * Sets the milliseconds component of the timespan.
	 * @param {number} value The milliseconds value to set.
	 */
	set milliseconds(value) {
		if (value < 0 || value > 999) throw new RangeError(`Property 'milliseconds' out of range: ${value}`);
		this.#milliseconds = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	//#endregion
	//#region Methods
	/**
	 * Converts the timespan to a string representation.
	 * @param {boolean} full Determines whether to include all time components or not. Default is true.
	 * @returns {string} The string representation of the timespan.
	 */
	toString(full = true) {
		return Timespan.stringify(this, full);
	}
	/**
	 * Converts the timespan to its primitive value, which is its duration in milliseconds.
	 * @returns {number} The duration of the timespan in milliseconds.
	 */
	[Symbol.toPrimitive]() {
		return this.#duration;
	}
	/**
	 * Creates a shallow copy of the timespan.
	 * @returns {Timespan} A new timespan instance that is a clone of the current one.
	 */
	clone() {
		return Timespan.clone(this);
	}
	/**
	 * Adds another timespan to the current timespan.
	 * @param {Readonly<Timespan>} other The timespan to add.
	 * @returns {Timespan} A new timespan representing the sum of the current timespan and the other timespan.
	 */
	[`+`](other) {
		return Timespan[`+`](this, other);
	}
	/**
	 * Subtracts another timespan from the current timespan.
	 * @param {Readonly<Timespan>} other The timespan to subtract.
	 * @returns {Timespan} A new timespan representing the difference between the current timespan and the other timespan.
	 */
	[`-`](other) {
		return Timespan[`-`](this, other);
	}
	/**
	 * Multiplies the duration of the timespan by a factor.
	 * @param {number} factor The factor by which to multiply the duration.
	 * @returns {Timespan} A new timespan representing the duration multiplied by the factor.
	 */
	[`*`](factor) {
		return Timespan[`*`](this, factor);
	}
	/**
	 * Divides the duration of the timespan by a factor.
	 * @param {number} factor The factor by which to divide the duration.
	 * @returns {Timespan} A new timespan representing the duration divided by the factor.
	 */
	[`/`](factor) {
		return Timespan[`/`](this, factor);
	}
	/**
	 * Inverts the timespan, changing its sign.
	 * @returns {Timespan} A new timespan representing the negation of the current timespan.
	 */
	invert() {
		return Timespan.invert(this);
	}
	//#endregion
}
//#endregion

export { Point, Point1D, Point2D, Point3D, Matrix, Timespan };
