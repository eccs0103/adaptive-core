"use strict";

const { abs, trunc } = Math;

//#region Timespan
/**
 * Represents a duration of time.
 */
class Timespan {
	//#region Converters
	/**
	 * Converts a duration in milliseconds to its time components.
	 * @param {number} duration The duration in milliseconds.
	 * @returns {[boolean, number, number, number, number]} An array representing negativity, hours, minutes, seconds, and milliseconds.
	 */
	static #toTime(duration) {
		const negativity = duration < 0;
		duration = abs(duration);
		const milliseconds = duration % 1000;
		duration = trunc(duration / 1000);
		const seconds = duration % 60;
		duration = trunc(duration / 60);
		const minutes = duration % 60;
		duration = trunc(duration / 60);
		const hours = duration;
		return [negativity, hours, minutes, seconds, milliseconds];
	}
	/**
	 * Converts time components to a duration in milliseconds.
	 * @param {boolean} negativity Indicates if the duration is negative.
	 * @param {number} hours The hours component.
	 * @param {number} minutes The minutes component.
	 * @param {number} seconds The seconds component.
	 * @param {number} milliseconds The milliseconds component.
	 * @returns {number} The duration in milliseconds.
	 */
	static #toDuration(negativity, hours, minutes, seconds, milliseconds) {
		return (negativity ? -1 : 1) * ((((hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds);
	}
	/**
	 * Converts a Timespan object to a formatted string representation.
	 * @param {Timespan} timespan The Timespan object to convert.
	 * @param {boolean} full Indicates whether to include all time components (hours, minutes, milliseconds).
	 * @returns {string} The formatted string representation of the Timespan.
	 */
	static stringify(timespan, full = true) {
		const { negativity, hours, minutes, seconds, milliseconds } = timespan;
		let result = seconds.toFixed().padStart(2, `0`);
		if (full || milliseconds > 0) {
			result = `${result}.${milliseconds.toFixed().padStart(3, `0`)}`;
		}
		if (full || hours > 0) {
			result = `${minutes.toFixed().padStart(2, `0`)}:${result}`;
			result = `${hours.toFixed().padStart(2, `0`)}:${result}`;
		} else if (minutes > 0) {
			result = `${minutes.toFixed().padStart(2, `0`)}:${result}`;
		}
		if (negativity) {
			result = `-${result}`;
		}
		return result;
	}
	/**
	 * Parses a string representation of a duration and returns a Timespan object.
	 * @param {string} string The string representation of the duration.
	 * @returns {Timespan} The Timespan object representing the parsed duration.
	 * @throws {SyntaxError} If the string representation is invalid.
	 */
	static parse(string) {
		const match = /(-)?(?:(?:(\d+):)?(\d+):)?(\d+)(?:\.(\d+))?/.exec(string);
		if (!match) {
			throw new SyntaxError(`Invalid moment syntax: ${string}`);
		}
		const negativity = (match[1] !== undefined);
		const [, , hours, minutes, seconds, milliseconds] = match.map(part => Number.parseInt(part ?? 0));
		if (0 > hours) throw new RangeError(`Invalid hours value: ${hours}`);
		if (0 > minutes || minutes > 59) throw new RangeError(`Invalid minutes value: ${minutes}`);
		if (0 > seconds || seconds > 59) throw new RangeError(`Invalid seconds value: ${seconds}`);
		if (0 > milliseconds || milliseconds > 999) throw new RangeError(`Invalid milliseconds value: ${milliseconds}`);
		return Timespan.viaTime(negativity, hours, minutes, seconds, milliseconds);
	}
	//#endregion
	//#region Constructors
	/**
	 * Creates a Timespan object based on a duration in milliseconds.
	 * @param {number} duration The duration in milliseconds. Default is 0.
	 * @returns {Timespan} The Timespan object representing the specified duration.
	 */
	static viaDuration(duration = 0) {
		const result = new Timespan();
		result.#duration = trunc(duration);
		[result.#negativity, result.#hours, result.#minutes, result.#seconds, result.#milliseconds] = Timespan.#toTime(result.#duration);
		return result;
	}
	/**
	 * Creates a Timespan object based on time components.
	 * @param {boolean} negativity Indicates if the duration is negative.
	 * @param {number} hours The hours component (non-negative).
	 * @param {number} minutes The minutes component (0-59).
	 * @param {number} seconds The seconds component (0-59).
	 * @param {number} milliseconds The milliseconds component (0-999).
	 * @returns {Timespan} The Timespan object representing the specified time components.
	 * @throws {RangeError} If any time component is out of its valid range.
	 */
	static viaTime(negativity = false, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
		if (0 > hours) throw new RangeError(`Property 'hours' out of range: ${hours}`);
		if (0 > minutes || minutes > 59) throw new RangeError(`Property 'minutes' out of range: ${minutes}`);
		if (0 > seconds || seconds > 59) throw new RangeError(`Property 'seconds' out of range: ${seconds}`);
		if (0 > milliseconds || milliseconds > 999) throw new RangeError(`Property 'milliseconds' out of range: ${milliseconds}`);
		const result = new Timespan();
		result.#negativity = negativity;
		result.#hours = trunc(hours);
		result.#minutes = trunc(minutes);
		result.#seconds = trunc(seconds);
		result.#milliseconds = trunc(milliseconds);
		result.#duration = Timespan.#toDuration(result.#negativity, result.#hours, result.#minutes, result.#seconds, result.#milliseconds);
		return result;
	}
	/**
	 * Creates a clone of a Timespan object.
	 * @param {Timespan} source The Timespan object to clone.
	 * @returns {Timespan} The cloned Timespan object.
	 */
	static clone(source) {
		const result = new Timespan();
		result.#duration = source.#duration;
		result.#negativity = source.#negativity;
		result.#hours = source.#hours;
		result.#minutes = source.#minutes;
		result.#seconds = source.#seconds;
		result.#milliseconds = source.#milliseconds;
		return result;
	}
	//#endregion
	//#region Presets
	/**
	 * Represents a Timespan with zero duration.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get ZERO() { return Timespan.viaTime(false, 0, 0, 0, 0); };
	/**
	 * Represents a Timespan with a duration of one millisecond.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get MILLISECOND() { return Timespan.viaTime(false, 0, 0, 0, 1); };
	/**
	 * Represents a Timespan with a duration of one second.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get SECOND() { return Timespan.viaTime(false, 0, 0, 1, 0); };
	/**
	 * Represents a Timespan with a duration of one minute.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get MINUTE() { return Timespan.viaTime(false, 0, 1, 0, 0); };
	/**
	 * Represents a Timespan with a duration of one hour.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get HOUR() { return Timespan.viaTime(false, 1, 0, 0, 0); };
	/**
	 * Represents a Timespan with a duration of one day.
	 * @readonly
	 * @returns {Timespan}
	 */
	static get DAY() { return Timespan.viaTime(false, 24, 0, 0, 0); };
	//#endregion
	//#region Modifiers
	/**
	 * Adds two Timespan instances.
	 * @param {Timespan} first The first Timespan.
	 * @param {Timespan} second The second Timespan.
	 * @returns {Timespan} The result of adding two Timespan instances.
	 */
	static [`+`](first, second) {
		return Timespan.viaDuration(first.#duration + second.#duration);
	}
	/**
	 * Subtracts the second Timespan from the first Timespan.
	 * @param {Timespan} first The first Timespan.
	 * @param {Timespan} second The second Timespan.
	 * @returns {Timespan} The result of subtracting the second Timespan from the first Timespan.
	 */
	static [`-`](first, second) {
		return Timespan.viaDuration(first.#duration - second.#duration);
	}
	/**
	 * Multiplies the duration of a Timespan by a factor.
	 * @param {Timespan} timespan The Timespan to be multiplied.
	 * @param {number} factor The multiplication factor.
	 * @returns {Timespan} The result of multiplying the Timespan duration by the factor.
	 */
	static [`*`](timespan, factor) {
		return Timespan.viaDuration(timespan.#duration * factor);
	}
	/**
	 * Divides the duration of a Timespan by a factor.
	 * @param {Timespan} timespan The Timespan to be divided.
	 * @param {number} factor The division factor.
	 * @returns {Timespan} The result of dividing the Timespan duration by the factor.
	 */
	static [`/`](timespan, factor) {
		return Timespan.viaDuration(timespan.#duration / factor);
	}
	/**
	 * Inverts the sign of a Timespan's duration.
	 * @param {Timespan} timespan The Timespan to be inverted.
	 * @returns {Timespan} The result of inverting the sign of the Timespan duration.
	 */
	static invert(timespan) {
		return Timespan.viaDuration(-1 * timespan.#duration);
	}
	//#endregion
	//#region Properties
	/** @type {number} */
	#duration = 0;
	/** 
	 * Gets the duration of the Timespan.
	 */
	get duration() {
		return this.#duration;
	}
	/** 
	 * Sets the duration of the Timespan.
	 * @throws {RangeError} If the value is less than 0.
	 */
	set duration(value) {
		if (value < 0) throw new RangeError(`Property 'duration' out of range: ${value}`);
		this.#duration = trunc(value);
		[this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds] = Timespan.#toTime(this.#duration);
	}
	/** @type {boolean} */
	#negativity = false;
	/** 
	 * Gets the negativity flag of the Timespan.
	 */
	get negativity() {
		return this.#negativity;
	}
	/** 
	 * Sets the negativity flag of the Timespan.
	 */
	set negativity(value) {
		this.#negativity = value;
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#hours = 0;
	/** 
	 * Gets the hours component of the Timespan.
	 */
	get hours() {
		return this.#hours;
	}
	/** 
	 * Sets the hours component of the Timespan.
	 */
	set hours(value) {
		if (value < 0) throw new RangeError(`Property 'hours' out of range: ${value}`);
		this.#hours = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#minutes = 0;
	/** 
	 * Gets the minutes component of the Timespan.
	 */
	get minutes() {
		return this.#minutes;
	}
	/** 
	 * Sets the minutes component of the Timespan.
	 */
	set minutes(value) {
		if (value < 0 || value > 59) throw new RangeError(`Property 'minutes' out of range: ${value}`);
		this.#minutes = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#seconds = 0;
	/** 
	 * Gets the seconds component of the Timespan.
	 */
	get seconds() {
		return this.#seconds;
	}
	/** 
	 * Sets the seconds component of the Timespan.
	 */
	set seconds(value) {
		if (value < 0 || value > 59) throw new RangeError(`Property 'seconds' out of range: ${value}`);
		this.#seconds = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	/** @type {number} */
	#milliseconds = 0;
	/** 
	 * Gets the milliseconds component of the Timespan.
	 */
	get milliseconds() {
		return this.#milliseconds;
	}
	/** 
	 * Sets the milliseconds component of the Timespan.
	 */
	set milliseconds(value) {
		if (value < 0 || value > 999) throw new RangeError(`Property 'milliseconds' out of range: ${value}`);
		this.#milliseconds = trunc(value);
		this.#duration = Timespan.#toDuration(this.#negativity, this.#hours, this.#minutes, this.#seconds, this.#milliseconds);
	}
	//#endregion
	//#region Methods
	/** 
	 * Converts the Timespan to a string representation.
	 * @param {boolean} full If true, includes all components in the string.
	 * @returns {string} The string representation of the Timespan.
	 */
	toString(full = true) {
		return Timespan.stringify(this, full);
	}
	/** 
	 * Converts the Timespan to its primitive value.
	 * @returns {number} The primitive value of the Timespan (duration).
	 */
	[Symbol.toPrimitive]() {
		return this.#duration;
	}
	/** 
	 * Creates a clone of the Timespan.
	 * @returns {Timespan} A new Timespan instance that is a copy of the original.
	 */
	clone() {
		return Timespan.clone(this);
	}
	/** 
	 * Adds two Timespan instances.
	 * @param {Timespan} other The Timespan to add.
	 * @returns {Timespan} A new Timespan representing the sum of the two Timespans.
	 */
	[`+`](other) {
		return Timespan[`+`](this, other);
	}
	/** 
	 * Subtracts one Timespan from another.
	 * @param {Timespan} other The Timespan to subtract.
	 * @returns {Timespan} A new Timespan representing the difference between the two Timespans.
	 */
	[`-`](other) {
		return Timespan[`-`](this, other);
	}
	/** 
	 * Multiplies the duration of the Timespan by a factor.
	 * @param {number} factor The factor to multiply by.
	 * @returns {Timespan} A new Timespan representing the multiplied duration.
	 */
	[`*`](factor) {
		return Timespan[`*`](this, factor);
	}
	/** 
	 * Divides the duration of the Timespan by a factor.
	 * @param {number} factor The factor to divide by.
	 * @returns {Timespan} A new Timespan representing the divided duration.
	 */
	[`/`](factor) {
		return Timespan[`/`](this, factor);
	}
	/** 
	 * Inverts the duration of the Timespan (changes its sign).
	 * @returns {Timespan} A new Timespan with the inverted duration.
	 */
	invert() {
		return Timespan.invert(this);
	}
	//#endregion
}
//#endregion

export { Timespan };
