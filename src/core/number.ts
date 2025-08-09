"use strict";

import "./global.js";

declare global {
	interface NumberConstructor {
		/**
		 * Imports a number from a source.
		 * @param source The source value to import.
		 * @param name The name of the source value.
		 * @returns The imported number value.
		 * @throws {TypeError} If the source is not a number.
		 */
		import(source: any, name?: string): number;
	}

	interface Number {
		/**
		 * Clamps a value between a minimum and maximum.
		 * @param min The minimum value.
		 * @param max The maximum value.
		 * @returns The clamped value.
		 */
		clamp(min: number, max: number): number;
		/**
		 * Interpolates the number from one range to another.
		 * @param min1 The minimum value of the original range.
		 * @param max1 The maximum value of the original range.
		 * @param min2 The minimum value of the target range. Defaults to 0.
		 * @param max2 The maximum value of the target range. Defaults to 1.
		 * @returns The interpolated value within the target range.
		 * @throws {Error} If the minimum and maximum of either range are equal.
		 */
		interpolate(min1: number, max1: number, min2?: number, max2?: number): number;
		/**
		 * Modulates the current number within a specified range.
		 * @param length The range length.
		 * @param start The start of the range. Defaults to 0.
		 * @returns The number constrained within the range.
		 * @throws {Error} If the range is zero.
		 */
		modulate(length: number, start?: number): number;
		/**
		 * Returns the current number unless it is NaN, replacing it with the provided value.
		 * @param value The fallback value.
		 * @returns The original number or the fallback.
		 */
		insteadNaN<T>(value: T): number | T;
		/**
		 * Returns the current number unless it is NaN or infinite, replacing it with the provided value.
		 * @param value The fallback value.
		 * @returns The original number or the fallback.
		 */
		insteadInfinity<T>(value: T): number | T;
		/**
		 * Returns the current number unless it is zero, NaN, or infinite, replacing it with the provided value.
		 * @param value The fallback value.
		 * @returns The original number or the fallback.
		 */
		insteadZero<T>(value: T): number | T;
	}
}

Number.import = function (source: any, name: string = "[source]"): number {
	if (typeof (source) !== "number") throw new TypeError(`Unable to import number from ${name} due its ${typename(source)} type`);
	return source.valueOf();
};

Number.prototype.clamp = function (min: number, max: number): number {
	let value = this.valueOf();
	if (value < min) return min;
	if (value > max) return max;
	return value;
};

Number.prototype.interpolate = function (min1: number, max1: number, min2: number = 0, max2: number = 1): number {
	if (min1 === max1) throw new Error("Minimum and maximum of the original range cant be equal");
	if (min2 === max2) throw new Error("Minimum and maximum of the target range cant be equal");
	return min2 + (max2 - min2) * ((this.valueOf() - min1) / (max1 - min1));
};

Number.prototype.modulate = function (length: number, start: number = 0): number {
	if (length === 0) throw new Error("Range can't be zero");
	let value = (this.valueOf() - start) % length;
	if (value < 0) value += length;
	return value + start;
};

Number.prototype.insteadNaN = function <T>(value: T): number | T {
	const current = this.valueOf();
	if (Number.isNaN(current)) return value;
	return current;
};

Number.prototype.insteadInfinity = function <T>(value: T): number | T {
	const current = this.valueOf();
	if (!Number.isFinite(current)) return value;
	return current;
};

Number.prototype.insteadZero = function <T>(value: T): number | T {
	const current = this.valueOf();
	if (!Number.isFinite(current)) return value;
	if (current === 0) return value;
	return current;
};

export { };
