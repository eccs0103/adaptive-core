"use strict";

//#region Primitives
/**
 * A mapping interface that associates primitive types with string keys.
 * This is used to handle conversions to different primitive types.
 */
interface PrimitivesHintMap {
	"number": number;
	"boolean": boolean;
	"string": string;
}
//#endregion

export { type PrimitivesHintMap };
