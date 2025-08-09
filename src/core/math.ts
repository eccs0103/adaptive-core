"use strict";

const { PI, trunc, pow } = Math;

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

export { };
