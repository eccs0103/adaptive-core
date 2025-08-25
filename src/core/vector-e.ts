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
		throw new Error("Method not implemented.");
	}
	return?(value?: unknown): IteratorResult<number, void> {
		throw new Error("Method not implemented.");
	}
	throw?(e?: any): IteratorResult<number, void> {
		throw new Error("Method not implemented.");
	}
	[Symbol.toStringTag]: string;
	[Symbol.dispose](): void {
		throw new Error("Method not implemented.");
	}

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
		if (limit < 0) throw new RangeError("limit must be >= 0");
		let index = 0;
		for (const metric of this) {
			if (index++ >= limit) break;
			yield metric;
		}
	}
	*drop(count: number): IteratorObject<number, undefined> {
		if (count < 0) throw new RangeError("count must be >= 0");
		let index = 0;
		for (const metric of this) {
			if (index++ < count) continue;
			yield metric;
		}
	}
	*flatMap<U>(callback: (value: number, index: number) => Iterator<U, unknown, undefined> | Iterable<U, unknown, undefined>): IteratorObject<U, undefined> {
		let index = 0;
		for (const metric of this) yield* callback(metric, index++);
	}
	reduce(callback: (accumulator: number, value: number, index: number) => number): number;
	reduce(callback: (accumulator: number, value: number, index: number) => number, initial: number): number;
	reduce<U>(callback: (accumulator: U, value: number, index: number) => U, initial: U): U;
	reduce<U>(callback: (accumulator: U, value: number, index: number) => U, initial?: U): U {
		let index = 0;
		let acc: U;
		const iter = this[Symbol.iterator]();
		let step = iter.next();

		if (initial === undefined) {
			if (step.done) throw new TypeError("Reduce of empty vector with no initial value");
			// @ts-expect-error – TS не выведет U без initialValue
			acc = step.value;
			step = iter.next();
		} else {
			acc = initial;
		}

		for (; !step.done; step = iter.next()) {
			acc = callback(acc, step.value, index++);
		}
		return acc;
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
		let result = "";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += metric.toFixed(digits);
			first = false;
		}
		return result;
	}

	toExponential(): string;
	toExponential(digits: number): string;
	toExponential(digits?: number): string {
		let result = "";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += digits === undefined ? metric.toExponential() : metric.toExponential(digits);
			first = false;
		}
		return result;
	}

	toPrecision(): string;
	toPrecision(precision: number): string;
	toPrecision(precision?: number): string {
		let result = "";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += precision === undefined ? metric.toPrecision() : metric.toPrecision(precision);
			first = false;
		}
		return result;
	}

	toString(): string;
	toString(radix: number): string;
	toString(radix?: number): string {
		let result = "";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += radix === undefined ? metric.toString() : metric.toString(radix);
			first = false;
		}
		return result;
	}

	toLocaleString(): string;
	toLocaleString(locales: string): string;
	toLocaleString(locales: string, options: Intl.NumberFormatOptions): string;
	toLocaleString(locales: string[], options: Intl.NumberFormatOptions): string;
	toLocaleString(locales: Intl.LocalesArgument): string;
	toLocaleString(locales: Intl.LocalesArgument, options: Intl.NumberFormatOptions): string;
	toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string {
		let result = "";
		let first = true;
		for (const metric of this) {
			if (!first) result += ", ";
			result += locales === undefined
				? metric.toLocaleString()
				: metric.toLocaleString(locales, options);
			first = false;
		}
		return result;
	}
}
//#endregion

class Vector1 extends Vector {
	x: number;
	*[Symbol.iterator](): Generator<number, void> {
		yield this.x;
	}
}

export { Vector };
