/// <reference path="../Modules/Extensions.js" />

/**
 * Displays asynchronous alerts.
 * @param message - The message to be displayed in the alert.
 * @param title - The title of the alert. Optional.
 * @returns A promise that resolves when the user acknowledges the alert.
 */
declare function alertAsync(message: string, title?: string): Promise<void>;
/**
 * Displays asynchronous confirmation dialogs.
 * @param message - The message to be displayed in the confirmation dialog.
 * @param title - The title of the confirmation dialog. Optional.
 * @returns A promise that resolves with a boolean indicating whether the user confirmed.
 */
declare function confirmAsync(message: string, title?: string): Promise<boolean>;
/**
 * Displays asynchronous prompt dialogs.
 * @param message - The message to be displayed in the prompt dialog.
 * @param title - The title of the prompt dialog. Optional.
 * @returns A promise that resolves with the user-entered value or null if canceled.
 */
declare function promptAsync(message: string, title?: string): Promise<string | null>;
/**
 * Delays the resolution of a promise, providing an optional duration and delay.
 * @template T
 * @param promise - The promise to be delayed.
 * @param duration - The duration of the animations in milliseconds. Optional.
 * @param delay - The delay before the loading ends in milliseconds. Optional.
 * @returns A promise that resolves with the result of the original promise.
 */
declare function load<T>(promise: Promise<T>, duration?: number, delay?: number): Promise<T>;
/**
 * Prevents the execution of further code by rejecting with the provided error.
 * @param message - The error to be rejected.
 * @param locked - Indicates whether the prevention is locked. Optional.
 * @returns A promise that rejects with the provided error.
 */
declare function prevent(message: Error, locked?: boolean): Promise<void>;

interface Window {
	/**
	 * Displays asynchronous alerts.
	 * @param message - The message to be displayed in the alert.
	 * @param title - The title of the alert. Optional.
	 * @returns A promise that resolves when the user acknowledges the alert.
	 */
	alertAsync(message: string, title?: string): Promise<void>;
	/**
	 * Displays asynchronous confirmation dialogs.
	 * @param message - The message to be displayed in the confirmation dialog.
	 * @param title - The title of the confirmation dialog. Optional.
	 * @returns A promise that resolves with a boolean indicating whether the user confirmed.
	 */
	confirmAsync(message: string, title?: string): Promise<boolean>;
	/**
	 * Displays asynchronous prompt dialogs.
	 * @param message - The message to be displayed in the prompt dialog.
	 * @param title - The title of the prompt dialog. Optional.
	 * @returns A promise that resolves with the user-entered value or null if canceled.
	 */
	promptAsync(message: string, title?: string): Promise<string | null>;
	/**
	 * Delays the resolution of a promise, providing an optional duration and delay.
	 * @template T
	 * @param promise - The promise to be delayed.
	 * @param duration - The duration of the animations in milliseconds. Optional.
	 * @param delay - The delay before the loading ends in milliseconds. Optional.
	 * @returns A promise that resolves with the result of the original promise.
	 */
	load<T>(promise: Promise<T>, duration?: number, delay?: number): Promise<T>;
	/**
	 * Prevents the execution of further code by rejecting with the provided error.
	 * @param message - The error to be rejected.
	 * @param locked - Indicates whether the prevention is locked. Optional.
	 * @returns A promise that rejects with the provided error.
	 */
	prevent(message: Error, locked?: boolean): Promise<void>;
}

interface Math {
	/**
	 * Clamps a value between a minimum and maximum value.
	 * @param value - The value to be clamped.
	 * @param min - The minimum allowed value.
	 * @param max - The maximum allowed value.
	 * @returns The clamped value.
	 */
	between(value: number, min: number, max: number): number;
	/**
	 * Converts radians to degrees.
	 * @param radians - The angle in radians.
	 * @returns The equivalent angle in degrees.
	 */
	toDegrees(radians: number): number;
	/**
	 * Converts degrees to radians.
	 * @param degrees - The angle in degrees.
	 * @returns The equivalent angle in radians.
	 */
	toRadians(degrees: number): number;
	/**
	 * Converts a value to a factor within the range [0, 1] based on a specified period.
	 * @returns The converted factor within the range [0, 1].
	 */
	toFactor(value: number, period: number): number;
	/**
	 * Converts a value to a signed factor within the range [-1, 1] based on a specified period.
	 * @returns The converted signed factor within the range [-1, 1].
	 */
	toSignedFactor(value: number, period: number): number;
}

interface HTMLElement {
	/**
	 * Retrieves the first child element matching the specified type and selectors.
	 * @template T
	 * @param type - The type of HTMLElement to retrieve.
	 * @param selectors - The CSS selectors used to filter the elements.
	 * @returns The first child element matching the specified type and selectors.
	 */
	getElement<T extends typeof HTMLElement>(type: T, selectors: string): InstanceType<T>;

	/**
	 * Attempts to retrieve the first child element matching the specified type and selectors asynchronously.
	 * @template T
	 * @param type - The type of HTMLElement to retrieve.
	 * @param selectors - The CSS selectors used to filter the elements.
	 * @param strict - Indicates whether strict retrieval is enforced. Optional.
	 * @returns A promise that resolves with the first child element.
	 */
	tryGetElement<T extends typeof HTMLElement>(type: T, selectors: string, strict?: boolean): Promise<InstanceType<T>>;
}

/**
 * Extends the Document interface with utility functions related to element retrieval, logging, and error analysis.
 */
interface Document {
	/**
	 * Retrieves the first child element matching the specified type and selectors.
	 * @template T
	 * @param type - The type of HTMLElement to retrieve.
	 * @param selectors - The CSS selectors used to filter the elements.
	 * @returns The first child element matching the specified type and selectors.
	 */
	getElement<T extends typeof HTMLElement>(type: T, selectors: string): InstanceType<T>;

	/**
	 * Attempts to retrieve the first child element matching the specified type and selectors asynchronously.
	 * @template T
	 * @param type - The type of HTMLElement to retrieve.
	 * @param selectors - The CSS selectors used to filter the elements.
	 * @param strict - Indicates whether strict retrieval is enforced. Optional.
	 * @returns A promise that resolves with the first child element.
	 */
	tryGetElement<T extends typeof HTMLElement>(type: T, selectors: string, strict?: boolean): Promise<InstanceType<T>>;

	/**
	 * Logs the provided data to the document.
	 * @param data - The data to be logged.
	 */
	log(...data: any[]): void;

	/**
	 * Analyzes errors.
	 * @param error - The error to be analyzed.
	 * @returns The analyzed error.
	 */
	analysis(error: any): Error;
}

interface Navigator {
	/**
	 * Initiates a download for the specified file.
	 * @param file - The file to be downloaded.
	 */
	download(file: File): void;
}

interface Location {
	/**
	 * Retrieves the search parameters as a map.
	 * @returns A map containing the search parameters.
	 */
	getSearchMap(): Map<string, string>;
}