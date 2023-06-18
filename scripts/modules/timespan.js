"use strict";

/**
 * @typedef TimespanNotation
 * @property {Number} start
 * @property {Number} duration
 */

class Timespan {
	/**
	 * @param {Number} moment 
	 */
	static toTime(moment) {
		const milliseconds = moment % 1000;
		moment = Math.floor(moment / 1000);
		const seconds = moment % 60;
		moment = Math.floor(moment / 60);
		const minutes = moment % 60;
		moment = Math.floor(moment / 60);
		const hours = moment % 24;
		return (/** @type {[Number, Number, Number, Number]} */ ([hours, minutes, seconds, milliseconds]));
	}
	/**
	 * @param {Number} hours 
	 * @param {Number} minutes 
	 * @param {Number} seconds 
	 * @param {Number} milliseconds 
	 */
	static toMoment(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
		return ((((hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds);
	}
	/**
	 * @param {Number} moment 
	 * @param {Boolean} full 
	 */
	static toString(moment, full = false) {
		const [hours, minutes, seconds, milliseconds] = Timespan.toTime(moment);
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
		return result;
	}
	/**
	 * @param {String} text 
	 */
	static parse(text) {
		const match = /(?:(?:(\d+):)?(\d+):)?(\d+)(?:\.(\d+))?/.exec(text);
		if (!match) {
			throw new SyntaxError(`Invalid moment syntax: '${text}'.`);
		}
		const [, hours, minutes, seconds, milliseconds] = match.map(part => Number.parseInt(part ?? 0));
		if (0 > hours || hours >= 24) throw new RangeError(`Invalid hours value: '${hours}'.`);
		if (0 > minutes || minutes >= 60) throw new RangeError(`Invalid minutes value: '${minutes}'.`);
		if (0 > seconds || seconds >= 60) throw new RangeError(`Invalid seconds value: '${seconds}'.`);
		if (0 > milliseconds || milliseconds >= 1000) throw new RangeError(`Invalid milliseconds value: '${milliseconds}'.`);
		return Timespan.toMoment(hours, minutes, seconds, milliseconds);
	}
	/**
	 * @param {TimespanNotation} source 
	 */
	static import(source) {
		const result = new Timespan(
			source.start,
			source.duration
		);
		return result;
	}
	/**
	 * @param {Timespan} source 
	 */
	static export(source) {
		const result = (/** @type {TimespanNotation} */ ({}));
		result.start = source.#start;
		result.duration = source.#duration;
		return result;
	}
	/**
	 * @param {Number} start 
	 * @param {Number} duration 
	 */
	constructor(start, duration) {
		this.#start = start;
		this.#duration = duration;
		this.#end = this.#start + this.#duration;
	}
	/** @type {Number} */ #start;
	get start() {
		return this.#start;
	}
	set start(value) {
		this.#start = value;
		this.#end = this.#start + this.#duration;
	}
	/** @type {Number} */ #duration;
	get duration() {
		return this.#duration;
	}
	set duration(value) {
		this.#duration = value;
		this.#end = this.#start + this.#duration;
	}
	/** @type {Number} */ #end;
	get end() {
		return this.#end;
	}
	set end(value) {
		this.#end = value;
		this.#start = this.#end - this.#duration;
	}
	/**
	 * @param {Boolean} format 
	 */
	toString(format = false) {
		if (format) {
			return `(${Timespan.toString(this.#start, true)} - ${Timespan.toString(this.#end, true)})`;
		} else {
			return `(${(this.#start)} - ${this.#end})`;
		}
	}
}