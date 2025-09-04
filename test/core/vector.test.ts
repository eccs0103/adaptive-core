import { ImplementationError, Vector } from "adaptive-extender/core";
import { strict as assert } from "assert";
import { describe, it } from "mocha";

// Minimal concrete subclass for testing
class TestVector extends Vector {
	#data: number[];
	constructor(data: number[]) {
		super();
		this.#data = data;
	}
	*[Symbol.iterator](): IteratorObject<number, undefined> {
		for (const v of this.#data) yield v;
	}
}

describe("Vector", () => {
	describe("Vector constructor", () => {
		it("should throw TypeError when instantiated directly", () => {
			assert.throws(() => new (Vector as any)(), TypeError);
		});

		it("should not throw when subclassed", () => {
			assert.doesNotThrow(() => new TestVector([1, 2, 3]));
		});

		it("subclass instance should be instance of Vector", () => {
			const v = new TestVector([1, 2, 3]);
			assert.ok(v instanceof Vector);
		});

		it("subclass instance should be iterable", () => {
			const v = new TestVector([1, 2, 3]);
			const arr = Array.from(v);
			assert.deepEqual(arr, [1, 2, 3]);
		});

		it("base Vector [Symbol.iterator] throws ImplementationError", () => {
			class DummyVector extends Vector { }
			const v = Object.create(Vector.prototype) as Vector;
			assert.throws(() => v[Symbol.iterator](), ImplementationError);
		});
	});
});