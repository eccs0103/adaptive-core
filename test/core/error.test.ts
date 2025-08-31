import { ImplementationError } from "adaptive-extender/core";
import { strict as assert } from "assert";
import { describe, it } from "mocha";

describe("Error extensions", () => {
	describe("Error.from", () => {
		it("should return the same Error instance if input is Error", () => {
			const err = new Error("test");
			const result = Error.from(err);
			assert.strictEqual(result, err);
		});

		it("should create Error from string reason", () => {
			const result = Error.from("reason");
			assert.ok(result instanceof Error);
			assert.strictEqual(result.message, "reason");
		});

		it("should create Error from undefined reason", () => {
			const result = Error.from(undefined);
			assert.ok(result instanceof Error);
			assert.strictEqual(result.message, "Undefined reason");
		});

		it("should create Error from null reason", () => {
			const result = Error.from(null);
			assert.ok(result instanceof Error);
			assert.strictEqual(result.message, "Undefined reason");
		});

		it("should create Error from object reason", () => {
			const obj = { foo: "bar" };
			const result = Error.from(obj);
			assert.ok(result instanceof Error);
			assert.strictEqual(result.message, obj.toString());
		});
	});

	describe("Error.prototype.toString", () => {
		it("should return stack if available", () => {
			const err = new Error("msg");
			assert.ok(err.toString().includes("Error: msg"));
		});

		it("should return name and message if stack is not available", () => {
			const err = new Error("msg");
			// Simulate missing stack
			Object.defineProperty(err, "stack", { value: undefined });
			assert.strictEqual(err.toString(), "Error: msg");
		});
	});

	describe("ImplementationError", () => {
		it("should have correct name and message", () => {
			const err = new ImplementationError();
			assert.strictEqual(err.name, "ImplementationError");
			assert.strictEqual(err.message, "Method not implemented");
		});

		it("should throw TypeError when subclassed", () => {
			class SubError extends ImplementationError { }
			assert.throws(() => new SubError(), TypeError);
		});
	});
});