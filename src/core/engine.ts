"use strict";

//#region Engine
interface Engine {
	get launched(): boolean;
	set launched(value: boolean);
	get limit(): number;
	set limit(value: number);
	get fps(): number;
	get delta(): number;
}
//#endregion

export { type Engine };
