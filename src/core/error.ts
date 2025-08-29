"use strict";

//#region Error
declare global {
	interface ErrorConstructor {
		/**
		 * Generates an error object from the provided input.
		 * @param reason The reason input.
		 */
		from(reason: any): Error;
	}

	interface Error {
		/**
		 * Returns a string representation of the Error object.
		 * @returns A string representation of the Error object.
		 */
		toString(): string;
	}
}

Error.from = function (reason: any): Error {
	if (reason instanceof Error) return reason;
	return new Error(reason ?? "Undefined reason");
};

Error.prototype.toString = function (): string {
	let text = this.stack ?? `${this.name}: ${this.message}`;
	return text;
};
//#endregion
//#region Implementation error
class ImplementationError extends Error {
	constructor() {
		super("Method not implemented");
		if (new.target !== ImplementationError) throw new TypeError("Unable to create an instance of sealed-extended class");
		this.name = "ImplementationError";
	}
}
//#endregion

export { ImplementationError };
