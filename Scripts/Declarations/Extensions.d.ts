/// <reference path="../Modules/Extensions.js" />

interface Math {
	/**
	 * Clamps a value between a minimum and maximum value.
	 * @param value The value to be clamped.
	 * @param min The minimum allowed value.
	 * @param max The maximum allowed value.
	 * @returns The clamped value.
	 */
	between(value: number, min: number, max: number): number;
	/**
	 * Converts radians to degrees.
	 * @param radians The angle in radians.
	 * @returns The equivalent angle in degrees.
	 */
	toDegrees(radians: number): number;
	/**
	 * Converts degrees to radians.
	 * @param degrees The angle in degrees.
	 * @returns The equivalent angle in radians.
	 */
	toRadians(degrees: number): number;
	/**
	 * Converts a value to a factor within the range [0, 1] based on a specified period.
	 * @param value The value to convert.
	 * @param period The period to use for conversion.
	 * @returns The converted factor within the range [0, 1].
	 */
	toFactor(value: number, period: number): number;
	/**
	 * Converts a value to a factor within the range [0, 1] based on a specified period.
	 * @param value The value to convert.
	 * @param period The period to use for conversion.
	 * @returns The converted factor within the range [0, 1].
	 */
	toSignedFactor(value: number, period: number): number;
}

interface PromiseConstructor {
	/**
	 * @template T
	 * @param action The action to execute.
	 * @returns A promise that resolves with the result of the action.
	 */
	fulfill<T>(action: () => T | PromiseLike<T>): Promise<T>;
}

interface ErrorConstructor {
	/**
	 * @param error The error object to generate.
	 * @returns The generated error object.
	 */
	generate(error: any): Error;
}

interface HTMLElement {
	/**
	 * @template T
	 * @param type The type of element to retrieve.
	 * @param selectors The selectors to search for the element.
	 * @returns The element instance.
	 */
	getElement<T extends typeof HTMLElement>(type: T, selectors: string): InstanceType<T>;

	/**
	 * @template T
	 * @param type The type of element to retrieve.
	 * @param selectors The selectors to search for the element.
	 * @param strict Whether to reject if the element is missing or has an invalid type.
	 * @returns A promise that resolves to the element instance.
	 */
	tryGetElement<T extends typeof HTMLElement>(type: T, selectors: string, strict: boolean = false): Promise<InstanceType<T>>;
}

interface Document {
	/**
	 * @template T
	 * @param type The type of element to retrieve.
	 * @param selectors The selectors to search for the element.
	 * @returns The element instance.
	 */
	getElement<T extends typeof HTMLElement>(type: T, selectors: string): InstanceType<T>;

	/**
	 * @template T
	 * @param type The type of element to retrieve.
	 * @param selectors The selectors to search for the element.
	 * @param strict Whether to reject if the element is missing or has an invalid type.
	 * @returns A promise that resolves to the element instance.
	 */
	tryGetElement<T extends typeof HTMLElement>(type: T, selectors: string, strict: boolean = false): Promise<InstanceType<T>>;
}

interface Window {
	/**
	 * Asynchronously displays an alert message.
	 * @param message The message to display.
	 * @param title The title of the alert.
	 * @returns A promise that resolves when the alert is closed.
	 */
	alertAsync(message: string, title: string = `Message`): Promise<void>;
	/**
	 * Asynchronously displays a confirmation dialog.
	 * @param message The message to display.
	 * @param title The title of the confirmation dialog.
	 * @returns A promise that resolves to true if the user confirms, and false otherwise.
	 */
	confirmAsync(message: string, title: string = `Message`): Promise<boolean>;
	/**
	 * Asynchronously displays a prompt dialog.
	 * @param message The message to display.
	 * @param title The title of the prompt dialog.
	 * @returns A promise that resolves to the user's input value if accepted, or null if canceled.
	 */
	promptAsync(message: string, title: string = `Message`): Promise<string?>;
	/**
	 * Asynchronously loads a promise with a loading animation.
	 * @template T
	 * @param promise The promise to load.
	 * @param duration The duration of the loading animation.
	 * @param delay The delay before the loading animation starts.
	 * @returns A promise that resolves to the result of the input promise.
	 */
	load<T>(promise: Promise<T>, duration: number = 200, delay: number = 0): Promise<T>;
	/**
	 * Asynchronously handles an error, displaying it in an alert or console.
	 * @param error The error to handle.
	 * @param locked Indicates whether the application should be locked after displaying the error.
	 * @returns A promise that resolves once the error handling is complete.
	 */
	stabilize(error: Error, locked: boolean = true): Promise<void>;
	/**
	 * Logs data to the console dialog.
	 * @param data The data to log.
	 * @returns 
	 */
	log(...data: any[]): void;
}

interface Navigator {
	/**
	 * Downloads the specified file.
	 * @param file The file to download.
	 * @returns 
	 */
	download(file: File): void;
}

interface Location {
	/**
	 * Parses the search part of the URL and returns it as a map.
	 * @returns A map containing the search parameters.
	 */
	getSearchMap(): Map<string, string>;
}