"use strict";

import { type PrimitivesHintMap } from "./primitives.js";

const { trunc, abs, sign } = Math;

//#region Timespan
interface TimespanProperties {
	full: boolean;
}

class Timespan {
	//#region Properties
	#value: number = 0;
	#dm: Int32Array = new Int32Array(2);
	#hms: Int8Array = new Int8Array(3);
	get days(): number {
		return this.#dm[0];
	}
	set days(value: number) {
		if (!Number.isFinite(value)) return;
		this.#value += Timespan.#toValue(value - this.#dm[0], 0, 0, 0, 0);
		Timespan.#toComponents(this.#value, this.#dm, this.#hms);
	}
	get hours(): number {
		return this.#hms[0];
	}
	set hours(value: number) {
		if (!Number.isFinite(value)) return;
		this.#value += Timespan.#toValue(0, value - this.#hms[0], 0, 0, 0);
		Timespan.#toComponents(this.#value, this.#dm, this.#hms);
	}
	get minutes(): number {
		return this.#hms[1];
	}
	set minutes(value: number) {
		if (!Number.isFinite(value)) return;
		this.#value += Timespan.#toValue(0, 0, value - this.#hms[1], 0, 0);
		Timespan.#toComponents(this.#value, this.#dm, this.#hms);
	}
	get seconds(): number {
		return this.#hms[2];
	}
	set seconds(value: number) {
		if (!Number.isFinite(value)) return;
		this.#value += Timespan.#toValue(0, 0, 0, value - this.#hms[2], 0);
		Timespan.#toComponents(this.#value, this.#dm, this.#hms);
	}
	get milliseconds(): number {
		return this.#dm[1];
	}
	set milliseconds(value: number) {
		if (!Number.isFinite(value)) return;
		this.#value += Timespan.#toValue(0, 0, 0, 0, value - this.#dm[1]);
		Timespan.#toComponents(this.#value, this.#dm, this.#hms);
	}
	//#endregion
	//#region Builders
	static #patternTimespan: RegExp = /^(-)?(?:(\d+)\.)?(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?$/i;
	constructor();
	constructor(source: Readonly<Timespan>);
	constructor(source?: Readonly<Timespan>) {
		if (!(source instanceof Timespan)) return;
		this.#value = source.#value;
		this.#dm = Int32Array.from(source.#dm);
		this.#hms = Int8Array.from(source.#hms);
	}
	static fromValue(value: number): Timespan {
		if (!Number.isFinite(value)) throw new Error(`The value ${value} must be a finite number`);
		const timespan = new Timespan();
		timespan.#value = trunc(value);
		Timespan.#toComponents(timespan.#value, timespan.#dm, timespan.#hms);
		return timespan;
	}
	static #fromComponents(days: number, hours: number, minutes: number, seconds: number, milliseconds: number): Timespan {
		if (!Number.isFinite(days)) throw new Error(`The days ${days} must be a finite number`);
		if (!Number.isFinite(hours)) throw new Error(`The hours ${hours} must be a finite number`);
		if (!Number.isFinite(minutes)) throw new Error(`The minutes ${minutes} must be a finite number`);
		if (!Number.isFinite(seconds)) throw new Error(`The seconds ${seconds} must be a finite number`);
		if (!Number.isFinite(milliseconds)) throw new Error(`The milliseconds ${milliseconds} must be a finite number`);
		const timespan = new Timespan();
		timespan.#value = Timespan.#toValue(days, hours, minutes, seconds, milliseconds);
		Timespan.#toComponents(timespan.#value, timespan.#dm, timespan.#hms);
		return timespan;
	}
	static fromComponents(hours: number, minutes: number, seconds: number): Timespan;
	static fromComponents(days: number, hours: number, minutes: number, seconds: number): Timespan;
	static fromComponents(days: number, hours: number, minutes: number, seconds: number, milliseconds: number): Timespan;
	static fromComponents(arg1: number, arg2: number, arg3: number, arg4?: number, arg5?: number): Timespan {
		if (arg4 === undefined) return Timespan.#fromComponents(0, arg1, arg2, arg3, 0);
		if (arg5 === undefined) return Timespan.#fromComponents(arg1, arg2, arg3, arg4, 0);
		return Timespan.#fromComponents(arg1, arg2, arg3, arg4, arg5);
	}
	static tryParse(string: string): Timespan | null {
		const regex = Timespan.#patternTimespan;
		const match = regex.exec(string.trim());
		if (match === null) return null;
		const sign: number = (match[1] === undefined ? 1 : -1);
		const [, , days, hours, minutes, seconds, milliseconds] = match.map(part => Number(part ?? 0));
		return Timespan.fromComponents(sign * days, sign * hours, sign * minutes, sign * seconds, sign * milliseconds);
	}
	static parse(string: string): Timespan {
		const color = Timespan.tryParse(string);
		if (color === null) throw new SyntaxError(`Unable to parse '${string}' as timespan`);
		return color;
	}
	//#endregion
	//#region Converters
	static #toValue(days: number, hours: number, minutes: number, seconds: number, milliseconds: number): number {
		let value: number = 0;
		value = (value + days) * 24;
		value = (value + hours) * 60;
		value = (value + minutes) * 60;
		value = (value + seconds) * 1000;
		value = (value + milliseconds);
		return trunc(value);
	}
	static #toComponents(value: number, dm: Int32Array, hms: Int8Array): void {
		const multiplier: number = sign(value).insteadZero(1);
		value = abs(value);
		dm[1] = (value % 1000) * multiplier;
		value = Math.trunc(value / 1000);
		hms[2] = (value % 60) * multiplier;
		value = Math.trunc(value / 60);
		hms[1] = (value % 60) * multiplier;
		value = Math.trunc(value / 60);
		hms[0] = (value % 24) * multiplier;
		value = Math.trunc(value / 24);
		dm[0] = (value) * multiplier;
	}
	valueOf(): number {
		return this.#value;
	}
	toString(): string;
	toString(options: Partial<TimespanProperties>): string;
	toString(options: Partial<TimespanProperties> = {}): string {
		let { full } = options;
		full ??= true;
		const [days, milliseconds] = this.#dm;
		const [hours, minutes, seconds] = this.#hms;
		let string = String.empty;
		if (this.#value < 0) string += "-";
		if (days !== 0 || full) string += `${days.toString()}.`;
		string += `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
		if (milliseconds !== 0 || full) string += `.${milliseconds.toString().padStart(3, "0")}`;
		return string;
	}
	[Symbol.toPrimitive]<K extends keyof PrimitivesHintMap>(hint: K): PrimitivesHintMap[K];
	[Symbol.toPrimitive]<K extends keyof PrimitivesHintMap>(hint: K): PrimitivesHintMap[keyof PrimitivesHintMap] {
		switch (hint) {
			case "number": return this.valueOf();
			case "boolean": return Boolean(this.#value);
			case "string": return this.toString();
			default: throw new Error(`Invalid '${hint}' hint for primitive`);
		}
	}
	//#endregion
	//#region Presets
	static #MIN_VALUE: Readonly<Timespan> = Object.freeze(Timespan.fromValue(Number.MIN_SAFE_INTEGER));
	static get MIN_VALUE(): Readonly<Timespan> {
		return this.#MIN_VALUE;
	}
	static #MAX_VALUE: Readonly<Timespan> = Object.freeze(Timespan.fromValue(Number.MAX_SAFE_INTEGER));
	static get MAX_VALUE(): Readonly<Timespan> {
		return this.#MAX_VALUE;
	}
	static get newZero(): Timespan { return new Timespan(); };
	static get newMillisecond(): Timespan { return Timespan.fromComponents(0, 0, 0, 0, 1); };
	static get newSecond(): Timespan { return Timespan.fromComponents(0, 0, 0, 1, 0); };
	static get newMinute(): Timespan { return Timespan.fromComponents(0, 0, 1, 0, 0); };
	static get newHour(): Timespan { return Timespan.fromComponents(0, 1, 0, 0, 0); };
	static get newDay(): Timespan { return Timespan.fromComponents(1, 0, 0, 0, 0); };
	//#endregion
	//#region Modifiers
	duration(): Timespan {
		return Timespan.fromValue(abs(this.#value));
	}
	invert(): Timespan {
		return Timespan.fromValue(-this.#value);
	}
	//#endregion
}
//#endregion

export { type TimespanProperties, Timespan };
