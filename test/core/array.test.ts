import "adaptive-extender/core";
import { strict as assert } from "assert";
import { describe, it } from "mocha";

describe("Array extensions", () => {
	describe("Array.import", () => {
		it("should import an array", () => {
			const arr = [1, 2, 3];
			assert.deepStrictEqual(Array.import(arr), arr);
		});

		it("should throw TypeError for non-array source", () => {
			assert.throws(() => Array.import(123), TypeError);
			assert.throws(() => Array.import("abc"), TypeError);
			assert.throws(() => Array.import({}), TypeError);
		});
	});

	describe("Array.range", () => {
		it("should create a range of integers", () => {
			assert.deepStrictEqual(Array.range(1, 5), [1, 2, 3, 4]);
			assert.deepStrictEqual(Array.range(0, 3), [0, 1, 2]);
		});

		it("should handle min >= max", () => {
			assert.deepStrictEqual(Array.range(5, 5), []);
			assert.deepStrictEqual(Array.range(6, 5), []);
		});

		it("should truncate non-integer min/max", () => {
			assert.deepStrictEqual(Array.range(1.7, 4.9), [1, 2, 3]);
		});
	});

	describe("Array.zip", () => {
		it("should zip two arrays", () => {
			const a = [1, 2, 3];
			const b = ["a", "b", "c"];
			const zipped = Array.from(Array.zip(a, b));
			assert.deepStrictEqual(zipped, [[1, "a"], [2, "b"], [3, "c"]]);
		});

		it("should stop at the shortest iterable", () => {
			const a = [1, 2];
			const b = ["x", "y", "z"];
			const zipped = Array.from(Array.zip(a, b));
			assert.deepStrictEqual(zipped, [[1, "x"], [2, "y"]]);
		});

		it("should zip more than two arrays", () => {
			const a = [1, 2];
			const b = ["x", "y"];
			const c = [true, false];
			const zipped = Array.from(Array.zip(a, b, c));
			assert.deepStrictEqual(zipped, [[1, "x", true], [2, "y", false]]);
		});
	});

	describe("Array.prototype.swap", () => {
		it("should swap two elements", () => {
			const arr = [1, 2, 3];
			arr.swap(0, 2);
			assert.deepStrictEqual(arr, [3, 2, 1]);
		});

		it("should truncate indices", () => {
			const arr = [10, 20, 30];
			arr.swap(0.9, 2.7);
			assert.deepStrictEqual(arr, [30, 20, 10]);
		});
	});

	describe("Array.prototype.resize", () => {
		it("should extend array and fill with default", () => {
			const arr = [1, 2];
			arr.resize(4, 0);
			assert.deepStrictEqual(arr, [1, 2, 0, 0]);
		});

		it("should shrink array", () => {
			const arr = [1, 2, 3, 4];
			arr.resize(2, 0);
			assert.deepStrictEqual(arr, [1, 2]);
		});

		it("should do nothing if length is unchanged", () => {
			const arr = [1, 2, 3];
			arr.resize(3, 0);
			assert.deepStrictEqual(arr, [1, 2, 3]);
		});
	});
});