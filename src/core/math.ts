"use strict";

const { PI, trunc, pow } = Math;

//#region Number
declare global {
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
	}
}

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
//#endregion
//#region Math
declare global {
	interface Math {
		/**
		 * Splits a number into its integer and fractional parts.
		 * @param x The number to be split.
		 * @returns A tuple where the first element is the integer part and the second element is the fractional part.
		 * ```ts
		 * const [integer, fractional] = Math.split(x);
		 * ```
		 */
		split(x: number): [number, number];
		/**
		 * Calculates the square of a number.
		 * @param x The number to square.
		 */
		sqpw(x: number): number;
		/**
		 * Converts radians to degrees.
		 * @param radians The angle in radians.
		 */
		toDegrees(radians: number): number;
		/**
		 * Converts degrees to radians.
		 * @param degrees The angle in degrees.
		 */
		toRadians(degrees: number): number;
		/**
		 * Calculates the arithmetic mean of the given numbers.
		 * @param values The numbers to calculate the mean from.
		 */
		meanArithmetic(...values: number[]): number;
		/**
		 * Calculates the geometric mean of the given numbers.
		 * @param values The numbers to calculate the mean from.
		 */
		meanGeometric(...values: number[]): number;
		/**
		 * Calculates the harmonic mean of the given numbers.
		 * @param values The numbers to calculate the mean from.
		 */
		meanHarmonic(...values: number[]): number;
	}
}

Math.split = function (x: number): [number, number] {
	const integer = trunc(x);
	return [integer, (x - integer)];
};

Math.sqpw = function (x: number): number {
	return x * x;
};

const toDegreeFactor = 180 / PI;
Math.toDegrees = function (radians: number): number {
	return radians * toDegreeFactor;
};

const toRadianFactor = PI / 180;
Math.toRadians = function (degrees: number): number {
	return degrees * toRadianFactor;
};

Math.meanArithmetic = function (...values: number[]): number {
	let summary = 0;
	for (let index = 0; index < values.length; index++) {
		summary += values[index];
	}
	return summary / values.length;
};

Math.meanGeometric = function (...values: number[]): number {
	let product = 1;
	for (let index = 0; index < values.length; index++) {
		product *= values[index];
	}
	return pow(product, 1 / values.length);
};

Math.meanHarmonic = function (...values: number[]): number {
	let summary = 0;
	for (let index = 0; index < values.length; index++) {
		const value = values[index];
		if (value === 0) return NaN;
		summary += 1 / value;
	}
	return values.length / summary;
};
//#endregion

export { };
