"use strict";

import { ImplementationError } from "./error.js";

//#region Vector
/**
 * @abstract
 */
class Vector implements IteratorObject<number, void> {
	constructor() {
		if (new.target === Vector) throw new TypeError("Unable to create an instance of an abstract class");
	}

	// Iterator core
	*[Symbol.iterator](): IteratorObject<number, void> {
		throw new ImplementationError();
	}
	next(...[value]: [] | [unknown]): IteratorResult<number, void> {
		return this[Symbol.iterator]().next(value);
	}
	return?(value?: void): IteratorResult<number, void> {
		return this[Symbol.iterator]().return?.(value) ?? { done: true, value: undefined };
	}
	throw?(reason?: any): IteratorResult<number, void> {
		return this[Symbol.iterator]().throw?.(reason) ?? { done: true, value: undefined };
	}
	[Symbol.toStringTag]: string;

	// Iterators
	*map<U>(callback: (value: number, index: number) => U): IteratorObject<U, undefined> {
		let index = 0;
		for (const metric of this) yield callback(metric, index++);
	}

	filter<S extends number>(predicate: (value: number, index: number) => value is S): IteratorObject<S, undefined>;
	filter(predicate: (value: number, index: number) => unknown): IteratorObject<number, undefined>;
	*filter(predicate: (value: number, index: number) => unknown): IteratorObject<number, undefined> {
		let index = 0;
		for (const metric of this) {
			if (predicate(metric, index++)) yield metric;
		}
	}

	*take(limit: number): IteratorObject<number, undefined> {
		if (0 > limit) throw new RangeError(`The limit ${limit} is out of range [0 - ∞)`);
		let index = 0;
		for (const metric of this) {
			if (index++ >= limit) break;
			yield metric;
		}
	}
	*drop(count: number): IteratorObject<number, undefined> {
		if (0 > count) throw new RangeError(`The count ${count} is out of range [0 - ∞)`);
		let index = 0;
		for (const metric of this) {
			if (index++ < count) continue;
			yield metric;
		}
	}
	*flatMap<U>(callback: (value: number, index: number) => IterableIterator<U>): IteratorObject<U, undefined> {
		let index = 0;
		for (const metric of this) yield* callback(metric, index++);
	}
	reduce(callback: (accumulator: number, value: number, index: number) => number): number;
	reduce(callback: (accumulator: number, value: number, index: number) => number, initial: number): number;
	reduce<U>(callback: (accumulator: U, value: number, index: number) => U, initial: U): U;
	reduce<U>(callback: (accumulator: U, value: number, index: number) => U, initial?: U): U {
		let index = 0;
		let accumulator: U = initial ?? (0 as U);
		for (const value of this) {
			accumulator = callback(accumulator, value, index++);
		}
		return accumulator;
	}
	toArray(): number[] {
		return [...this];
	}
	forEach(callback: (value: number, index: number) => void): void {
		let index = 0;
		for (const metric of this) callback(metric, index++);
	}
	some(predicate: (value: number, index: number) => unknown): boolean {
		let index = 0;
		for (const metric of this) {
			if (predicate(metric, index++)) return true;
		}
		return false;
	}
	every(predicate: (value: number, index: number) => unknown): boolean {
		let index = 0;
		for (const metric of this) {
			if (!predicate(metric, index++)) return false;
		}
		return true;
	}
	find<S extends number>(predicate: (value: number, index: number) => value is S): S | undefined;
	find(predicate: (value: number, index: number) => unknown): number | undefined;
	find(predicate: (value: number, index: number) => unknown): number | undefined {
		let index = 0;
		for (const metric of this) {
			if (predicate(metric, index++)) return metric;
		}
		return undefined;
	}

	// Number-like checks
	static isNaN(vector: Vector): boolean {
		return vector.every(Number.isNaN);
	}
	static isFinite(vector: Vector): boolean {
		return vector.every(Number.isFinite);
	}
	static isInteger(vector: Vector): boolean {
		return vector.every(Number.isInteger);
	}
	static isSafeInteger(vector: Vector): boolean {
		return vector.every(Number.isSafeInteger);
	}

	// Number-like formatting (streaming, без массива)
	toFixed(): string;
	toFixed(digits: number): string;
	toFixed(digits?: number): string {
		let result = "(";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += metric.toFixed(digits);
			if (first) first = false;
		}
		result += ")";
		return result;
	}

	toExponential(): string;
	toExponential(digits: number): string;
	toExponential(digits?: number): string {
		let result = "(";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += metric.toExponential(digits);
			if (first) first = false;
		}
		result += ")";
		return result;
	}

	toPrecision(): string;
	toPrecision(precision: number): string;
	toPrecision(precision?: number): string {
		let result = "(";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += metric.toPrecision(precision);
			if (first) first = false;
		}
		result += ")";
		return result;
	}

	toString(): string;
	toString(radix: number): string;
	toString(radix?: number): string {
		let result = "(";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += metric.toString(radix);
			if (first) first = false;
		}
		result += ")";
		return result;
	}

	toLocaleString(): string;
	toLocaleString(locales: string): string;
	toLocaleString(locales: string, options: Intl.NumberFormatOptions): string;
	toLocaleString(locales: string[], options: Intl.NumberFormatOptions): string;
	toLocaleString(locales: Intl.LocalesArgument): string;
	toLocaleString(locales: Intl.LocalesArgument, options: Intl.NumberFormatOptions): string;
	toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string {
		let result = "(";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += metric.toLocaleString(locales, options);
			if (first) first = false;
		}
		result += ")";
		return result;
	}
}
//#endregion

export { Vector };
