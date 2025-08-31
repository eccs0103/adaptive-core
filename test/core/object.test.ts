import "adaptive-extender/core";
import { strict as assert } from "assert";
import { describe, it } from "mocha";

describe("Object extensions", () => {
	describe("Object.import", () => {
		it("should return the object if valid", () => {
			const obj = { a: 1 };
			assert.equal(Object.import(obj), obj);
		});

		it("should throw TypeError if source is null", () => {
			assert.throws(() => Object.import(null), TypeError);
		});

		it("should throw TypeError if source is not object", () => {
			assert.throws(() => Object.import(42), TypeError);
			assert.throws(() => Object.import("str"), TypeError);
			assert.throws(() => Object.import(undefined), TypeError);
			assert.throws(() => Object.import(true), TypeError);
		});

		it("should use custom name in error message", () => {
			try {
				Object.import(undefined, "customName");
			} catch (e: any) {
				assert.ok(e.message.includes("customName"));
			}
		});
	});

	describe("Object.map", () => {
		it("should apply callback if value is non-null/non-undefined", () => {
			const result = Object.map(5, v => v * 2);
			assert.equal(result, 10);
		});

		it("should return value unchanged if null", () => {
			const result = Object.map(null as number | null, v => v * 2);
			assert.equal(result, null);
		});

		it("should return value unchanged if undefined", () => {
			const result = Object.map(undefined as number | undefined, v => v * 2);
			assert.equal(result, undefined);
		});

		it("should work with objects", () => {
			const obj = { x: 1 };
			const result = Object.map(obj, o => ({ ...o, y: 2 }));
			assert.deepEqual(result, { x: 1, y: 2 });
		});
	});

	describe("Object.suppress", () => {
		it("should return value if not null/undefined", () => {
			assert.equal(Object.suppress(42), 42);
			assert.equal(Object.suppress("abc"), "abc");
			assert.deepEqual(Object.suppress({ a: 1 }), { a: 1 });
		});

		it("should throw ReferenceError if value is null", () => {
			assert.throws(() => Object.suppress(null), ReferenceError);
		});

		it("should throw ReferenceError if value is undefined", () => {
			assert.throws(() => Object.suppress(undefined), ReferenceError);
		});

		it("should use custom message for null", () => {
			try {
				Object.suppress(null, "custom null");
			} catch (e: any) {
				assert.ok(e.message.includes("custom null"));
			}
		});

		it("should use custom message for undefined", () => {
			try {
				Object.suppress(undefined, "custom undefined");
			} catch (e: any) {
				assert.ok(e.message.includes("custom undefined"));
			}
		});
	});
});